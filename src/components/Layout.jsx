import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const Layout = () => {
  const [ searchQuery, setSearchQuery ] = useState('')

  return (
    <>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <main>
        <Outlet 
          context={{ searchQuery }}
        />
      </main> 
      <Footer />
    </>
  )
}

export default Layout