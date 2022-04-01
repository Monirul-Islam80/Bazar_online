import { Typography } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux'
import MetaData from '../layout/MetaData';
import CheckOutSteps from './CheckOutSteps';
import { Link } from 'react-router-dom'
import './confirmOrder.css'

const ConfirmOrder = ({history}) => {
  const { shippingInfo, cartItem } = useSelector((state) => state.cart);
  const { user } = useSelector(state => state.user);
  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;
  const subtotal = cartItem.reduce((acc, item)=> acc + item.quantity*item.price,0);
  const tax = subtotal*0.18;
  const shippingCharges = subtotal>1000 ? 0: 200;
  const totalPrice=subtotal+tax+shippingCharges;
const proseedToPayment = ()=>{
  const data={
    shippingCharges,
    subtotal,
    tax,
    totalPrice
  };
  sessionStorage.setItem('orderInfo', JSON.stringify(data));
  history.push('/process/payment');
}
  return (
    <>
      <MetaData title={'Confirm Order'} />
      <CheckOutSteps activeSteps={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmShippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmShippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>

          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemContainer">
              {cartItem &&
                cartItem.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt={item.name} />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>
                    <span>
                      {item.quantity} X $ {item.price} = {""}
                      <b>$ {item.price * item.quantity}</b>
                    </span>
                  </div>

                ))}
            </div>
          </div>
        </div>
        <div>
          <div className="orderSummary">
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>$ {subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>$ {shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>$ {tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p><b>Total:</b></p>
              <span>$ {totalPrice}</span>
            </div>
            <button onClick={ proseedToPayment }>Proceed To Payment</button>


          </div>
        </div>
      </div>
    </>
  )
}

export default ConfirmOrder