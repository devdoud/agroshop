import React from 'react';
import { Product } from "./Product";

const ProductList = ({}) => {
  return (
    <div className="grid grid-cols-12 mt-40 h-full">
        <div className="grid sm:grid-cols-3 grid-cols-1 col-span-10 col-start-2  h-screen w-full gap-8">
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
  )
}

export default ProductList