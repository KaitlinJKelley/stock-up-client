import React from "react"
import { Route } from "react-router-dom"
import { InventoryForm } from "./inventory/InventoryForm"
import { InventoryProvider } from "./inventory/InventoryProvider"
import { DatabaseList } from "./parts/DatabaseList"
import { DatabaseProvider } from "./parts/DatabaseProvider"
import { ProductDetail } from "./products/ProductDetail"
import { ProductList } from "./products/ProductList"
import { ProductProvider } from "./products/ProductProvider"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <DatabaseProvider>
                <InventoryProvider>
                    <ProductProvider>
                        <Route path='/database'>
                            <DatabaseList/>
                        </Route>
                        <Route path='/inventory'>
                            <ProductList/>
                        </Route>
                        <Route path='/inventory/new'>
                            <InventoryForm/>
                        </Route>
                        <Route path='/products/:productId(\d+)'>
                            <ProductDetail/>
                        </Route>
                    </ProductProvider>
                </InventoryProvider>
            </DatabaseProvider>

        </main>
    </>
}
