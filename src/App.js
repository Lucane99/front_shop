import React from 'react'
import { Route, Routes } from 'react-router'
import RootLayOut from './pages/RootLayOut'
import HomePage from './pages/HomePage'
import ProductDetail from './pages/ProductDetail'
import CartPage from './pages/user_page/CartPage'
import Shipping from './pages/user_page/Shipping'
import PlaceOrder from './pages/user_page/PlaceOrder'
import ProductList from './pages/admin_page/ProductList'
import Login from './pages/auth_page/Login'
import SignUp from './pages/auth_page/SignUp'
import AddProduct from './pages/admin_page/AddProduct'
import OrderDetail from './pages/user_page/OrderDetail'
import UserProfile from './pages/user_page/UserProfile'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import AuthRoutes from './components/AuthRoutes'
import AdminRoutes from './components/AdminRoutes'
import UserRoutes from './components/UserRoutes'
import EditProduct from './pages/admin_page/EditProduct'
import AdminProfile from './pages/admin_page/AdminProfile'


const App = () => {




  return (

    <>
      <Routes>

        <Route path='/' element={<RootLayOut />} >
          <Route index element={<HomePage />} />

          <Route element={<AdminRoutes />}>
            <Route path='product_list' element={<ProductList />} />
            <Route path='product_add' element={<AddProduct />} />
            <Route path='update/product/:id' element={<EditProduct />} />
            <Route path='admin_profile' element={<AdminProfile />} />

          </Route>


          <Route element={<AuthRoutes />}>
            <Route path='cart' element={<CartPage />} />
            <Route path='user/shipping' element={<Shipping />} />
            <Route path='order/:id' element={<OrderDetail />} />
            <Route path='user_profile' element={<UserProfile />} />
            <Route path='user/placeorder' element={<PlaceOrder />} />

          </Route>

          <Route element={<UserRoutes />}>
            <Route path='user_login' element={<Login />} />
            <Route path='user_signUp' element={<SignUp />} />
          </Route>



          <Route path='product/:id' element={<ProductDetail />} />


        </Route>

      </Routes>
      <ToastContainer autoClose={500} position='top-right' />
    </>
  )
}

export default App
