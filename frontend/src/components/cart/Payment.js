import './payment.css'
import { Typography } from '@mui/material'
import React, { useRef } from 'react'
import { MdCreditCard, MdEvent, MdVpnKey } from 'react-icons/md'
import MetaData from '../layout/MetaData'
import CheckOutSteps from './CheckOutSteps'
import { CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import {
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import axios from 'axios'
import { useEffect } from 'react'
import { clearError, createOrder } from '../../actions/orderAction'

const Payment = ({ history }) => {
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
    const payBtn = useRef(null);
    const dispatch = useDispatch();
    const alert = useAlert();
    const stripe = useStripe();
    const elements = useElements();

    const { shippingInfo, cartItem } = useSelector(state => state.cart);
    const { user } = useSelector(state => state.user);
    const {error} = useSelector(state=> state.newOrder);
    const paymentData = { amount: Math.round(orderInfo.totalPrice * 100)}
    const order = {
        shippingInfo,
        orderItem:cartItem,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice
    }   
    
    const submitHandler = async (e) => {
        e.preventDefault();
        payBtn.current.disabled = true;
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const {data}= await axios.post(
                '/api/v1/payment/process',
                paymentData,
                config
            )

            const client_secret = data.client_secret;
            if (!stripe || !elements) {
                return;
            }

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pinCode,
                            country: shippingInfo.country
                        }
                    }
                }
            });

            if (result.error) {
                payBtn.current.disabled = false;
                alert.error(result.error.message);
            } else {
                if (result.paymentIntent.status === 'succeeded') {

                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    }
                    dispatch(createOrder(order));
                    history.push('/success');
                }else{
                    alert.error(`There's some issue while prucessing payment`)
                }
            }

        } catch(err) {
            payBtn.current.disabled = false;
            alert.error(err.response.data.message)
        }
    }
useEffect(() => {
  if (error) {
      alert.error(error);
      dispatch(clearError());
  }

}, [dispatch,alert, error])


    return (
        <>
            <MetaData title='Payment' />
            <CheckOutSteps activeSteps={3} />
            <div className="paymentContainer">
                <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
                    <Typography>Card Info</Typography>
                    <div>
                        <MdCreditCard />
                        <CardNumberElement className='paymentInput' />
                    </div>
                    <div>
                        <MdEvent />
                        <CardExpiryElement className='paymentInput' />
                    </div>
                    <div>
                        <MdVpnKey />
                        <CardCvcElement className='paymentInput' />
                    </div>

                    <input type="submit"
                        value={`Pay - $${orderInfo && orderInfo.totalPrice}`}
                        ref={payBtn}
                        className='paymentFormBtn' />
                </form>
            </div>
        </>
    )
}

export default Payment