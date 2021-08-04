import { Route } from "react-router-dom"
import { AuthProvider } from "./auth/LoginProvider"
import { InventoryDetail } from "./inventory/InventoryDetail"
import { InventoryForm } from "./inventory/InventoryForm"
import { InventoryList } from "./inventory/InventoryList"
import { InventoryProvider } from "./inventory/InventoryProvider"
import { Home } from "./orderRecs/Home"
import { OrderRecDetail } from "./orderRecs/OrderRecDetail"
import { OrderRecForm } from "./orderRecs/OrderRecForm"
import { OrderRecList } from "./orderRecs/OrderRecList"
import { DatabaseList } from "./parts/DatabaseList"
import { DatabaseProvider } from "./parts/DatabaseProvider"
import { ProductDetail } from "./products/ProductDetail"
import { ProductForm } from "./products/ProductForm"
import { ProductList } from "./products/ProductList"
import { ProductProvider } from "./products/ProductProvider"
import { VendorDetail } from "./vendors/VendorDetail"
import { VendorList } from "./vendors/VendorList"
import { VendorProvider } from "./vendors/VendorProvider"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <AuthProvider>
                <DatabaseProvider>
                    <VendorProvider>
                        <InventoryProvider>
                            <ProductProvider>

                                    <Route exact path='/'>
                                        <Home />
                                    </Route>
                                    <Route exact path='/recs'>
                                        <OrderRecList/>
                                    </Route>
                                    <Route path='/recs/new'>
                                        <OrderRecForm/>
                                    </Route>
                                    <Route path='/recs/:recId(\d+)'>
                                        <OrderRecDetail/>
                                    </Route>
                                    <Route path='/recent/:recId(\d+)'>
                                        <OrderRecDetail/>
                                    </Route>

                                    <Route exact path='/database'>
                                        <DatabaseList/>
                                    </Route>
                                    <Route path='/database/new'>
                                        <InventoryForm/>
                                    </Route>

                                    <Route exact path='/inventory'>
                                        <InventoryList/>
                                    </Route>
                                    <Route path='/inventory/new'>
                                        <InventoryForm/>
                                    </Route>
                                    <Route path='/inventory/:partId(\d+)'>
                                        <InventoryDetail/>
                                    </Route>

                                    <Route exact path='/user_vendors'>
                                        <VendorList/>
                                    </Route>
                                    <Route exact path='/user_vendors/:vendorId(\d+)'>
                                        <VendorDetail/>
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
            </AuthProvider>

        </main>
    </>
}
