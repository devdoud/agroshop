import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, } from 'react-router'
import './index.css'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx'
import ForgotPassword from './components/ForgotPassword.jsx'
import ForgotPasswordOtpVerification from './components/ForgotPasswordOtpVerification.jsx'
import ResetPassword from './components/ResetPassword.jsx'
import Basket from './pages/Basket.jsx'
import Layout from './components/Layout.jsx'
import BasketLayout from './components/BasketLayout.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <ToastContainer />
      <BrowserRouter>
              <Routes>
                <Route element={<Layout />}>
                  <Route path='/' element={<Home />} />
                  <Route path='/detailproduit/:id' element={<ProductDetailPage />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/signup' element={<Signup />} />
                  <Route path='/header' element={<Header />} />
                </Route>
                <Route element={<BasketLayout />}>
                  <Route path='/cart' element={<Basket />} />
                  <Route path="/forgotpassword" element={<ForgotPassword />} />
                  <Route path="/forgotpasswordotp" element={<ForgotPasswordOtpVerification />} />
                  <Route path="/resetpassword" element={<ResetPassword />} />
                </Route>   
              </Routes>
        </BrowserRouter>
  </StrictMode>
  
)
