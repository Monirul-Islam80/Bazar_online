import React, { Fragment, useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel'
import { useSelector, useDispatch } from 'react-redux';
import { clearError, getProductDetails, newReview } from '../../actions/productsActon';

import './productDetails.css'
import ReviewCard from './ReviewCard.js'
import Loader from '../layout/loader/Loader';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';
import { addItemtoCart } from '../../actions/cartAction';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Rating } from '@mui/material';
import { NEW_REVIEW_RESET } from '../../constants/productConstants';
const ProductDetails = ({ match }) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { product, loading, error } = useSelector(
        (state) => state.productDetails);
        const{success, error: reviewError} = useSelector(
            state=>state.newReview
        )
    const [quantity, setquantity] = useState(1);
    const [rating, setrating] = useState(0);
    const [open, setopen] = useState(false);
    const [comment, setcomment] = useState('');
    const addToCart = () => {
        dispatch(addItemtoCart(match.params.id, quantity));
        alert.success("Item added to Cart")
    }
    const submitReviewToggle = () => {
        open ? setopen(false) : setopen(true);
    }

    const reviewSubmitHandler = () => {
        const myform = new FormData();
        myform.set('rating', rating);
        myform.set('comment', comment);
        myform.set('productId', match.params.id);
        dispatch(newReview(myform));
        setopen(false)
    }
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError);
        }
        if(reviewError){
            alert.error(error);
            dispatch(clearError())
        }
        if(success){
            alert.success('Review Submitted Successfully');
            dispatch({type: NEW_REVIEW_RESET})
        }
        dispatch(getProductDetails(match.params.id));

    }, [dispatch, match.params.id, alert, error, reviewError, success]);
    const options = {

        size: 'large',
        value: product.ratings,
        readOnly:true,
        precision:0.5
    }
    return (
        <>
            <MetaData title={`${product.name} -- BAZAR`} />

            {loading ? <Loader /> : (
                <Fragment>
                    <div className="ProductDetails">
                        <div>
                            <Carousel className='makeStyles-root'>
                                {product.images &&
                                    product.images.map((item, i) => (
                                        <img
                                            className='carouselImage'
                                            src={item.url}
                                            key={item.url}
                                            alt={`images ${i} `}

                                        />
                                    ))}
                            </Carousel>
                        </div>
                        <div>
                            <div className="detailsBlock_1">
                                <h2>{product.name}</h2>
                                <p>Product #{product._id}</p>
                            </div>
                            <div className="detailsBlock_2">

                                <Rating {...options}  /><span className='detailsBlock_2_span'>({product.numOfReviews} Reviews)</span>
                            </div>
                            <div className="detailsBlock_3">
                                <h1>{`$${product.price}`}</h1>
                                <div className="detailsBlock_3_1">
                                    <div className="detailsBlock_3_1_1">
                                        <button onClick={() => { 1 >= quantity ? (setquantity(1)) : (setquantity(quantity - 1)) }} >-</button>
                                        <input readOnly type="number" value={quantity} />
                                        <button onClick={() => { product.stock <= quantity ? (setquantity(product.stock)) : (setquantity(quantity + 1)) }}>+</button>
                                    </div>
                                    <button onClick={addToCart} disabled={product.stock < 1 ? true : false}>add to card</button>
                                </div>
                                <p>
                                    Status:
                                    <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                                        {
                                            product.stock < 1 ? "OutOfStock" : "InStock"

                                        }

                                    </b>
                                </p>
                            </div>
                            <div className="detailsBlock_4">
                                Description: <p>{product.description}</p>
                            </div>
                            <button onClick={submitReviewToggle}>Submit Reviews</button>
                        </div>
                    </div>
                    <h3 className='rehead'>REVIEWS</h3>
                    <Dialog
                        aria-labelledby='simple-dialog-title'
                        open={open}
                        onClose={submitReviewToggle}
                    >
                        <DialogTitle>Submit Review</DialogTitle>
                        <DialogContent className='submitDialog'>
                            <Rating
                                onChange={e => setrating(e.target.value)}
                                value={rating}
                                size={'large'}
                            />
                            <textarea
                                className='submitDialogTextArea'
                                cols={'30'}
                                rows='5'
                                value={comment}
                                onChange={e => setcomment(e.target.value)}></textarea>
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={submitReviewToggle} color='secondary'>Cancel</Button>
                            <Button onClick={reviewSubmitHandler}>Submit</Button>
                        </DialogActions>


                    </Dialog>
                    {product.reviews && product.reviews[0] ? (
                        <div className="reviews">
                            {
                                product.reviews && product.reviews.map((item, i) => (
                                    <ReviewCard reviews={item} key={i} />
                                ))
                            }
                        </div>
                    ) : (<p className='noReview'>no Reviews yet</p>)}
                </Fragment>
            )}
        </>);
}

export default ProductDetails;
