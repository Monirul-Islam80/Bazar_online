import React from 'react'
import './shipping.css'
import { useState } from 'react';
import { useAlert } from 'react-alert';
import { MdHome, MdLocationCity, MdPhone, MdPinDrop, MdPublic, MdTransferWithinAStation } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux'
import {Country, State} from 'country-state-city'
import MetaData from '../layout/MetaData';
import CheckOutSteps from './CheckOutSteps'
import { saveShippinInfo } from '../../actions/cartAction';
const Shipping = ({history}) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const {shippingInfo} = useSelector(state=> state.cart);
    
    const [address, setaddress] = useState(shippingInfo.address);
    const [city, setcity] = useState(shippingInfo.city);
    const [state, setstate] = useState(shippingInfo.state);
    const [country, setcountry] = useState(shippingInfo.country);
    const [pinCode, setpinCode] = useState(shippingInfo.pinCode);
    const [phoneNo, setphoneNo] = useState(shippingInfo.phoneNo);

    const shippingSubmit=(e)=>{
      e.preventDefault();
      if(phoneNo.length<10){
        alert.error('  Phone Number should be longer than 10 digits')
        return;
      }
      dispatch(saveShippinInfo({address,city,state,country,pinCode,phoneNo}));
      history.push('/order/confirm')
    }
  return (
    <>
    <MetaData title={'Shipping Details'}/>
    <CheckOutSteps activeSteps={0}/>
    <div className="shippingContainer">
      <div className="shippingBox">
        <h2 className='shippingHeading'>Shipping Details</h2>
        <form className='shippingForm' encType='multipart/form-data' onSubmit={shippingSubmit}>
          <div>
            <MdHome/>
            <input 
            type="text" 
            placeholder='address' 
            required 
            value={address} 
            onChange={(e)=>setaddress(
              e.target.value)} />
          </div>
          <div>
            < MdLocationCity />
            <input 
            type="text" 
            placeholder='city' 
            required
             value={city} 
            onChange={(e)=>setcity(
              e.target.value)} />
          </div>
          <div>
            <MdPinDrop/>
            <input 
            type="number" 
            placeholder='Pin code' 
            required 
            value={pinCode} 
            onChange={(e)=>setpinCode(
              e.target.value)} />
          </div>
          <div>
            <MdPhone/>
            <input 
            type="number" 
            placeholder='phone number' 
            required value={phoneNo} 
            
            onChange={(e)=>setphoneNo(
              e.target.value)} />
          </div>
          <div>
            <MdPublic/>
            <select    
             required 
            value={country} 
            onChange={(e)=>setcountry(
              e.target.value)}>
                <option value="">Country</option>
                {
                  Country &&
                  Country.getAllCountries().map((item)=>(
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
          </div>
          {country && (
            <div>
            <MdTransferWithinAStation/>
            <select 
            required
            value={state}
            onChange={(e)=>setstate(e.target.value)}>
              <option value="">State</option>
              {State && 
              State.getStatesOfCountry(country).map((item)=>(
                <option key={item.isoCode} value={item.isoCode}>
                {item.name}
              </option>
              ))}
            </select>
          </div>
          )}
          <input type="submit"
          value=' Continue'
          className='shippingBtn'
          disabled={state ? false: true} />
        </form>
      </div>
    </div>
    </>
  )
}

export default Shipping