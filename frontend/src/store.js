import { createStore, combineReducers, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { newProductReducer, newReviewReducer, productDetailsReducer, productReducer, productReviewsReducer, productsReducer, reviewReducer } from './reducers/productReducer';
import { allUserReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReduser } from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer';
import { allOrderReducer, myOrderReducer, newOrderReducer, orderDetailsReducer, orderReducer } from './reducers/orderRducer';

const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    user: userReduser,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrder: myOrderReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    product: productReducer,
    allOrders: allOrderReducer,
    order: orderReducer,
    allUsers: allUserReducer,
    userDetails: userDetailsReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,
    
    
});

let initialState = {
    cart: {
        cartItem: localStorage.getItem('cartItem')?
         JSON.parse(localStorage.getItem('cartItem')):[] ,

         shippingInfo: localStorage.getItem('shippingInfo')?
         JSON.parse(localStorage.getItem('shippingInfo')):[] 
    }
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools( applyMiddleware(...middleware))
);

export default store;