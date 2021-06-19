import React, { useContext, useEffect } from 'react' 
import { useHistory } from 'react-router'
import { OrderRecContext } from './OrderRecProvider'

export const Home = () => {
    const {getRecentOrderRec} = useContext(OrderRecContext)

    const history = useHistory()

    useEffect(() => {
        getRecentOrderRec()
        .then(res => history.push(`/recent/${res.id}`))
    }, [])

    return(<></>)
}