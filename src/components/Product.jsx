import React, { useState, useEffect } from 'react'
import { FaPlus, FaMinus, FaArrowRight, FaTag, FaBox } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Product ({ name, pricePerKg, image, onProductClick })  {

  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const totalPrice = quantity * pricePerKg;

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

  if (isLoading) {
    return (
      <div className='flex flex-col h-90 rounded-lg shadow-md border border-gray-200'>
        <div className="h-2/3">
            <Skeleton height={230} className="rounded-t-lg" />
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
  
  
// Ici s'y trouve le rendu de notre composant product
    return (
        <div 
            className='flex flex-col h-110 rounded-lg shadow-md border border-gray-200'
            onClick={onProductClick}
        >
            <div 
                className="bg-cover bg-center bg-no-repeat w-full h-2/3 rounded-t-lg"
                style={{ 
                  backgroundImage: `url(${image})`,
                  height: '70%',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
            ></div>
            <div className="w-full h-1/3 p-2 flex flex-col">
                <h1 className='font-montserrat font-bold text-tertiary text-2xl'>{name}</h1>
                <div className="flex items-center gap-2 mt-2">
                    <FaTag className="text-primary" />
                    <span className='font-montserrat font-semibold text-tertiary text-xl'>{totalPrice.toLocaleString()} FCFA</span>
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
                     onClick={(e) => e.stopPropagation()}
                    >
                        <span className='font-semibold font-montserat text-base'>Commander</span>
                        <FaArrowRight />
                    </button>
                </div>               
            </div>
        </div>
  )
}