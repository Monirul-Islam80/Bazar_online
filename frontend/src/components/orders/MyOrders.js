import React, { useEffect } from 'react'
import './myOrders.css'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../layout/loader/Loader'
import MetaData from '../layout/MetaData'
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import { useAlert } from 'react-alert';
import { clearError, myOrders } from '../../actions/orderAction';
import { Link } from 'react-router-dom';
import { MdLaunch } from 'react-icons/md';
const MyOrders = () => {
  const dispatch = useDispatch();
  const alert = useAlert()
    const {user}=useSelector(state=>state.user)
    const {loading, error, orders}= useSelector(state=>state.myOrder)

const columns = [
  {field: "id", headerName: 'Order ID', minWidth:300, flex:1},
  {field: 'status', headerName: 'Status', minWidth:150, flex:0.5,
  cellClassName: (params)=>{
    return params.getValue(params.id, 'status') === 'Delivered' ?
    'redColor':
    'greenColor'
  } },
  {field: 'itemsQty', headerName: 'Items Qty', type:'number', minWidth: 150, flex:0.3},
  {field: 'ammount', headerName: 'Ammount', type:'number', minWidth:270, flex: 0.5},
  {field: 'actions', headerName: 'Actions', flex: 0.5, minWidth: 150, type:'number', sortable:false,
renderCell: (params)=>{
  return(
    <Link to={`/order/${params.getValue(params.id, 'id')}`}>
      <MdLaunch/>
      </Link>
  )
}},
]
const rows=[

]

orders && orders.forEach((item, index) => {
  rows.push({
    itemsQty: item.orderItem.length,
    id: item._id,
    status:item.orderStatus,
    ammount: item.totalPrice,
  })
});
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearError());
      }
dispatch(myOrders());
    }, [alert, dispatch,error])
    
  return (
    <>
    <MetaData title={user.name}/>
    {
      loading? <Loader/>: (
        <div className="myOrdersPage">
          <DataGrid
    rows={rows}
    columns={columns}
    pageSize={10}
    disableSelectionOnClick
    className='myOrderTable'
    autoHeight
          />
          <Typography className='myorderhead'>{user.name}'s Orders</Typography>
        </div>
      )
    }
    </>
  )
}

export default MyOrders