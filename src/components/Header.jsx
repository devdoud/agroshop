import React, { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { FaSearch, FaShoppingCart, FaBars, FaUser, FaUserPlus, FaTimes } from 'react-icons/fa';

const Header = ({ searchQuery, setSearchQuery }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [countCartItems, setcountCartItems] = useState(0)

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
      };

      const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
      };

      useEffect(()=>{
        const fetchCartProducts = async () => {
            try {
              const accesstoken = localStorage.getItem('accesstoken'); // Récupérer le token d'accès
        
              if (!accesstoken) {
                throw new Error('Vous devez être connecté pour voir votre panier.');
              }
        
              const response = await fetch('api.fermierconnect.com:8080/api/cart/get', {
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
              console.log('Total de produits du panier récupérés :', data.data.length);
              setcountCartItems(data.data.length || 0); // Mettre à jour l'état avec les produits récupérés
            } catch (error) {
              console.error('Erreur lors de la récupération des produits du panier :', error);
            }
          };
        fetchCartProducts();
      }, [])

    const handleSearch = async () => {
        if (searchQuery.trim() === '') {
          toast.error('Veuillez entrer un terme de recherche.');
          return;
        }
      
        try {
          const response = await fetch('api.fermierconnect.com:8080/api/product/search-product', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query: searchQuery, // Inclure le terme de recherche
            }),
          });
      
          if (!response.ok) {
            throw new Error('Erreur lors de la recherche.');
          }
      
          const data = await response.json();
          console.log('Résultats de la recherche :', data.data);

        } catch (error) {
          console.error('Erreur lors de la recherche :', error);
          toast.error('Une erreur est survenue lors de la recherche.');
        }
      };

      const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          handleSearch();
        }
      };
  
    
    // Ici s'y trouve le rendu de notre composant Header
    return (
        <>
            <header className='grid grid-cols-12  bg-white shadow-md h-24 fixed left-0 right-0 top-0 z-50'>
                <div className="col-span-10 col-start-2 flex items-center grid grid-cols-10">
                    
                    <div className="flex items-center justify-center space-x-2 col-span-1">
                        {/* Icône hamburger visible sur petits écrans */}
                        <FaBars className="text-primary text-2xl block lg:hidden" onClick={toggleDrawer} />
                        {/* Logo visible sur grands écrans */}
                        <Link to='/'>
                            <div className="hidden lg:flex items-center space-x-2">
                                <span className='h-2.5 w-2.5 rounded-full bg-primary'></span>
                                <h1 className='text-2xl text-primary font-semibold font-montserrat'>FermierConnect</h1>
                            </div>
                        </Link>
                    </div>
                    <div className="h-12 col-span-4 col-start-4 relative">
                        <input 
                            type="text" 
                            placeholder='Rechercher un produit'
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onKeyDown={handleKeyDown}
                            className='w-full h-full bg-transparent rounded-full border-primary border-2 outline-none sm:pl-10 pl-8 py-4 font-montserrat font-semibold text-tertiary sm:text-md text-sm'
                        />
                        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary" />
                    </div>
                    <div className="col-span-4 col-start-9 flex items-center justify-between">
                        <div className="flex items-center space-x-6 w-full">
                            <Link to='/login' className='text-tertiary font-montserrat font-semibold sm:text-lg text-sm flex items-center'>
                                <FaUser className="text-primary text-xl flex lg:hidden" />
                                <span className='hidden lg:flex'>Connexion</span>
                            </Link>
                            <Link to={'/signup'} className='text-tertiary font-montserrat font-semibold sm:text-lg text-sm flex items-center'>Inscription</Link>
                        </div>
                         <Link to='/cart'>
                            <div className="relative flex items-center hidden lg:flex cursor-pointer">
                                <FaShoppingCart className="text-tertiary text-3xl" />
                                <span className="absolute -top-2 -right-2 bg-primary text-white text-sm font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {countCartItems}
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
        </>
  )
}
export default Header;