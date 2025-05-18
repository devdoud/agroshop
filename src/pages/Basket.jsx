import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router";
import BasketProduct from '../components/BasketProduct'


const Basket = () => {
    const [cartProduct, setCartProducts] = useState([])

    let navigate = useNavigate();

    useEffect(()=>{
        const fetchCartProducts = async () => {
            try {
              const accesstoken = localStorage.getItem('accesstoken'); // Récupérer le token d'accès
        
              if (!accesstoken) {
                throw new Error('Vous devez être connecté pour voir votre panier.');
              }
        
              const response = await fetch('http://77.37.54.205:8080/api/cart/get', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accesstoken}`, // Ajouter le token dans l'en-tête Authorization
                },
              });
        
              if (!response.ok) {
                throw new Error('Erreur lors de la récupération des produits du panier.');
              }
        
              const data = await response.json();
              console.log('Produits du panier récupérés :', data);
              setCartProducts(data.data || []); // Mettre à jour l'état avec les produits récupérés
            } catch (error) {
              console.error('Erreur lors de la récupération des produits du panier :', error);
            }
          };
        fetchCartProducts();
    }, [])

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
                            cartProduct.length === 0 ? 
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
                                cartProduct.map( (item) => (
                                    <BasketProduct 
                                        name={item.productId.name} 
                                        price={item.productId.price} 
                                        image={item.productId.image} 
                                        id={item.productId._id} 
                                        quantity={item.quantity} 
                                        key={item.productId._id}
                                    />
                                ) )
                            )
                        }
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
                            <span className='text-tertiary text-sm font-bold'>15000F CFA</span>
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