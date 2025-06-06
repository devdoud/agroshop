import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const BasketLayout = () => {
  return (
    <>
        <Header />
        <main>
          <Outlet />
        </main>
    </>
  )
}

export default BasketLayout