import React from "react"
import { Route } from "react-router-dom"
import { DatabaseList } from "./parts/DatabaseList"
import { DatabaseProvider } from "./parts/DatabaseProvider"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <DatabaseProvider>
                <Route path='/database'>
                    <DatabaseList/>
                </Route>
            </DatabaseProvider>

        </main>
    </>
}
