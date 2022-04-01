import { Button } from '@mui/material'
import './newProduct.css'
import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { MdAccountTree, MdAttachMoney, MdPerson } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import { UPDATE_USER_RESET } from '../../constants/userConstant'
import { clearErrors, getUserDetails, updateUser } from '../../actions/userAction'
import Loader from '../layout/loader/Loader'

const NewProduct = ({history, match}) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const {loading, error, user} = useSelector(state=>state.userDetails);
    const {loading:updateLoading, error:updateError, isUpdated} = useSelector(state=>state.profile);

    const [name, setname] = useState('');
    const [email, setemail ] = useState('');
    const [role, setrole] = useState('');
const userId = match.params.id
    useEffect(() => {
        if(user && user._id !== userId){
            dispatch(getUserDetails(userId))
        }else{
            setname(user.name);
            setemail(user.email);
            setrole(user.role);
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors);
        }
         if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors);
        }

      if (isUpdated) {
          alert.success('User Updated Successfully');
          history.push('/admin/users');
          dispatch({type: UPDATE_USER_RESET});
      }

    }, [dispatch, alert, error,  history, isUpdated, updateError, user, userId])
    
    const  updateUserSubmitHandler = (e)=>{
        e.preventDefault();

        const myForm = new FormData();

        myForm.set('name', name);
        myForm.set('email', email);
        myForm.set('role', role);
        dispatch(updateUser(userId, myForm));
    }

   return (
    <>
    <MetaData title={'update user -- admin'}/>
    <div className="dashboard">
        <Sidebar/>
        <div className="newProductContainer">
            {loading? <Loader/>:(
                <form className='createProductForm' 
                encType='multipart/form-data'
                onSubmit={ updateUserSubmitHandler }>
                    <h1>Update User</h1>
                    <div>
                        <MdPerson />
                        <input type="text"
                        placeholder='Name'
                        required
                        value={name}
                        onChange={e=>setname(e.target.value)} />
                    </div>
                    <div>
                        <MdAttachMoney/>
                        <input type="text"
                        placeholder='Email'
                        required
                        value={email}
                        onChange={e=>setemail(e.target.value)} />
                    </div>
                  
    <div>
        <MdAccountTree/>
        <select onChange={e=>setrole(e.target.value)}>
            <option value={role}>Choose Role</option>
            <option value={'admin'}>Admin</option>
            <option value={'user'}>User</option>
            </select>
    </div>
    
    
            <Button 
            id='createProductBtn'
            type='submit'
            disabled={updateLoading? true:false || role=== '' ? true :false}>
                Update</Button>
                    </form>
            )}
            </div>
        </div>
    </>
  )
}

export default NewProduct