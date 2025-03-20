import React, { useState } from 'react'
import { Link } from 'react-router'
import { useSelector } from 'react-redux'
import { FaSearch, FaShoppingCart, FaBars, FaUser, FaUserPlus, FaTimes } from 'react-icons/fa';

const Header = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const cartItems = useSelector(state =>  state.cart.items)

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
      };
  
    // Ici s'y trouve le rendu de notre composant Header
    return (
        <>
            <header className='grid grid-cols-12  bg-white shadow-md h-24 fixed left-0 right-0 top-0'>
                <div className="col-span-10 col-start-2 flex items-center grid grid-cols-10">
                    
                    {/* <div className="flex items-center justify-center space-x-2 col-span-1">
                        <span className='h-2.5 w-2.5 rounded-full bg-primary'></span>
                        <h1 className='text-2xl text-primary font-semibold font-montserrat'>AgroShop</h1>
                    </div> */}
                    <div className="flex items-center justify-center space-x-2 col-span-1">
                        {/* Icône hamburger visible sur petits écrans */}
                        <FaBars className="text-primary text-2xl block lg:hidden" onClick={toggleDrawer} />
                        {/* Logo visible sur grands écrans */}
                        <Link to='/'>
                            <div className="hidden lg:flex items-center space-x-2">
                                <span className='h-2.5 w-2.5 rounded-full bg-primary'></span>
                                <h1 className='text-2xl text-primary font-semibold font-montserrat'>AgroShop</h1>
                            </div>
                        </Link>
                    </div>
                    <div className="h-12 col-span-4 col-start-4 relative">
                        <input 
                            type="text" 
                            placeholder='Rechercher un produit'
                            className='w-full h-full bg-transparent rounded-full border-primary border-2 outline-none sm:pl-10 pl-8 py-4 font-montserrat font-semibold text-tertiary sm:text-md text-sm'
                        />
                        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary" />
                    </div>
                    <div className="col-span-4 col-start-9 flex items-center justify-between">
                        <div className="flex items-center space-x-8 w-full">
                            <Link to='/login' className='text-tertiary font-montserrat font-semibold sm:text-lg text-sm flex items-center'>
                                <FaUser className="text-primary text-xl flex lg:hidden" />
                                <span className='hidden lg:flex'>Connexion</span>
                            </Link>
                            <Link to='/signup' className='text-tertiary font-montserrat font-semibold sm:text-lg text-sm flex items-center'>
                                <FaUserPlus className="text-primary text-xl flex lg:hidden" />
                                <span className='hidden lg:flex'>Inscription</span>
                            </Link>
                        </div>
                         <Link to='/cart'>
                            <div className="relative flex items-center hidden lg:flex cursor-pointer">
                                <FaShoppingCart className="text-tertiary text-3xl" />
                                <span className="absolute -top-2 -right-2 bg-primary text-white text-sm font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {cartItems.length}
                                </span>
                            </div>
                         </Link>   
                    </div>
                </div>
            </header>

            {/* Drawer */}
            {
                isDrawerOpen && (
                    <div
                        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform ${
                        isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
                        } transition-transform duration-300`}
                    >
                            <div className="p-4">
                                <div className="flex justify-end">
                                    <button onClick={toggleDrawer} className="text-primary text-2xl">
                                        <FaTimes />
                                    </button>
                                </div>
                                <h2 className="mt-6 text-xl font-bold font-montserrat text-tertiary">Menu</h2>
                                <ul className="mt-4 space-y-6">
                                    <li>
                                        <a href="#" className="text-tertiary font-montserrat font-semibold flex items-center space-x-2">
                                            <FaUser className="text-primary" />
                                            <span>Connexion</span>
                                        </a>
                                    </li>
                                    <li>
                                    <a href="#" className="text-tertiary font-montserrat font-semibold flex items-center space-x-2">
                                        <FaUserPlus className="text-primary" />
                                        <span>Inscription</span>
                                    </a>
                                    </li>
                                    <li>
                                    <a href="#" className="text-tertiary font-montserrat font-semibold flex items-center space-x-2">
                                        <FaShoppingCart className="text-primary" />
                                        <span>Panier</span>
                                    </a>
                                    </li>
                                    <li>
                                        <Link to='/' className="text-tertiary font-montserrat font-semibold flex items-center space-x-2">
                                            <span>Produits</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                    </div>
                )
            }

            {/* Overlay */}
            {/* {isDrawerOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={toggleDrawer}
                ></div>
            )} */}
        </>
  )
}

export default Header