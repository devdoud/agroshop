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
    <div className="grid grid-cols-12 mt-40 h-full">
      <div className="grid sm:grid-cols-3 grid-cols-1 col-span-10 col-start-2  h-screen w-full gap-8">
        <Product />
        <Product />
        <Product />
       
        <Product />
        <Product />
        <Product />

        <Product />
        <Product />
        <Product />

        <Product />
        <Product />
        <Product />
        {/* <div className="h-content bg-secondary"></div>
        <div className="h-20 bg-secondary"></div>
        <div className="h-20 bg-secondary"></div>

        <div className="h-20 bg-secondary"></div>
        <div className="h-20 bg-secondary"></div>
        <div className="h-20 bg-secondary"></div> */}
      </div>
    </div>
  </StrictMode>
)
