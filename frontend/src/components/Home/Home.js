import React, { useEffect } from 'react';
import { CgMouse } from 'react-icons/cg';
import MetaData from '../layout/MetaData';
import './home.css'
import ProductCard from './ProductCard.js'
import { clearError, getProducts } from '../../actions/productsActon';
import {useSelector, useDispatch} from 'react-redux'
import Loader from '../layout/loader/Loader';
import {useAlert} from 'react-alert'
    

function Home() {
const alert = useAlert();
  const dispatch  = useDispatch();
  const {loading,error,products} = useSelector((state)=>state.products)
  useEffect(()=>{
      if (error) {
         alert.error(error)
        dispatch(clearError);

      }
      dispatch(getProducts())
  },[dispatch, error, alert]);

    return(
        <>
        {loading? <Loader/> : <>
    <MetaData title={"Bazar "} />
        <div className="banner">
            <p>WelCome to Bazar</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>
            <a href="#container">
                <button>
                    Scroll<CgMouse />
                </button>
            </a>
        </div>
        <h2 className="homeHeading">Featured Product</h2>
        <div className="container" id="container">
           
           { products && products.map((product, i) => <ProductCard key={i} product={product} />)}
            
        </div>

    </>}
        </>
    ) ;
}

export default Home;

