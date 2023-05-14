import React, { useEffect } from 'react'
import "./Style.css"
import { Button, Card, Typography } from 'antd'
const Service = ({ user, services, setServices,removeService }) => {
    useEffect(() => {
        const getServices = async () => {
            const requestOptions = {
                method: 'GET'
            }
            return await fetch("api/services/",
                requestOptions)
                .then(response => response.json())
                .then(
                    (data) => {
                        console.log("Data:", data)
                        setServices(data)
                    },
                    (error) => {
                        console.log(error)
                    }
                )
        }
        getServices()
    }, [setServices])

    const deleteItem = async ({ id }) => {
            const requestOptions = {
                method: 'DELETE'
            }
            return await fetch(`api/services/${id}`,requestOptions)
                .then(response => {
                 if (response.ok){
                    removeService(id);
                 }
                    },
                    (error) => {
                        console.log(error)
                    }
                )
    }

    const serviceItem = async () => {
        const requestOptions = {
            method: 'GET'
        }
        return await fetch("api/services/",
            requestOptions)
            .then(response => response.json())
            .then(
                (data) => {
                    console.log("Data:", data)
                    setServices(data)
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    return (
        <React.Fragment>
            {/* Вывод списка услуг */}
            <Typography>
            <h1>Список услуг</h1>
            </Typography>
            <Card>
            {services.map(({ id, name, price, description ,coach }) => (
                <div className="Service" key={id} id={id} >
            <Card>
            
            <Typography>
            <h3 className='ServiceName'>{name}</h3>
            </Typography>
           <br />{coach.fio} <br />{price} <br />{description} <br /><br />

           {(user.isAuthenticated===true) && (user.userRole === "admin") ? (
            <Card>  
            <Button onClick={() => deleteItem({ id })}>Удалить</Button> 
            <Button onClick={() => serviceItem({ id })}>Изменить</Button>
            </Card>
           ) : ("")} 
           </Card>
           
           </div>
            ))}
            </Card>
        </React.Fragment>
    )
}
export default Service