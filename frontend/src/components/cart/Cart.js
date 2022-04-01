import { Typography } from '@mui/material'
import React from 'react'
import { MdRemoveShoppingCart } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addItemtoCart, removeItemfromCart } from '../../actions/cartAction'
import './cart.css'
import './ItemCard.js'
import ItemCard from './ItemCard.js'
const Cart = ({history}) => {
  const dispatch = useDispatch();
  const { cartItem } = useSelector(state => state.cart)

  const incProduct = (id, qty, stock) => {
    const newqty = qty + 1;
    if (qty >= stock) {
      return;
    } else {
      dispatch(addItemtoCart(id, newqty));
    }
  }
  const decProduct = (id, qty) => {
    const newqty = qty - 1;
    if (qty <= 1) {
      return;
    } else {
      dispatch(addItemtoCart(id, newqty));
    }
  }
const deleteItem=(id)=>{
  dispatch(removeItemfromCart(id))
}
const checkOutHandler=()=>{
  history.push('/login?redirect=shipping')
}
  return (
   <>
   {
     cartItem.length === 0 ? (
       <div className="emptyCart">
         <MdRemoveShoppingCart/>
         <Typography>No Product in Your Cart</Typography>
         <Link to='/products' >View Products</Link>
       </div>
     ):
     (
      <>
      <div className="cartPage">
        <div className="cartHeader">
          <p>product</p>
          <p>quantity</p>
          <p>subtotal</p>
        </div>
        {

          cartItem && cartItem.map((item) => (
            <div className="cartContainer" key={item.product}>

              <ItemCard  item={item} deleteItem={deleteItem} />
              <div className="cartInput">
                <button onClick={() => { decProduct(item.product, item.quantity) }}>-</button>
                <input type="number" value={item.quantity} readOnly />
                <button onClick={() => { incProduct(item.product, item.quantity, item.stock) }}>+</button>
              </div>
              <p className='cartSubtotal'>{`$${item.price * item.quantity}`}</p>
            </div>
          ))
        }
        <div className="cartGrossTotal">
          <div></div>
          <div className="cartGrossTotalBox">
            <p>Bross Total</p>
            <p>{`$${cartItem.reduce((acc,item)=>acc+ item.quantity * item.price, 0)}`}</p>
          </div>
          <div></div>
          <div className="checkOutBtn">
            <button onClick={checkOutHandler}>Check Out</button>
          </div>
        </div>
      </div>

    </>
     )
   }
   </>
  )
}

export default Cart