import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, } from 'react-router'
import './index.css'
import App from './App.jsx'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx'
import ForgotPassword from './components/ForgotPassword.jsx'
import ForgotPasswordOtpVerification from './components/ForgotPasswordOtpVerification.jsx'
import ResetPassword from './components/ResetPassword.jsx'
import Basket from './pages/Basket.jsx'
import store from './app/store'
import { Provider } from 'react-redux'
import Dashboard from './pages/Dashboard.jsx'
import Layout from './components/Layout.jsx'
import BasketLayout from './components/BasketLayout.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SearchProvider } from './context/SearchContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <ToastContainer />
      <Provider store={store}>
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
                <Route path='/dashboard' element={<Dashboard />} />
              </Routes>
        </BrowserRouter>
        {/* <SearchProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path='/' element={<Home />} />
                <Route path='/:id' element={<ProductDetailPage />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
              </Route>
              <Route element={<BasketLayout />}>
                <Route path='/cart' element={<Basket />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="/forgotpasswordotp" element={<ForgotPasswordOtpVerification />} />
                <Route path="/resetpassword" element={<ResetPassword />} />
              </Route>   
              <Route path='/dashboard' element={<Dashboard />} />
            </Routes>
          </BrowserRouter>
        </SearchProvider> */}
      </Provider>
  </StrictMode>
  
)
