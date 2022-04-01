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
import { deleteOrder, getAllOrders, clearError } from '../../actions/orderAction';
import { DELETE_ORDER_RESET } from '../../constants/orderConstant';

const OrderList = ({history}) => {
    const dispatch = useDispatch();
const alert = useAlert()
const {error, orders} = useSelector(state=>state.allOrders);
const { error:deleteError, isDeleted} = useSelector(state=>state.order);
const deleteOrderHandler = (id)=>{
     dispatch(deleteOrder(id));
}
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
                to={`/admin/order/${params.getValue(params.id, 'id')}`}>
                    <MdEdit/>
                    </Link>
                    <Button className='dbtn' onClick={()=>deleteOrderHandler(params.getValue(params.id, 'id'))}>
                        <MdDelete/>
                    </Button>
                </>
            )
        }
    }
];
const rows=[

];
orders && orders.forEach(item => {
    rows.push({
         id: item._id,
        itemsQty: item.orderItem.length,
        status:item.orderStatus,
        ammount: item.totalPrice,

    })
});
useEffect(() => {
  if (error) {
      alert.error(error);
      dispatch(clearError());
  }
  if (deleteError) {
    alert.error(error);
    dispatch(clearError());
}
if (isDeleted) {
    alert.success('order deleted');
    history.push('/admin/orders')
    dispatch({type: DELETE_ORDER_RESET});
}
  dispatch(getAllOrders())
}, [dispatch, alert, error, deleteError, history, isDeleted])

  return (
    <>
    <MetaData title={'all orders -- admin'}/>

    <div className="dashboard">
        <Sidebar/>
        <div className="productListContainer">
            <h1 id='productListHeading'>All Orders</h1>
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

export default OrderList