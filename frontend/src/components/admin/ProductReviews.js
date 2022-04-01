import React, { useEffect, useState } from 'react'
import './productReview.css'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
import { MdDelete, MdStar } from 'react-icons/md';
import { Button } from '@mui/material';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
import { DataGrid } from '@mui/x-data-grid';
import { clearError, deleteReview, getAdminProduct, getAllReviews } from '../../actions/productsActon';
import {  DELETE_REVIEW_RESET } from '../../constants/productConstants';

const ProductReviews = ({history}) => {
    const dispatch = useDispatch();
const alert = useAlert()
const {error, reviews, loading} = useSelector(state=>state.productReviews);
const { error:deleteError, isDeleted} = useSelector(state=>state.review);
const deleteReviewHandler = (reviewId)=>{
    dispatch(deleteReview(reviewId, productId));
}
const [productId, setproductId] = useState('');
const columns = [
    {
        field:'id',
        headerName: 'Review ID',
        minWidth: 300, 
        flex:0.5
    },
    {
        field:'user',
        headerName: 'User',
        minWidth: 150, 
        flex:1
    },
    {
        field:'comment',
        headerName: 'Comment',
        minWidth: 250, 
        flex:0.3
    },
    {
        field:'rating',
        headerName: 'rating',
        type: 'number',
        minWidth: 170, 
        flex: 0.5,
        cellClassName: (params)=>{
          return params.getValue(params.id, 'rating') >= 3 ?
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
                    <Button className='dbtn' onClick={()=>deleteReviewHandler(params.getValue(params.id, 'id'))}>
                        <MdDelete/>
                    </Button>
                </>
            )
        }
    }
];
const rows=[

];
reviews && reviews.forEach(item => {
    rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name
    })
});
const productReviewSubmitHandler=(e)=>{
    e.preventDefault();
    dispatch(getAllReviews(productId))

}
useEffect(() => {
    if(productId.length === 24){
        dispatch(getAllReviews(productId))
    }
  if (error) {
      alert.error(error);
      dispatch(clearError());
  }
  if (deleteError) {
    alert.error(error);
    dispatch(clearError());
}
if (isDeleted) {
    alert.success('review deleted');
    history.push('/admin/reviews')
    dispatch({type: DELETE_REVIEW_RESET});
}
  dispatch(getAdminProduct())
}, [dispatch, alert, error, deleteError, history, isDeleted, productId])

  return (
    <>
    <MetaData title={'all reviews -- admin'}/>

    <div className="dashboard">
        <Sidebar/>
        <div className="productReviewContainer">
        <form className='productReviewForm' 
                encType='multipart/form-data'
                onSubmit={ productReviewSubmitHandler }>
                    <h1 className='productReviewFormHeading' >Update User</h1>
                    <div>
                        <MdStar />
                        <input type="text"
                        placeholder='Product Id'
                        required
                        value={productId}
                        onChange={e=>setproductId(e.target.value)} />
                    </div>
   
                  

    
    
            <Button 
            id='createProductBtn'
            type='submit'
            disabled={loading? true:false || productId=== '' ? true :false}>
                Search</Button>
                    </form>
            {
                reviews && reviews.length > 0 ? (
                    <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className='productReviewTable'
            autoHeight
            />):
            <h1>No Review Found</h1>
            }
            </div>
        </div>
    </>
  )
}

export default ProductReviews