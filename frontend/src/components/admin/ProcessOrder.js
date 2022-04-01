import { Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../layout/MetaData';
import { Link } from 'react-router-dom'
import Sidebar from './Sidebar';
import { clearError, getOrderDetailes, updateOrder } from '../../actions/orderAction';
import { useAlert } from 'react-alert';
import Loader from '../layout/loader/Loader';
import { MdAccountTree } from 'react-icons/md';
import { UPDATE_ORDER_RESET } from '../../constants/orderConstant';

const ProcessOrder = ({ history, match }) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { order, error, loading } = useSelector(state => state.orderDetails);
    const { error:updateError, isUpdated } = useSelector(state => state.order);
const updateOrderStatusHandler =(e)=>{
    e.preventDefault();
    const myForm = new FormData();
    myForm.set('status', status);
    dispatch(updateOrder(match.params.id, myForm));
}
const [status, setstatus] = useState('')

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError());
        } 

        if (updateError) {
            alert.error(updateError);
            dispatch(clearError());
        }

        if (isUpdated) {
            alert.success('Order status Updated');
            dispatch({type: UPDATE_ORDER_RESET});
        }

        dispatch(getOrderDetailes(match.params.id))

    }, [dispatch, alert, error, match.params.id, updateError, isUpdated])


    return (
        <>
            <MetaData title={'Process Order'} />
            <div className="dashboard">
                <Sidebar />
                <div className="newProductContainer">
                    {loading ? <Loader /> : <>
                        <div className="confirmOrderPage">
                            <div>
                                <div className="confirmShippingArea">
                                    <Typography>Shipping Info</Typography>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p>Name:</p>
                                            <span>{order.user && order.user.name}</span>
                                        </div>
                                        <div>
                                            <p>Phone:</p>
                                            <span>
                                                {order.shippingInfo && order.shippingInfo.phoneNo}
                                            </span>
                                        </div>
                                        <div>
                                            <p>Address:</p>
                                            <span>
                                                {order.shippingInfo &&
                                                    `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                                            </span>
                                        </div>
                                    </div>

                                    <Typography>Payment</Typography>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p className={order.paymentInfo &&
                                                order.paymentInfo.status === 'succeeded' ? 'greenColor' : 'redColor'}>
                                                {order.paymentInfo && order.paymentInfo.status === 'succeeded' ?
                                                    'PAID' : 'NOT PAID'}
                                            </p>
                                        </div>
                                        <div>
                                            <p>Amount:</p>
                                            <span>{order.totalPrice && order.totalPrice}</span>
                                        </div>
                                    </div>

                                    <Typography>Order Status</Typography>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p className={order.orderStatus &&
                                                order.orderStatus.status === 'Delivered ' ? 'greenColor' : 'redColor'}>
                                                {order.orderStatus && order.orderStatus}
                                            </p>
                                        </div>
                                    </div>


                                    <div className="confirmCartItems">
                                        <Typography>Your Cart Items:</Typography>
                                        <div className="confirmCartItemContainer">
                                            {order.orderItem &&
                                                order.orderItem.map((item) => (
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
                            </div>
                            {  order.orderStatus !== "Delivered" &&
                             (   <div>
                                <form className='createProductForm'
                                    encType='multipart/form-data'
                                    onSubmit={ updateOrderStatusHandler }>
                                    <h1>Process Order</h1>

                                  <div>
                                  <MdAccountTree />
                                    <select 
                                    onChange={e => setstatus(e.target.value)}>
                                        <option value={''}>Update Status</option>
                                        {order.orderStatus === 'Processing' && (<option value={'Shipped'}>Shipped</option>)}
                                        {order.orderStatus === 'Shipped' && (<option value={'Delivered'}>Delivered</option>)}
                                    </select>
                                  </div>
                            
                            <Button
                                id='createProductBtn'
                                type='submit'
                                disabled={loading ? true : false || status === '' ? true:false}>
                                Update</Button>
                        </form>
                    </div>)
                            }


                        </div>
            </>}
        </div>
            </div >
        </>
    )
}

export default ProcessOrder