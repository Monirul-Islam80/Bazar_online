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
import { clearError, deleteProduct, getAdminProduct } from '../../actions/productsActon';
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';

const ProductsList = ({history}) => {
    const dispatch = useDispatch();
const alert = useAlert()
const {error, products} = useSelector(state=>state.products);
const { error:deleteError, isDeleted} = useSelector(state=>state.product);
const deleteProductHandler = (id)=>{
    dispatch(deleteProduct(id));
}
const columns = [
    {
        field:'id',
        headerName: 'Product ID',
        minWidth: 300, 
        flex:0.5
    },
    {
        field:'name',
        headerName: 'Name',
        minWidth: 150, 
        flex:1
    },
    {
        field:'stock',
        headerName: 'Stock',
        type:'number',
        minWidth: 150, 
        flex:0.3
    },
    {
        field:'price',
        headerName: 'Price',
        type: 'number',
        minWidth: 170, 
        flex: 0.5
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
                to={`/admin/product/${params.getValue(params.id, 'id')}`}>
                    <MdEdit/>
                    </Link>
                    <Button className='dbtn' onClick={()=>deleteProductHandler(params.getValue(params.id, 'id'))}>
                        <MdDelete/>
                    </Button>
                </>
            )
        }
    }
];
const rows=[

];
products && products.forEach(item => {
    rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name
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
    alert.success('product deleted');
    history.push('/admin/dashboard')
    dispatch({type: DELETE_PRODUCT_RESET});
}
  dispatch(getAdminProduct())
}, [dispatch, alert, error, deleteError, history, isDeleted])

  return (
    <>
    <MetaData title={'all products -- admin'}/>

    <div className="dashboard">
        <Sidebar/>
        <div className="productListContainer">
            <h1 id='productListHeading'>All Products</h1>
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

export default ProductsList