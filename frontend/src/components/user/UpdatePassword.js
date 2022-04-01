import "./updatePassword.css"
import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, updatePassword } from '../../actions/userAction';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstant';
import MetaData from '../layout/MetaData';
import Loader from '../layout/loader/Loader';
import LockOpen from "@mui/icons-material/LockOpen";
import { MdLock, MdVpnKey } from "react-icons/md";

const UpdatePassword = ({history}) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { error, isUpdated, loading } = useSelector((state) => state.profile)
    const [oldPassword, setoldPassword] = useState('');
    const [newPassword, setnewPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');

    const updatePasswordSubmit = (e) => {
        e.preventDefault();
        const myform = new FormData();
        myform.set("oldPassword", oldPassword);
        myform.set("newPassword", newPassword);
        myform.set("confirmPassword", confirmPassword);
        dispatch(updatePassword(myform));
    }

   
    
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success('Profile Updated');
            history.push('/account')
            dispatch({ type: UPDATE_PASSWORD_RESET })
        }
    }, [dispatch, error, alert, history, isUpdated]);
    return <>
        {
            loading ? <Loader /> : (
                <>

                    <MetaData title={`Change Password`} />
                    <div className="updatePasswordContainer">
                        <div className="updatePasswordBox">
                            <h2>Update Password</h2>
                            <form
                                className='updatePasswordForm'
                                encType='multipart/form-data'
                                onSubmit={updatePasswordSubmit}
                            >

                                <div className="loginPassword">
                                    <MdVpnKey  />
                                    <input type="password"
                                        placeholder='Old Password'
                                        required
                                        value={oldPassword}
                                        onChange={(e) => setoldPassword(e.target.value)}
                                        autoComplete='false'
                                    />
                                </div>
                                <div className="loginPassword">
                                    <LockOpen />
                                    <input type="password"
                                        placeholder='New Password'
                                        required
                                        value={newPassword}
                                        onChange={(e) => setnewPassword(e.target.value)}
                                        autoComplete='false'
                                    />
                                </div>
                                <div className="loginPassword">
                                    <MdLock />
                                    <input type="password"
                                        placeholder='Confirm Password'
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setconfirmPassword(e.target.value)}
                                        autoComplete='false'
                                    />
                                </div>
                                <input type="submit" value="save" className='updatePasswordBtn' />
                            </form>
                        </div>

                    </div>
                </>
            )
        }
    </>
};

export default UpdatePassword;
