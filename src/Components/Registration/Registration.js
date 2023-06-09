import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Button, Card, Typography, Input} from 'antd'

const Register = ({ user, setUser }) => {
  const [errorMessages, setErrorMessages] = useState([]);
  const navigate = useNavigate();

  const Register = async (event) => {
    event.preventDefault();

    var { email, nickname, password, passwordConfirm } = document.forms[0];
    // console.log(email.value, password.value)

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.value,
        nickname: nickname.value,
        password: password.value,
        passwordConfirm: passwordConfirm.value,
      }),
    };
    return await fetch("api/account/register", requestOptions)
      .then((response) => {
        // console.log(response.status)
        response.status === 200 &&
          setUser({ isAuthenticated: true, userName: "", userRole: "" });
        return response.json();
      })
      .then(
        (data) => {
          console.log("Data:", data);
          if (
            typeof data !== "undefined" &&
            typeof data.userName !== "undefined"
          ) {
            setUser({ isAuthenticated: true, userName: data.userName, userRole: data.userRole });
            navigate("/");
          }
          typeof data !== "undefined" &&
            typeof data.error !== "undefined" &&
            setErrorMessages(data.error);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const renderErrorMessage = () =>
    errorMessages.map((error, index) => <div key={index}>{error}</div>);

  return (
    <>
      {user.isAuthenticated ? (
        <h3>Пользователь {user.userName} успешно зарегистрирован!</h3>
      ) : (
        <>
          <h3>Регистрация</h3>
          <Card>
          <form style={{width:500}} onSubmit={Register}>
            <Typography>Почта </Typography>
            <Input type="text" name="email" placeholder="Почта" />
            <br />
            <Typography>Никнейм </Typography>
            <Input type="text" name="nickname" placeholder="Никнейм" />
            <br />
            <Typography>Пароль </Typography>
            <Input type="text" name="password" placeholder="Пароль" />
            <br />
            <Typography>Подтверждение пароля </Typography>
            <Input
              type="text"
              name="passwordConfirm"
              placeholder="Подтверждение пароля"
            />
            <br />
            <Button type="primary" htmlType="submit">Войти</Button>
          </form>
          </Card>
          {renderErrorMessage()}
        </>
      )}
    </>
  );
};

export default Register;