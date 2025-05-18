import React from 'react'
import ProductList from '../components/ProductList'


const Home = ({searchQuery}) => {
  return (
    <>
        <ProductList searchQuery={searchQuery} />
    </>
  )
}

export default Home