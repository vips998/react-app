import React, { useEffect, useState } from 'react'
import ReactDOM from "react-dom/client"
import Service from "./Components/Service/Service"
import Coach from "./Components/Coach/Coach"
import ServiceCreate from "./Components/ServiceCreate/ServiceCreate"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from "./Components/Layout/Layout"
import LogIn from "./Components/LogIn/LogIn"
import LogOff from "./Components/LogOff/LogOff"
import Register from './Components/Registration/Registration'
import fitnes from './fitnes.jpg'
import {Row} from 'antd'
const App = () => {

    const [services, setServices] = useState([])
    const addService = (service) => setServices([...services, service])
    const removeService = (removeID) => setServices(services.filter(({ Id }) => Id !== removeID));
    const [user, setUser] = useState({ isAuthenticated: false, userName: "" , userRole: "" })


useEffect(() => {
const getUser = async () => {
return await fetch("api/account/isauthenticated")
.then((response) => {
response.status === 401 &&
setUser({ isAuthenticated: false, userName: "" })
return response.json()
})
.then(
(data) => {
if (
typeof data !== "undefined" &&
typeof data.userName !== "undefined"
) {
setUser({ isAuthenticated: true, userName: data.userName })
}
},
(error) => {
console.log(error)
}
)
}
getUser()
}, [setUser])

return (

<BrowserRouter>
<Routes>
<Route path="/" element={<Layout user={user} />}>
<Route index element={<div><h2> Фи́тнес-клуб — место, сочетающее в себе большое разнообразие спортивных секций для проведения групповых программ, спортивный зал для игровых видов спорта, тренажёрный зал, плавательный бассейн, зал для бокса, студии фитнеса и карате.</h2>
<Row align='center'><img src={fitnes}></img></Row></div>}/>
<Route
path="/services"
element={
<>
<Coach/>
<ServiceCreate user={user} addService={addService} />
<Service
user={user}
services={services}
setServices={setServices}
removeService={removeService}
/>
</>
}
/>
<Route
path="/register"
element={<Register user={user} setUser={setUser} />}
/>
<Route
path="/login"
element={<LogIn user={user} setUser={setUser} />}
/>
<Route path="/logoff" element={<LogOff setUser={setUser} />} />
<Route path="*" element={<h3>404</h3>} />
</Route>
</Routes>
</BrowserRouter>
)
}


const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
// <React.StrictMode>
<App />
// </React.StrictMode>
)
