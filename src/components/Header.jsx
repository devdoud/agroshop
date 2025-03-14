import React from 'react'
import {  } from 'react-icons/fa';

const Header = () => {
  
    // Ici s'y trouve le rendu de notre composant Header
    return (
    <header className=' grid grid-cols-12  bg-transparent shadow-md h-24'>
        <div className="col-span-10 col-start-2 flex items-center grid grid-cols-10">
            <div className="flex items-center justify-center space-x-2 col-span-1">
                <span className='h-2.5 w-2.5 rounded-full bg-primary'></span>
                <h1 className='text-2xl text-primary font-semibold font-montserrat'>AgroShop</h1>
            </div>
            <div className="h-12 col-span-4 col-start-4">
                <input 
                    type="text" 
                    placeholder='Rechercher un produit'
                    className='w-full h-full bg-transparent rounded-full border-primary border-2 outline-none pl-10 py-4 font-montserrat font-semibold text-tertiary'
                />
            </div>
            <div className="col-span-4 col-start-9 flex items-center justify-between">
                <div className="flex items-center space-x-4 w-full">
                    <a href="#" className='text-tertiary font-montserrat font-semibold text-lg'>Connexion</a>
                    <a href="#" className='text-tertiary font-montserrat font-semibold text-lg'>Inscription</a>
                </div>
                <span className='font-semibold text-tertiary font-montserrat'>panier</span>
            </div>
        </div>
    </header>
  )
}

export default Header