import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { StockUp } from "./components/StockUp.js"
import "./index.css"
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <StockUp />
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
)

