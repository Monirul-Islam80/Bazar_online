import React, { useEffect } from 'react'
import './productList.css'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import { MdDelete, MdEdit } from 'react-icons/md';
import { Button } from '@mui/material';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
import { DataGrid } from '@mui/x-data-grid';
import { clearErrors, deleteUser, getAllUsers,  } from '../../actions/userAction';
import { DELETE_USER_RESET } from '../../constants/userConstant';

const UserList = ({history}) => {
    const dispatch = useDispatch();
const alert = useAlert()
const {error, users} = useSelector(state=>state.allUsers);
const { error:deleteError, isDeleted, message} = useSelector(state=>state.profile);
const deleteUserHandler = (id)=>{
    dispatch(deleteUser(id));
}
const columns = [
    {
        field:'id',
        headerName: 'User ID',
        minWidth: 300, 
        flex:0.5
    },
    {
        field:'email',
        headerName: 'Email',
        minWidth: 180, 
        flex:1
    },
    {
        field:'name',
        headerName: 'Name',
        minWidth: 180, 
        flex:0.3
    },
    {
        field:'role',
        headerName: 'Role',
        type: 'number',
        minWidth: 130, 
        flex: 0.5,
        cellClassName: (params)=>{
          return params.getValue(params.id, 'role') === 'admin' ?
        'greenColor'  :'redColor'
          
        } 
    },
    {
        field:'actions',
        headerName: 'Actions',
        minWidth: 150, 
        flex:0.3,
        type: 'number',
        sortable: false,
        renderCell: (params)=>{
            return(
                <>
                <Link
                to={`/admin/user/${params.getValue(params.id, 'id')}`}>
                    <MdEdit/>
                    </Link>
                    <Button className='dbtn' onClick={()=>deleteUserHandler(params.getValue(params.id, 'id'))}>
                        <MdDelete/>
                    </Button>
                </>
            )
        }
    }
];
const rows=[

];
users && users.forEach(item => {
    rows.push({
        id: item._id,
        name: item.name,
        role: item.role,
        email: item.email
    })
});
useEffect(() => {
  if (error) {
      alert.error(error);
      dispatch(clearErrors());
  }
  if (deleteError) {
    alert.error(error);
    dispatch(clearErrors());
}
if (isDeleted) {
    alert.success(message);
    history.push('/admin/users')
    dispatch({type: DELETE_USER_RESET});
}
  dispatch(getAllUsers())
}, [dispatch, alert, error, deleteError, history, isDeleted, message])

  return (
    <>
    <MetaData title={'all users -- admin'}/>

    <div className="dashboard">
        <Sidebar/>
        <div className="productListContainer">
            <h1 id='productListHeading'>All Users</h1>
            <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className='productListTable'
            autoHeight
            />
            </div>
        </div>
    </>
  )
}

export default UserList;