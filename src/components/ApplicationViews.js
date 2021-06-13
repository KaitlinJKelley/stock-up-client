import React from "react"
import { Route } from "react-router-dom"
import { InventoryForm } from "./inventory/InventoryForm"
import { InventoryProvider } from "./inventory/InventoryProvider"
import { DatabaseList } from "./parts/DatabaseList"
import { DatabaseProvider } from "./parts/DatabaseProvider"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <DatabaseProvider>
                <InventoryProvider>
                    <Route path='/database'>
                        <DatabaseList/>
                    </Route>
                    <Route path='/inventory/new'>
                        <InventoryForm/>
                    </Route>
                </InventoryProvider>
            </DatabaseProvider>

        </main>
    </>
}
