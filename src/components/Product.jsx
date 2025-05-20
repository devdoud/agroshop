import React, { useState, useEffect } from 'react'
import { FaArrowRight, FaTag, FaBox } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Product ({ id, name, price, image, stock })  {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 2 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className='flex flex-col h-90 rounded-lg shadow-md border border-gray-200'>
        <div className="h-2/3">
            <Skeleton height={240} className="rounded-t-lg" />
        </div>
        <div className="w-full h-1/3 p-2 flex flex-col">        
            <Skeleton height={20} width="60%" />
            <Skeleton height={20} width="30%" className="mt-1" />
            
            <div className="flex items-center justify-between w-full h-2/3 mt-2">
                <Skeleton height={20} width="50%"  />
                <Skeleton height={20} width="40%" />
            </div>
        </div>
      </div>
    );
  } 

  const handleAddToCart = async (id) => {
    const accesstoken = localStorage.getItem('accesstoken'); // Récupérer le token d'accès depuis le localStorage
    console.log('Token récupéré depuis localStorage :', accesstoken);
  
    if (!accesstoken) {
      toast.error('Vous devez être connecté pour ajouter un produit au panier.');
      return;
    }
  
    try {
      const response = await fetch('http://77.37.54.205:8080/api/cart/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accesstoken}`, // Ajouter le token d'authentification
        },
        body: JSON.stringify({
          productId: id,
        }),
      });
      
      console.log('Données envoyées :', { productId: id });
      console.log('Statut de la réponse :', response.status);
  
      if (!response.ok) {
        const errorText = await response.text(); // Lire le texte de l'erreur
        console.error('Erreur lors de l\'ajout au panier :', errorText);
        throw new Error('Erreur lors de l\'ajout au panier');
      }
  
      const data = await response.json(); // Lire la réponse JSON
      console.log('Produit ajouté au panier avec succès :', data);
  
      toast.success('Produit ajouté au panier avec succès !');
    } catch (error) {
      console.error('Erreur lors de l\'ajout au panier :', error);
      toast.error('Une erreur est survenue lors de l\'ajout au panier.');
    }
  };

// Ici s'y trouve le rendu de notre composant product
    return (
        <div 
            className='flex flex-col h-110 rounded-lg shadow-md border border-gray-200'
        >
            <Link to={`/detailproduit/${id}`} className="w-full h-2/3 cursor-pointer">
                <div className="h-full w-full"> 
                    <img src={image} alt="product image" className='rounded-t-lg h-full w-full object-cover'/>
                </div>
            </Link>
            
            <div className="w-full h-1/3 p-2 flex flex-col">
                <h1 className='font-montserrat font-bold text-tertiary text-2xl'>{name}</h1>
                <div className="flex items-center gap-2 mt-2">
                    <FaTag className="text-primary" />
                    <span className='font-montserrat font-semibold text-tertiary text-xl'>{price} FCFA / Kg</span> 
                </div>
                <div className="flex items-end justify-between mt-1">
                    <div className="flex items-center gap-2 w-2/3">
                        <span className='font-semibold font-montserrat text-base flex items-center gap-1'>
                            <FaBox className="text-primary" /> Stock :
                        </span>
                        <span className='font-montserrat text-base text-tertiary font-semibold'>{stock}</span>
                    </div>
                    <button
                      className='w-1/3 py-2 border-gray-200 border rounded-lg flex items-center justify-center gap-4 bg-primary text-white cursor-pointer'
                      onClick={(e) => { 
                        e.stopPropagation;  
                        handleAddToCart(id);
                      }}
                    >
                        <span className='font-semibold font-montserat text-base'>Commander</span>
                        <FaArrowRight />
                    </button>
                </div>               
            </div>
        </div>
  )
}