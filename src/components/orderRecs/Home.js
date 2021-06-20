import React, { useContext, useEffect } from 'react' 
import { useHistory } from 'react-router'
import { OrderRecContext } from './OrderRecProvider'
// Allows useParams to still work by getting the recent order rec and adding its ID to the url
export const Home = () => {
    const {getRecentOrderRec} = useContext(OrderRecContext)

    const history = useHistory()

    useEffect(() => {
        getRecentOrderRec()
        .then(res => history.push(`/recent/${res.id}`))
    }, [])

    return(<></>)
}