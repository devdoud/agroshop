import React, { useState } from 'react';
import Product from './product';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function ProductList () {

  const categories = ['Tous', 'Céréales', 'Légumineuses', 'Tubercules', 'Fruits'];
  const [visibleCategories, setVisibleCategories] = useState(0); // Index de la première catégorie visible

  
  const handleNext = () => {
    if (visibleCategories + 3 < categories.length) {
      setVisibleCategories(visibleCategories + 1);
    }
  };

  const handlePrev = () => {
    if (visibleCategories > 0) {
      setVisibleCategories(visibleCategories - 1);
    }
  };

  const handleProductClick = () => {
    console.log('Naviguer vers les détails du produit');
  };

  return (
    <div className="grid grid-cols-12 mt-12 h-full">
      {/* Section des catégories */}
      <div className="col-span-10 col-start-2 mb-12">
        {/* Afficher toutes les catégories sur les grands écrans */}
        <div className="hidden lg:flex items-center gap-4">
          {categories.map((category, index) => (
            <button
              key={index}
              className="px-4 py-2 bg-transparent text-tertiary hover:text-white rounded-lg font-montserrat font-semibold hover:bg-secondary border border-gray-200 transition duration-300"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Navigation avec icônes sur les petits écrans */}
        <div className="flex lg:hidden items-center gap-4">
          {/* Bouton précédent */}
          <button
            onClick={handlePrev}
            className={`p-2 rounded-full bg-primary text-white ${visibleCategories === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={visibleCategories === 0}
          >
            <FaChevronLeft />
          </button>

          {/* Boutons des catégories visibles */}
          <div className="flex items-center gap-4">
            {categories.slice(visibleCategories, visibleCategories + 3).map((category, index) => (
              <button
                key={index}
                className="px-4 py-2 bg-transparent text-tertiary hover:text-white rounded-lg font-montserrat font-semibold hover:bg-secondary border border-gray-200 transition duration-300"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Bouton suivant */}
          <button
            onClick={handleNext}
            className={`p-2 rounded-full bg-primary text-white ${visibleCategories + 3 >= categories.length ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={visibleCategories + 3 >= categories.length}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
        
      {/* Section des produits */}
      <div className="grid sm:grid-cols-3 grid-cols-1 col-span-10 col-start-2 w-full gap-8">

        <Product
          name="Maïs"
          image="src/assets/maïs.jpg"
          pricePerKg={500}
          onProductClick={() => {}}
        />

        <Product
          name="Riz"
          pricePerKg={15000}
          image="src/assets/riz.jpg"
          onProductClick={handleProductClick}
        />

        <Product
          name="Arachide"
          pricePerKg={5000}
          image="src/assets/arachide.jpg"
          onProductClick={handleProductClick}
        />

        <Product
          name="Maïs"
          image="src/assets/maïs.jpg"
          pricePerKg={500}
          onProductClick={() => {}}
        />

        <Product
          name="Riz"
          pricePerKg={15000}
          image="src/assets/riz.jpg"
          onProductClick={handleProductClick}
        />

        <Product
          name="Arachide"
          pricePerKg={5000}
          image="src/assets/arachide.jpg"
          onProductClick={handleProductClick}
        />
       
      </div>
    </div>
  )
}