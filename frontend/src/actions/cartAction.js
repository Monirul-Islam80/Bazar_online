import axios from "axios"
import { ADD_TO_CART, REMOVE_FROM_CART, SAVE_SHIPPING_INFO } from "../constants/cartConstant";


export const addItemtoCart =(id,quantity)=>async(dispatch,getState)=>{
    const{data}= await axios.get(`/api/v1/product/${id}`);
    console.log(data);
    dispatch({
        type: ADD_TO_CART,
        payload:{
            product:data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.stock,
            quantity
        }
    });
    localStorage.setItem('cartItem', JSON.stringify(getState().cart.cartItem));
    }
    
    export const removeItemfromCart =(id)=>async(dispatch,getState)=>{

        dispatch({
            type: REMOVE_FROM_CART,
            payload:id
        });
        localStorage.setItem('cartItem', JSON.stringify(getState().cart.cartItem));
    
        }
        export const saveShippinInfo =(data)=>async(dispatch)=>{

            dispatch({
                type: SAVE_SHIPPING_INFO,
                payload:data
            });
            localStorage.setItem('shippingInfo', JSON.stringify(data));
        
            }