import React from 'react'
import "./itemcard.css"
import { Link } from 'react-router-dom'

const ItemCard = ({item, deleteItem}) => {
  return (
    <div className='itemCard' key={item.product}>
      <img src={item.image} alt={item.name}/>
     <div>
       <Link to={`/product/${item.product}`}>
         {item.name}
       </Link>
       <span>{`Price: $${item.price}`}</span>
       <p onClick={()=>{deleteItem(item.product)}}>Remove</p>
     </div>
    </div>
  )
}

export default ItemCard