import React, { useContext, useEffect } from 'react' 
import { ProductContext } from './ProductProvider'

export const ProductList = () => {
    const {products, getProducts} = useContext(ProductContext)

    useEffect(() => {
        getProducts()
    }, [])
    return(<></>)
}