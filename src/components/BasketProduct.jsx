
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FaMinusCircle, FaPlusCircle, FaBookmark, FaTrash, FaCheck } from 'react-icons/fa';
import { applyTempUpdate, removeFromCart, updateTempQuantity } from '../features/shopCarts/cartSlice';


const BasketProduct = ({ name, price, image, id, quantity }) => {
  
  // use this to get actions from redux store
  const dispatch = useDispatch()

  const {items:cartItems, tempItems, totalPrice} =  useSelector(state => state.cart)

//   const minus = () => {
//     dispatch(
//         changeQuantity({id: id, quantity: quantity - 1})
//     )
//   }

//   const add = () => {
//     dispatch(
//         changeQuantity({id: id, quantity: quantity + 1})
//     )
//   }

  const handleUpdateQuantity = (id, quantity) => {
    dispatch(updateTempQuantity({id, quantity}))
  }
  
  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id))
  }

  const handleApplyUpdate = () => {
    tempItems.forEach((item) =>{
        dispatch(applyTempUpdate(item.id))
    })
  }
  
  return (
    <div className='flex flex-col bg-white rounded drop-shadow-[0_1.5px_0_rgb(197, 203, 213)]'>
        
        <div className="flex border-b border-[#E0E6EF] items-end justify-between pt-[18px] pb-[35px] px-[24px]">
            <div className="flex flex-col md:flex-row sm:flex-col gap-8 items-start">
                <img src={image} alt={name} className='h-37 w-60' />
                <div className="flex flex-col">
                    <h4 className='font-montserrat font-semibold text-lg text-tertiary'>{name}</h4>
                    <div className="flex items-center gap-2 my-4">
                        <FaCheck className='text-tertiary  h-4 w-4' />
                        <p className='font-montserrat font-medium text-sm'>Expédition disponible</p>
                    </div>
                    <div className="flex gap-4 items-center">
                        <FaMinusCircle className='text-primary  h-4 w-4' />
                        {/* <span>{quantity}</span> */}
                        <input 
                            className='border border-gray-200 w-24 rounded-md text-center'
                            type='number'
                            value={tempItems.find((tempItem) => tempItem.id === id)?. quantity || quantity}
                            onChange={(e) => handleUpdateQuantity(id, parseInt(e.target.value))}
                        />
                        <FaPlusCircle  className='text-primary  h-4 w-4' />
                    </div>
                    <div className="flex gap-4 mt-[15px] items-center">
                        <button className="flex gap-1 items-center justify-center bg-red-500 py-1 px-3 rounded-md" onClick={() => handleRemoveItem(id)}>
                            <FaTrash className='text-white  h-3 w-3' />
                            <span className='font-montserrat font-medium text-sm text-white'>Supprimer</span>
                        </button>
                        {/* <div className="flex gap-1 items-center justify-center">
                            <FaBookmark className='h-3 w-3 text-primary' />
                            <span className='font-montserrat font-medium text-sm text-tertiary'>Enregistrer pour plus tard</span>
                        </div> */}
                        <button 
                            onClick={handleApplyUpdate}
                            className='bg-primary text-white flex justify-center items-center rounded-md text-sm py-1 px-3'
                        >update</button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-end justify-end gap-1">
                {/* <>
                    <p className='text-[#BB0628] font-montserrat text-[9px] leading-[15px]'>Économisez 40 $</p>
                    <span className='text-[#BB0628] font-montserrat text-[13.5px] leading-[13.5px]'>{ price }</span>
                    <p className='font-montserrat text-[#55555A] text-[9px] leading-[12px]'>Plus 1,25 $ écofrais</p>
                </> : <span>{price}</span> */}
                <span className='font-montserrat text-[24px] text-[#1D252C] mt-[8px] leading-[24px]'>{ price }</span>
            </div>
        </div>
          
        <div className="flex justify-between py-[20.5px] pl-[123px] pr-[24px] items-center">
            <p className='text-[#1D252C] font-montserrat font-semibold text-[14px] leading-[16.8px]'>Total des produits</p>
            <span className='font-montserrat text-sm font-bold leading-[18px]'>{ totalPrice } F CFA</span> 
        </div>
    </div>
  )
}

export default BasketProduct
