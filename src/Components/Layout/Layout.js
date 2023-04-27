import React from "react"
import { Outlet, Link } from "react-router-dom"
import { Layout as LayoutAntd, Menu } from "antd"
const { Header, Content, Footer } = LayoutAntd

const items = [
    {
    label: <Link to={"/"}>Главная</Link>,
    key: "1",
    },
    {
    label: <Link to={"/services"}>Список услуг</Link>,
    key: "2",
    },
    {
    label: <Link to={"/register"}>Регистрация</Link>,
    key: "3",
    },
    {
    label: <Link to={"/login"}>Вход</Link>,
    key: "4",
    },
    {
    label: <Link to={"/logoff"}>Выход</Link>,
    key: "5",
    },
    ]

    const Layout = ({ user }) => {
        return (
        <LayoutAntd>
        <Header style={{ position: "sticky", top: 0, zIndex: 1, width: "100%" }}>
        <div
        style={{
        float: "right",
        color: "rgba(255, 255, 255, 0.65)",
        }}
        >
        {user.isAuthenticated ? (
        <strong>{user.userName}</strong>
        ) : (
        <strong>Гость</strong>
        )}
        </div>
        <Menu theme="dark" mode="horizontal" items={items} className="menu" />
        </Header>
        <Content className="site-layout" style={{ padding: "0 50px" }}>
        <Outlet />
        </Content>
        
        <Footer style={{ textAlign: "center" }}>FitnesClub ©2023</Footer>
        </LayoutAntd>
        )
        }
        export default Layout