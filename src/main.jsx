import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Product from './components/Product.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <Product />
  </StrictMode>
)
