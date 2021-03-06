import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './components/Home';
import Footer from './components/layouts/Footer';
import Header from './components/layouts/Header';
import ProductDetails from './components/product/productDetails';
import Login from './components/user/Login';
import Profile from './components/user/Profile'
import ProtectedRoute from './components/route/ProtectedRoute';
import Register from './components/user/Register';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import { loadUser } from './actions/userActions'
import { useSelector } from 'react-redux';
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Payment'
import OrderSuccess from './components/cart/OrderSuccess'
import ListOrders from './components/order/ListOrders';
import Dashboard from './components/admin/Dashboard';
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import OrderList from './components/admin/OrderList';
import ProcessOrder from './components/admin/ProcessOrder';
import UsersList from './components/admin/UsersList';
import UpdateUser from './components/admin/UpdateUser';
import ProductReviews from './components/admin/ProductReviews';
import store from './store'
import axios from 'axios'
import { useEffect, useState } from 'react';



//Payments
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import OrderDetails from './components/order/OrderDetails';
import ProductList from './components/admin/ProductList';


function App() {

  const [stripeApiKey, setStripeApiKey] = useState()



  useEffect(() => {
    store.dispatch(loadUser())

    async function getStripApiKey() {
      const { data } = await axios.get('/api/v1/stripeapi');
      console.log(data.stripeApiKey)

      setStripeApiKey(data.stripeApiKey)
    }

    getStripApiKey();
  }, [])
  const { user, loading ,isAuthenticated } = useSelector(state => state.auth)

  return (
    <Router>
      <div className="App">
        <Header />
        <div className='container container-fluid'>
          <Route path="/" component={Home} exact />
          <Route path="/search/:keyword" component={Home} />
          <Route path="/product/:id" component={ProductDetails} exact />
          <Route path="/cart" component={Cart} exact />
          <ProtectedRoute path="/ship" component={Shipping} />
          <ProtectedRoute path="/order/confirm" component={ConfirmOrder} />
          <ProtectedRoute path="/success" component={OrderSuccess} />
          {stripeApiKey &&
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute path="/payment" component={Payment} />
            </Elements>
          }

          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/password/forgot" component={ForgotPassword} exact />
          <Route path="/password/reset/:token" component={NewPassword} exact />
          <ProtectedRoute path="/me" component={Profile} exact />
          <ProtectedRoute path="/me/update" component={UpdateProfile} exact />
          <ProtectedRoute path="/password/update" component={UpdatePassword} exact />
          <ProtectedRoute path="/orders/me" component={ListOrders} exact />
          <ProtectedRoute path="/order/:id" component={OrderDetails} exact />
          <ProtectedRoute path="/dashboard" isAdmin={true} component={Dashboard} exact />
          <ProtectedRoute path="/admin/products" isAdmin={true} component={ProductList} exact />
          <ProtectedRoute path="/admin/orders" isAdmin={true} component={OrderList} exact />
          <ProtectedRoute path="/admin/users" isAdmin={true} component={UsersList} exact />
          <ProtectedRoute path="/admin/product" isAdmin={true} component={NewProduct} exact />
          <ProtectedRoute path="/admin/product/:id" isAdmin={true} component={UpdateProduct} exact />
          <ProtectedRoute path="/admin/order/:id" isAdmin={true} component={ProcessOrder} exact />
          <ProtectedRoute path="/admin/user/:id" isAdmin={true} component={UpdateUser} exact />
          <ProtectedRoute path="/admin/reviews" isAdmin={true} component={ProductReviews} exact />


        </div>
        {/* {!loading && user.role !== 'admin' && (
          <Footer />
        )} */}

{!loading && (!isAuthenticated || user.role !== 'admin') && (
          <Footer />
        )}


      </div>

    </Router>


  );
}

export default App;
