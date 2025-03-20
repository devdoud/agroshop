import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router';
import Product from './product';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function ProductList () {

  const categories = ['Tous', 'Céréales', 'Légumineuses', 'Tubercules', 'Fruits'];
  const [visibleCategories, setVisibleCategories] = useState(0); // Index de la première catégorie visible
  const [selectedCategory, setSelectedCategory] = useState('Tous'); // Catégorie sélectionnée
  const [products, setProducts] = useState([
    {id: 1, name: 'Maïs', image:'src/assets/maïs.jpg', price: 500},
    {id: 2, name: 'Riz', image:'src/assets/riz.jpg', price: 1000},
    {id: 3, name: 'Arachide', image:'src/assets/arachide.jpg', price: 700},
  ]); // Liste des produits
  const [filteredProducts, setFilteredProducts] = useState([]); // Produits filtrés par catégorie
  // const navigate = useNavigate();
  
  
  // Récupérer les produits depuis l'API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://api.example.com/products'); 
        
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data); // Par défaut, afficher tous les produits
      } catch (error) {
        console.error('Erreur lors de la récupération des produits :', error);
      }
    };

    fetchProducts();
  }, []);
  

  // Filtrer les produits en fonction de la catégorie sélectionnée
  useEffect(() => {
    if (selectedCategory === 'Tous') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.category === selectedCategory);
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, products]);

  
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

  // const handleProductClick = (productId) => {
  //   navigate(`/detailproduit/${productId}`);
  // };

  const handleProductClick = (productId) => {
    console.log("Navigate to the product detail page", productId);
  };

  return (
    <div className="grid grid-cols-12 mt-36">
          
          {/* Section des catégories */}
          {/* <div className="col-span-10 col-start-2 mb-12"> */}
            
            {/* Afficher toutes les catégories sur les grands écrans */}
            {/* <div className="hidden lg:flex items-center gap-4">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-montserrat font-semibold border border-gray-200 transition duration-300 ${
                      selectedCategory === category
                        ? 'bg-primary text-white'
                        : 'bg-transparent text-tertiary hover:text-white hover:bg-secondary'
                    }`}
                  >
                    {category}
                  </button>
                ))} 
            </div> */}

            {/* Navigation avec icônes sur les petits écrans */}
            {/* <div className="flex lg:hidden items-center gap-4"> */}
              
              {/* Bouton précédent */}
              {/* <button
                onClick={handlePrev}
                className={`p-2 rounded-full bg-primary text-white ${
                  visibleCategories === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={visibleCategories === 0}
              >
                <FaChevronLeft />
              </button> */}

              {/* Boutons des catégories visibles */}
              {/* <div className="flex items-center gap-4">
                  {categories.slice(visibleCategories, visibleCategories + 3).map((category, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg font-montserrat font-semibold border border-gray-200 transition duration-300 ${
                        selectedCategory === category
                          ? 'bg-primary text-white'
                          : 'bg-transparent text-tertiary hover:text-white hover:bg-secondary'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
              </div> */}

              {/* Bouton suivant */}
              {/* <button
                onClick={handleNext}
                className={`p-2 rounded-full bg-primary text-white ${
                  visibleCategories + 3 >= categories.length ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={visibleCategories + 3 >= categories.length}
              >
                <FaChevronRight />
              </button> */}
            
            {/* </div>
          </div> */}

          {/* Section des catégories sans l'utilisation de l'api */}
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
        
          {/* Section des produits sans l'utilisation de l'api */}
          <div className="grid sm:grid-cols-3 grid-cols-1 col-span-10 col-start-2 w-full gap-8">

            {
              products.map(product => (
                <Product id={product.id} name={product.name} image={product.image} price={product.price} key={product.id} />
              ))
            }

            {/* <Product
              name="Maïs"
              image="src/assets/maïs.jpg"
              pricePerKg={500}
              onProductClick={() => handleProductClick(1)}
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
            /> */}

            {/* <Product
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
            /> */}
          
          </div>

          {/* Section des produits */}
          {/* <div className="grid sm:grid-cols-3 grid-cols-1 col-span-10 col-start-2 w-full gap-8">
                {filteredProducts.map(product => (
                  <Product
                    key={product.id}
                    name={product.name}
                    image={product.image}
                    pricePerKg={product.pricePerKg}
                    onProductClick={() => handleProductClick(product.id)}
                  />
                ))}
            </div> */}
    </div>
  )
}