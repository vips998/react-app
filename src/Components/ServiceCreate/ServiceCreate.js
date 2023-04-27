import React from "react"
import {coach} from "../Coach/Coach"

const CreateOption = () => {
    return (
        <React.Fragment>
            <select name="coach">
                {coach.map(({id, fio}) => (
                <option key={id} value={id}>{fio}</option>
                ))}
            </select>
            
        </React.Fragment>
    )
}


const ServiceCreate = ({ user, addService }) => {
const handleSubmit = (e) => {
e.preventDefault()

const valueName = e.target.elements.nameService.value
const valuePrice = e.target.elements.priceService.value
const valueDescription = e.target.elements.descriptionService.value
const valueCoach = e.target.elements.coach.value

console.log(coach[valueCoach-1])

const service = {coachID: coach[valueCoach-1].id, name: valueName , price: Number(valuePrice),  
    description: valueDescription, }

console.log(service)

const createService = async () => 
{
const requestOptions = 
{
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(service)
}
console.log(requestOptions);
const response = await fetch("https://localhost:7241/api/Service/", 
requestOptions)
return await response.json()
.then((data) => 
 {
console.log(data)
// response.status === 201 && addBlog(data)
if (response.ok) 
   {
    console.log(data)
addService(data)
e.target.elements.nameService.value = ""
e.target.elements.priceService.value = ""
e.target.elements.descriptionService.value = ""
   }
 },
(error) => console.log(error))
}
createService()
}
return (
<React.Fragment>
{user.isAuthenticated === true && user.userRole === "admin" ? (
    <>
<h3>Создание новой услуги</h3>
<form onSubmit={handleSubmit}>
<label>Название: </label>
<input type="text" name="nameService" placeholder="Введите услугу:" /><br />
<label>Стоимость услуги: </label>
<input type="text" name="priceService" placeholder="Введите стоимость:" /><br />
<label>Выберите тренера: </label>
<CreateOption/><br/>
<label>Введите описание услуги: </label>
<input type="text" name="descriptionService" placeholder="Введите описание:" /><br />
<button type="submit">Создать</button>
</form>
</>
) : ("")}
</React.Fragment>
);
};
export default ServiceCreate;
