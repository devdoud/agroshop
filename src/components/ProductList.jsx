import React, { useState, useEffect, useContext } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import Product from './product';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function ProductList () {
  // const { searchQuery } = useContext(SearchContext);
  const { searchQuery } = useOutletContext();
  const [visibleCategories, setVisibleCategories] = useState(0); // Index de la première catégorie visible
  const [selectedCategory, setSelectedCategory] = useState('Tous'); // Catégorie sélectionnée
  const [products, setProducts] = useState([]); // Liste des produits récupérés depuis l'API

  // const categories = ['Tout', 'cereale', 'Légumineuses', 'Tubercules', 'Fruits'];
  const [category, setCategory] = useState([]); // Catégorie sélectionnée
  const [filteredProducts, setFilteredProducts] = useState([]); // Produits filtrés par catégorie
  // const navigate = useNavigate();
  

  useEffect(() => {
    const fetchCategories = async () => {
      try { 
        // const response = await fetch('https://api.fermierconnect.com/api/category/get', {
        //   method: 'GET',
        //   mode: 'cors',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        // });
        const response = await fetch('http://77.37.54.205:8080/api/category/get', {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        console.log('Data from API:', data.data);
        data.data.unshift({ _id: 'Tous', name: 'Tous' }); // Ajouter la catégorie "Tout" au début du tableau
        setCategory(data.data || []);
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories :', error);
      }
    }
    fetchCategories();
  }
  , []); // Récupérer les catégories une seule fois au chargement du composant

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // let url = 'https://api.fermierconnect.com/api/product/get';
        let url = 'http://77.37.54.205:8080/api/product/get';
        let body;
        const selectedCategoryObject = category.find(
          (categorie) => categorie.name === selectedCategory
        );

        const id_categorie = selectedCategoryObject ? selectedCategoryObject._id : null;
        console.log('is selected:', id_categorie)
  
        // Si une catégorie spécifique est sélectionnée, utilisez l'endpoint "get-product-by-category"
        if (selectedCategory !== 'Tous') {
          // url = 'https://api.fermierconnect.com/api/product/get-product-by-category';       
          url = 'http://77.37.54.205:8080/api/product/get-product-by-category';   
          body = JSON.stringify(
            {id: id_categorie}
          )
        }

        console.log('URL utilisée :', url);
        console.log('Body envoyé :', body);
  
        const response = await fetch(url, {
          method: selectedCategory !== 'Tout' ? 'POST' : 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: selectedCategory !== 'Tout' ? body : null, // Inclure le body uniquement pour POST
        });
  
        const data = await response.json();
        console.log('Data from API:', data);
        setProducts(data.data || []);
      } catch (error) {
        console.error('Erreur lors de la récupération des produits :', error);
      }
    };
  
    fetchProducts();
  }, [selectedCategory]); // Recharger les produits lorsque la catégorie change
  
  // Filtrer les produits en fonction de la recherche
  useEffect(() => {
    let filtered = products;

    if (searchQuery.trim() !== '') {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);

    console.log('Filtered products:', filtered);

  }, [searchQuery, products]);

  
  const handleNext = () => {
    if (visibleCategories + 3 < category.length) {
      setVisibleCategories(visibleCategories + 1);
    }
  };

  const handlePrev = () => {
    if (visibleCategories > 0) {
      setVisibleCategories(visibleCategories - 1);
    }
  };

  return (
    <div className="grid grid-cols-12 mt-36">
          
          {/* Section des catégories */}
          <div className="col-span-10 col-start-2 mb-12"> 
            
            {/* Afficher toutes les catégories sur les grands écrans */}
            <div className="hidden lg:flex items-center gap-4">
                {category.map((categori) => (
                  <button
                    key={categori._id}
                    onClick={() => setSelectedCategory(categori.name)}
                    className={`px-4 py-2 rounded-lg font-montserrat font-semibold border border-gray-200 transition duration-300 ${
                      selectedCategory === categori.name
                        ? 'bg-primary text-white'
                        : 'bg-transparent text-tertiary hover:text-white hover:bg-secondary'
                    }`}
                  >
                    {categori.name}
                  </button>
                ))} 
            </div>

            {/* Navigation avec icônes sur les petits écrans */}
            <div className="flex lg:hidden items-center gap-4">
              
              {/* Bouton précédent */}
              <button
                onClick={handlePrev}
                className={`p-2 rounded-full bg-primary text-white ${
                  visibleCategories === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={visibleCategories === 0}
              >
                <FaChevronLeft />
              </button>

              {/* Boutons des catégories visibles */}
              <div className="flex items-center gap-4">
                  {category.slice(visibleCategories, visibleCategories + 3).map((categori) => (
                    <button
                      key={categori._id}
                      onClick={() => setSelectedCategory(categori.name)}
                      className={`px-4 py-2 rounded-lg font-montserrat font-semibold border border-gray-200 transition duration-300 ${
                        selectedCategory === categori.name
                          ? 'bg-primary text-white'
                          : 'bg-transparent text-tertiary hover:text-white hover:bg-secondary'
                      }`}
                    >
                      {categori.name}
                    </button>
                  ))}
              </div>

              {/* Bouton suivant */}
              <button
                onClick={handleNext}
                className={`p-2 rounded-full bg-primary text-white ${
                  visibleCategories + 3 >= category.length ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={visibleCategories + 3 >= category.length}
              >
                <FaChevronRight />
              </button>
            
            </div>
          </div>

        
          {/* Section des produits sans l'utilisation de l'api */}
          <div className="grid sm:grid-cols-3 grid-cols-1 col-span-10 col-start-2 w-full gap-8">

            {
              products.length > 0 ? (
                filteredProducts.map(product => (
                  <Product
                      key={product._id}
                      id={product._id}
                      name={product.name}
                      image={product.image}
                      price={product.price}   
                      stock={product.stock}                
                  />
                ))
              ) : (
                <div className="col-span-3 flex items-center justify-center my-41">
                  <p className="text-tertiary font-montserrat font-semibold text-xl">Aucun produit trouvé</p>
                </div>
              )
            }
          </div>
    </div>
  )
}