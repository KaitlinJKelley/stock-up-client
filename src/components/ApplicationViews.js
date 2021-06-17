import React from "react"
import { Route } from "react-router-dom"
import { InventoryForm } from "./inventory/InventoryForm"
import { InventoryProvider } from "./inventory/InventoryProvider"
import { DatabaseList } from "./parts/DatabaseList"
import { DatabaseProvider } from "./parts/DatabaseProvider"
import { ProductDetail } from "./products/ProductDetail"
import { ProductForm } from "./products/ProductForm"
import { ProductList } from "./products/ProductList"
import { ProductProvider } from "./products/ProductProvider"
import { VendorProvider } from "./vendors/VendorProvider"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <DatabaseProvider>
                <VendorProvider>
                    <InventoryProvider>
                        <ProductProvider>

                            <Route exact path='/database'>
                                <DatabaseList/>
                            </Route>
                            <Route path='/database/new'>
                                <InventoryForm/>
                            </Route>

                            <Route path='/inventory/new'>
                                <InventoryForm/>
                            </Route>

                            <Route exact path='/products'>
                                <ProductList/>
                            </Route>
                            <Route path='/products/new'>
                                <ProductForm/>
                            </Route>
                            <Route path='/products/edit/:productId(\d+)'>
                                <ProductForm/>
                            </Route>
                            <Route path='/products/:productId(\d+)'>
                                <ProductDetail/>
                            </Route>
                        </ProductProvider>
                    </InventoryProvider>
                </VendorProvider>
            </DatabaseProvider>

        </main>
    </>
}
