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
import Basket from './pages/Basket.jsx'

import store from './app/store'
import { Provider } from 'react-redux'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Home /> */}
    {/* <Login /> */}
    {/* <Signup /> */}
    {/* <ProductDetailPage /> */}
    {/* <Basket /> */}
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/detailproduit/:id' element={<ProductDetailPage />} />
          <Route path='/cart' element={<Basket />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </BrowserRouter>
      {/* <App /> */}
    </Provider>
  </StrictMode>
)
