import React from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../features/shopCarts/cartSlice';

const ProductDetail = () => {

  // utilisation de react redux 
    const dispatch = useDispatch()

  return (
    <div className="grid grid-cols-12 mt-32 h-full">
        <div className="grid grid-cols-5 gap-8 col-span-10 col-start-2 mb-4 flex justify-end items-end">
            {/* product image */}
            <div className="col-span-2">
                <img src="src/assets/arachide.jpg" alt="product image" className='rounded-lg'/>
            </div>

            {/* product informations and add to basket button */}
            <div className="col-span-3 flex flex-col justify-start items-start gap-8">
                <h3 className='text-terrtiary font-bold text-2xl font-montserrat'>Product name</h3>
                <p className='text-tertiary font-medium text-lg font-montserrat'> 
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum commodi soluta, blanditiis eos, aperiam libero ad facilis tempore cum eligendi natus nisi nemo voluptatibus vitae a nesciunt delectus laudantium mollitia!
                    Optio beatae dicta voluptate laboriosam quas aspernatur quibusdam, ullam maiores, eos ea exercitationem asperiores, a eius fuga. Mollitia cupiditate adipisci veritatis aspernatur, nesciunt enim aperiam laboriosam voluptate sapiente placeat provident. 
                </p>
                <p className='font-montserrat font-bold text-xl text-ertirry'>15000 F CFA</p>
                {/* <div className="flex flex-col justify-start gap-4">
                  <h3 className='text-terrtiary font-bold text-2xl font-montserrat'>Product name</h3>
                  <p className='text-tertiary font-medium text-lg font-montserrat'> 
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum commodi soluta, blanditiis eos, aperiam libero ad facilis tempore cum eligendi natus nisi nemo voluptatibus vitae a nesciunt delectus laudantium mollitia!
                        Optio beatae dicta voluptate laboriosam quas aspernatur quibusdam, ullam maiores, eos ea exercitationem asperiores, a eius fuga. Mollitia cupiditate adipisci veritatis aspernatur, nesciunt enim aperiam laboriosam voluptate sapiente placeat provident. 
                  </p>
                  <p className='font-montserrat font-bold text-xl text-ertirry'>15000 F CFA</p>
                </div> */}
                <button
                    className='w-1/3 py-2 border-gray-200 border rounded-lg flex items-center justify-center gap-4 bg-primary text-white cursor-pointer'
                    onClick={(e) => { 
                          e.stopPropagation;  
                          dispatch(addToCart({name, price, image, id}))
                      }}
                >
                    <span className='font-semibold font-montserat text-base'>Panier</span>
                </button>
            </div>
        </div>
    </div>
  )
}

export default ProductDetail