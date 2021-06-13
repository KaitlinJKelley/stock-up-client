import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { StockUp } from "./components/StockUp"
import "./index.css"

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <StockUp />
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
)
