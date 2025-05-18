import React, { useState, useEffect } from 'react'
import { FaPlus, FaMinus, FaArrowRight, FaTag, FaBox } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { addToCart } from '../features/shopCarts/cartSlice';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Product ({ id, name, price, image })  {

  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // utilisation de react redux 
  // const dispatch = useDispatch()

  const navigate = useNavigate()

  useEffect(() => {
    // Simulate loading for 2 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // const getUserIdFromToken = (token) => {
  //   if (!token) {
  //     console.error('Token non défini ou invalide.');
  //     return null;
  //   }
  
  //   try {
  //     const base64Url = token.split('.')[1]; 
  //     if (!base64Url) {
  //       console.error('Le token ne contient pas de payload.');
  //       return null;
  //     }
  //     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  //     const jsonPayload = decodeURIComponent(
  //       atob(base64)
  //         .split('')
  //         .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
  //         .join('')
  //     );
  
  //     const payload = JSON.parse(jsonPayload);
  //     return payload.userId;
  //   } catch (error) {
  //     console.error('Erreur lors du décodage du token :', error);
  //     return null;
  //   }
  // };

  // const handleDetailClick = (e) => {
  //   e.stopPropagation(); // Empêche la propagation de l'événement
  //   navigate(`/detailproduit/${id}`); // Redirige vers la page de détail produit
  // }
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

  const handleAddToCart = async () => {

    const accesstoken = localStorage.getItem('accesstoken') // Récupérer le token d'accès depuis le localStorage
    console.log('Token récupéré depuis localStorage :', accesstoken);

    
    try {
      const response = await fetch('http://77.37.54.205:8080/api/cart/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Ajoutez un token d'authentification si nécessaire
          'Authorization': `Bearer ${accesstoken}`,
        },
        body: JSON.stringify({
          "productId": id
        }),
      });
  
      if (!response.ok) {
        throw new Error('Erreur lors de l\'ajout au panier');
      }
  
      const data = await response.json();
      console.log('Produit ajouté au panier avec succès :', data);
      // alert('Produit ajouté au panier avec succès !');
      toast.success('Produit ajouté au panier avec succès !');
    } catch (error) {
      console.error('Erreur lors de l\'ajout au panier :', error);
      // alert('Une erreur est survenue lors de l\'ajout au panier.');
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
                            <FaBox className="text-primary" /> Qt :
                        </span>
                        <div className="grid grid-cols-3 divide-x-3 divide-solid divide-gray-200 w-1/2 border border-primary rounded-md">
                            <div className="flex items-center justify-center">
                                <button onClick={(e) => { e.stopPropagation(); incrementQuantity(); }}>
                                    <FaPlus className="text-primary" />
                                </button>
                            </div>
                            <div className="flex items-center justify-center">
                              <span className='font-montserrat font-semibold text-tertiary text-base'>{quantity}</span>
                            </div>
                            <div className="flex items-center justify-center">
                                <button onClick={(e) => { e.stopPropagation(); decrementQuantity(); }} disabled={quantity === 1}>
                                    <FaMinus className={`text-primary ${quantity <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <button
                      className='w-1/3 py-2 border-gray-200 border rounded-lg flex items-center justify-center gap-4 bg-primary text-white cursor-pointer'
                      onClick={(e) => { 
                        e.stopPropagation;  
                        handleAddToCart(); // Appeler la fonction pour ajouter au panier
                        // dispatch(addToCart({name, price, image, id}))
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