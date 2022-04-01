import { Typography } from '@mui/material'
import React from 'react'
import './orderSuccess.css'
import { MdCheckCircle } from 'react-icons/md'
import { Link } from 'react-router-dom'

const OrderSuccess = () => {
    return (
        <>
            <div className="orderSuccess">
                <MdCheckCircle/>
                <Typography>Your Order has been Placed Successfully</Typography>
                <Link to="/orders">View Orders</Link>
            </div>
        </>
    )
}

export default OrderSuccess