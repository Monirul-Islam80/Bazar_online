import MailOutline from '@mui/icons-material/MailOutline'
import React, { useEffect, useState } from 'react'
import './ForgotPassword.css'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, forgotPassword } from '../../actions/userAction'
import Loader from '../layout/loader/Loader'
import MetaData from '../layout/MetaData'

const ForgotPassword = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const { error, message, loading } = useSelector(state => state.forgotPassword);
    const [email, setemail] = useState("")
    const forgotPasswordSubmit = (e) => {
        e.preventDefault();
        const myform = new FormData();
    
        myform.set("email", email);
        dispatch(forgotPassword(myform));
    }
    useEffect(() => {
    
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (message) {
            alert.success(message);

        }
    }, [dispatch, error, alert,message]);
    return (

        <>
  {
      loading? <Loader/>: (
        <>
        
        <MetaData title={`Forgot Password`}/>
         <div className="forgotPasswordContainer">
                  <div className="forgotPasswordBox">
                      <h2>Forgot Password</h2>
                      <form
                          className='forgotPasswordForm'
                          onSubmit={forgotPasswordSubmit}
                      >
                          
                    
                          <div className="forgotPasswordEmail">
                              <MailOutline />
                              <input type="email"
                                  placeholder='Email'
                                  required
                                  name='email'
                                  value={email}
                                  onChange={e=>setemail(e.target.value)}
                              />
                          </div>
                          
                          <input type="submit" value="save" className='forgotPasswordBtn' />
                      </form>
                  </div>
      
        </div>
        </>
      )
  }
  </>
    )
}

export default ForgotPassword