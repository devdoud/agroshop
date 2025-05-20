import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {

  // utilisation de react redux 
    // const dispatch = useDispatch()

  // récupération des données du produit à partir de l'url
    const { id }  = useParams()
    console.log(id)

  // récupération des données du produit à partir de l'API
    const [product, setProduct] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchProduct = async () => {
          try {
              const response = await fetch('https://api.fermierconnect.com/product/get-product-details',
                {
                  method: 'POST',
                  mode: 'cors',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(
                    {productId: id}
                  )
                }
              );
              const data = await response.json();
              console.log(data.data);
              
              setProduct(data.data)
              setIsLoading(false)
          } catch (error) {
            console.error('Erreur lors de la récupération des produits :', error);
          }
      };

      fetchProduct();

    }, [id] 
)

if (isLoading) {
  return (
    <div className='flex items-center mt-14 gap-10 mx-14 mt-40 rounded-lg'>
        <div className="h-2/3 w-2/5">
            <Skeleton height={240} className="rounded-lg" />
        </div>
        <div className="flex flex-col w-3/5 gap-4">    
          <Skeleton height={20} width="30%" className="rounded-lg" />
          <Skeleton height={25} width="50%" className="rounded-lg" />
          <Skeleton height={20} width="15%" className="rounded-lg" />
          <Skeleton height={40} width="30%" className="rounded-lg" />
        </div>
    </div>
  );
}


return (
    <div className="grid grid-cols-12 mt-32 h-full">
        <div className="grid grid-cols-5 gap-10 col-span-10 col-start-2 mb-4 flex justify-end items-end">
            {/* product image */}
            <div className="col-span-2">
                <img src={product.image} alt="product image" className='rounded-lg w-full'/>
            </div>

            {/* product informations and add to basket button */}
            <div className="col-span-3 flex flex-col justify-start items-start gap-8">
                <h3 className='text-terrtiary font-bold text-2xl font-montserrat'>{product.name}</h3>
                <p className='text-tertiary font-medium text-lg font-montserrat'> 
                    { product.description }
                </p>
                <p className='font-montserrat font-bold text-xl text-ertirry'>{product.price} F CFA</p>
                {/* <div className="flex flex-col justify-start gap-4">
                  <h3 className='text-terrtiary font-bold text-2xl font-montserrat'>Product name</h3>
                  <p className='text-tertiary font-medium text-lg font-montserrat'> 
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum commodi soluta, blanditiis eos, aperiam libero ad facilis tempore cum eligendi natus nisi nemo voluptatibus vitae a nesciunt delectus laudantium mollitia!
                        Optio beatae dicta voluptate laboriosam quas aspernatur quibusdam, ullam maiores, eos ea exercitationem asperiores, a eius fuga. Mollitia cupiditate adipisci veritatis aspernatur, nesciunt enim aperiam laboriosam voluptate sapiente placeat provident. 
                  </p>
                  <p className='font-montserrat font-bold text-xl text-ertirry'>15000 F CFA</p>
                </div> */}
                <button
                    className='w-1/3 py-2 border-gray-200 border rounded-lg flex items-center justify-center gap-4 bg-primary text-white cursor-pointer'
                    onClick={(e) => { 
                          e.stopPropagation;  
                          dispatch(addToCart({name, price, image, id}))
                      }}
                >
                    <span className='font-semibold font-montserat text-base'>Panier</span>
                </button>
            </div>
        </div>
    </div>
  )
}

export default ProductDetail