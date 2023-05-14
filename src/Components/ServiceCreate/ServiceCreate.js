import React, { useState } from "react"
import {coach} from "../Coach/Coach"
import {Modal, Card, Typography, Input, Button } from 'antd'
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

const [isModal, setModal] = useState(false)

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
const response = await fetch("/api/services/", 
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

const ShowModal = () => {
    setModal(true)
}

const HandleCancel = () => {
    setModal(false)
}
return (
<React.Fragment>
{user.isAuthenticated === true && user.userRole === "admin" ? (
    <>
<Typography><h1>Создание новой услуги</h1></Typography>
<Button type="primary" onClick={ShowModal}>Создать услугу</Button>
<Modal open={isModal} footer={null} onCancel={HandleCancel}>
<Card>
<form onSubmit={handleSubmit}>
<Typography>Название: </Typography>
<Input type="text" name="nameService" placeholder="Введите услугу:" /><br />
<Typography>Стоимость услуги: </Typography>
<Input type="text" name="priceService" placeholder="Введите стоимость:" /><br />
<Typography>Выберите тренера: </Typography>
<CreateOption/><br/>
<Typography>Введите описание услуги: </Typography>
<Input type="text" name="descriptionService" placeholder="Введите описание:" /><br />
<Button htmlType="submit">Создать</Button>
</form>
</Card>
</Modal>
</>
) : ("")}
</React.Fragment>
);
};
export default ServiceCreate;