import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { Login } from "./auth/Login"
import { OrderRecProvider } from "./orderRecs/OrderRecProvider"
import { NavBar } from "./nav/NavBar"
import { Register } from "./auth/Register"

export const StockUp = () => (
    <>
        <Route render={() => {
            if (localStorage.getItem("lu_token")) {
                return <>
                    <OrderRecProvider>
                        <NavBar />
                    <ApplicationViews />
                    </OrderRecProvider>
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/login" render={() => {
            if (localStorage.getItem("lu_token")) {
                return <Redirect to="/" />
            } else {
                return <Login />
            }
        }} />

        <Route path="/register" render={() => {
            if (localStorage.getItem("lu_token")) {
                return <Redirect to="/" />
            } else {
                return <Register />
                return("")
            }
        }} />
    </>
)