import React from 'react'
import { useNavigate } from "react-router";
import Header from '../components/Header'
import BasketProduct from '../components/BasketProduct'

import { useSelector } from 'react-redux'

const Basket = () => {
    const {items:cartItems, tempItems, totalPrice} =  useSelector(state => state.cart)

    let navigate = useNavigate();

  return (
    <>
        <div className="grid grid-cols-12 mt-12 h-full">
            <div className=" col-span-10 col-start-2 mb-4">
                <p className='font-montserrat font-bold text-2xl leading-[28.8px]'>Votre Panier</p>

                <section className='mt-[38px] flex mb-[100px] gap-8 sm:flex-row flex-col'>
                    <div className="bg-[#F0F2F4] flex-1 px-[12px] py-[13px] flex flex-col gap-[13px]">
                        {/* <BasketProduct name={'Arachide'} price={'$29.99'} />
                        <BasketProduct name={'Granut'} price={'$30'} /> */}
                        {
                            cartItems.length === 0 ? 
                            (
                                <div className="my-auto flex flex-col items-center justify-center gap-4">
                                    <h3 className='font-montserrat font-bold text-3xl text-center'>Votre Panier est vide</h3>
                                    <button 
                                        className='p-2 rounded-md bg-primary text-white text-lg font-medium text-enter cursor-pointer w-48 focus:border-none'
                                        onClick={() => navigate('/')}
                                    >Ajouter Produits</button>
                                </div>
                            ) :
                            (
                                cartItems.map( (item) => (
                                    <BasketProduct name={item.name} price={item.price} image={item.image} id={item.id} quantity={item.quantity} key={item.id}/>
                                ) )
                            )
                        }
                        {/* <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <p className='text-[#1D252C] text-[15px] leading-[18px]'>Vos articles enregistrés</p>
                            <span className='text-[#55555A] text-[9px] leading-[18px] font-normal'>(0 article)</span>
                        </div>
                        <p className='text-[12px] leading-[18px] text-[#1D252C]'>Utilisez l'option « Enregistrer pour plus tard » pour créer une liste des articles qui vous intéressent.</p>
                        </div> */}
                    </div>
                    <div className="bg-[#F0F2F4] p-8 h-3/4 flex flex-col gap-[20px] w-[350px]">
                        <p className='text-tertiary font-montserrat font-bold text-lg text-center'>Résumé de la commande</p>
                        {/* <ul className='flex flex-col gap-[14px]'>
                         {keyValuePairs.map(([key, value]) => <li key={key} className='flex justify-between font-medium font-montserrat text-[#1D252C] text-[10px] leading-[12px]'>
                            {key} <span className='font-bold text-black'>{value}</span>
                        </li>)}
                        </ul> */}
                        <div className='flex justify-between items-center'>
                            <p className='font-medium font-montserrat text-tertiary text-sm'>Estimation du total </p>
                            <span className='text-tertiary text-sm font-bold'>{totalPrice} F CFA</span>
                        </div>
                        <p className='font-montserrat text-[10px] font-semibold leading-[12px] text-[#1D252C]'>Comment souhaitez-vous obtenir votre commande?</p>
                        <label className='text-[#001E73] font-montserrat font-medium text-[10px] leading-[12px] flex gap-1 items-center'>
                            <input type="checkbox" />
                            Expédition à domicile
                        </label>
                        <label className='text-[#C5CBD5] font-montserrat font-medium text-[10px] leading-[12px] flex gap-1 items-center'>
                            <input type="checkbox" />
                            Ramassage au magasin
                        </label>
                        <button
                            className='font-montserrat font-medium text-white bg-primary rounded-md py-2 mt-8 cursor-pointer focus:border-none'
                        >Passer à la caisse</button>
                    </div>
                </section>
            </div>
        </div>
    </>
  )
}

export default Basket