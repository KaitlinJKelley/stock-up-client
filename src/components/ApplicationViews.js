import React from "react"
import { Route } from "react-router-dom"
import { PartsList } from "./parts/DatabaseList"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <Route path='/database'>
                <PartsList/>
            </Route>

        </main>
    </>
}
