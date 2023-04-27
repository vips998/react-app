import React, { useEffect } from 'react'
import "./Style.css"
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
            <h3>Список услуг</h3>
            {services.map(({ id, name, price, description ,coach }) => (
                <div className="Service" key={id} id={id} >
                    <strong className='ServiceName'>{name}</strong>
                    {(user.isAuthenticated===true) && (user.userRole === "admin") ? (
                        <>
                    <button onClick={() => deleteItem({ id })}>Удалить</button>
           <button onClick={() => serviceItem({ id })}>Изменить</button>
                        </>
           ) : ("")}
           
           <br />{coach.fio} <br />{price} <br />{description} <br /><br />
           </div>
            ))}
        </React.Fragment>
    )
}
export default Service