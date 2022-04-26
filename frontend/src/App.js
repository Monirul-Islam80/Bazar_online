import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header from './components/layout/headers/Header'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Footer from './components/layout/footer/Footer';
import Home from './components/Home/Home'
import webFont from 'webfontloader';
import ProductDetails from './components/product/ProductDetails'
import Products from './components/product/Products'
import Search from './components/product/Search'
import LoginSignup from './components/user/LoginSignup';
import store from './store'
import { loadUser } from './actions/userAction';
import UserOptions from './components/layout/headers/UserOptions'
import { useSelector } from 'react-redux';
import Profile from './components/user/Profile'
import UpdateProfile from './components/user/UpdateProfile'
import ProtectedRoute from './components/Route/ProtectedRoute';
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import Loader from './components/layout/loader/Loader';
import Uo2 from './components/layout/headers/Uo2';



const UpdatePassword = React.lazy(()=> import('./components/user/UpdatePassword'));
const ForgotPassword = React.lazy(()=> import('./components/user/ForgotPassword'));
const ResetPassword = React.lazy(()=> import('./components/user/ResetPassword'));


const NotFound = React.lazy(()=> import('./components/layout/NotFound/NotFound.js'));
const Contact = React.lazy(()=> import('./components/layout/Contact/Contact'));
const About = React.lazy(()=> import('./components/layout/About/About'));
const Dashboard = React.lazy(() => import('./components/admin/Dashboard'));
const ProductsList = React.lazy(() => import('./components/admin/ProductsList'));
const NewProduct = React.lazy(() => import('./components/admin/NewProduct'));
const UpdateProduct = React.lazy(() => import('./components/admin/UpdateProduct'));
const OrderList = React.lazy(() => import('./components/admin/OrderList'));
const ProcessOrder = React.lazy(() => import('./components/admin/ProcessOrder'));
const UserList = React.lazy(() => import('./components/admin/UserList'));
const UpdateUser = React.lazy(() => import('./components/admin/UpdateUser'));
const ProductReviews = React.lazy(() => import('./components/admin/ProductReviews'));

const MyOrders = React.lazy(() => import('./components/orders/MyOrders'));
const OrderDetails = React.lazy(() => import('./components/orders/OrderDetails'));
const Cart = React.lazy(() => import('./components/cart/Cart'));
const Shipping = React.lazy(() => import('./components/cart/Shipping'));
const ConfirmOrder = React.lazy(() => import('./components/cart/ConfirmOrder'));
const OrderSuccess = React.lazy(() => import('./components/cart/OrderSuccess'));
const Payment = React.lazy(() => import('./components/cart/Payment'));

function App() {
  const { isAuthUser, user } = useSelector((state) => state.user)
  const [stripeApiKey, setstripeApiKey] = useState('');

  async function getStripeApiKey() {
    const { data } = await axios.get('/api/v1/stripeapikey');

    setstripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    });
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);
  // window.addEventListener('contextmenu', (e)=>e.preventDefault())
  return (
    <>
      <Router>
        
        <React.Suspense fallback={<Loader/>} >


          <Header />
          {isAuthUser ? <UserOptions user={user} /> : <Uo2/> }

          {stripeApiKey && (<Elements stripe={loadStripe(stripeApiKey)} >
            <ProtectedRoute exact path='/process/payment' component={Payment} />
          </Elements>)}
          <Switch>


            <Route exact path='/' component={Home} />
            <Route exact path='/product/:id' component={ProductDetails} />
            <Route exact path='/products/' component={Products} />
            <Route path='/products/:keyword' component={Products} />
            <Route exact path='/search/' component={Search} />
            <Route exact path='/login' component={LoginSignup} />
            <Route exact path='/password/forgot' component={ForgotPassword} />
            <Route exact path='/password/reset/:token' component={ResetPassword} />
            <Route exact path='/cart' component={Cart} />
            <Route exact path='/contact' component={Contact} />
            <Route exact path='/about' component={About} />

            <ProtectedRoute exact path='/account' component={Profile} />
            <ProtectedRoute exact path='/me/update' component={UpdateProfile} />
            <ProtectedRoute exact path='/password/update' component={UpdatePassword} />
            <ProtectedRoute exact path='/shipping' component={Shipping} />

            <ProtectedRoute exact path='/success' component={OrderSuccess} />
            <ProtectedRoute exact path='/orders' component={MyOrders} />

            <ProtectedRoute exact path='/order/confirm' component={ConfirmOrder} />
            <ProtectedRoute exact path='/order/:id' component={OrderDetails} />

            <ProtectedRoute isAdmin={true} exact path='/admin/dashboard' component={Dashboard} />
            <ProtectedRoute isAdmin={true} exact path='/admin/products' component={ProductsList} />
            <ProtectedRoute isAdmin={true} exact path='/admin/product' component={NewProduct} />
            <ProtectedRoute isAdmin={true} exact path='/admin/product/:id' component={UpdateProduct} />
            <ProtectedRoute isAdmin={true} exact path='/admin/orders' component={OrderList} />
            <ProtectedRoute isAdmin={true} exact path='/admin/order/:id' component={ProcessOrder} />
            <ProtectedRoute isAdmin={true} exact path='/admin/users' component={UserList} />
            <ProtectedRoute isAdmin={true} exact path='/admin/user/:id' component={UpdateUser} />
            <ProtectedRoute isAdmin={true} exact path='/admin/reviews' component={ProductReviews} />
            <Route component={window.location.pathname === '/process/payment' ? null : NotFound} />
          </Switch>
          <Footer />

        </React.Suspense>
      </Router>

    </>
  );
}
export default App;

