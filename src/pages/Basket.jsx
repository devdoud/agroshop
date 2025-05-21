import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router";
import BasketProduct from '../components/BasketProduct'
import { toast } from 'react-toastify';
import { FedaCheckoutButton, FedaCheckoutContainer } from 'fedapay-reactjs';


const Basket = () => {
    const [cartProduct, setCartProducts] = useState([])

    let navigate = useNavigate();

    const PUBLIC_KEY = import.meta.env.VITE_PAYMENT_PUBLIC_KEY;

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
              
              setCartProducts(data.data || []); // Mettre à jour l'état avec les produits récupérés
            } catch (error) {
              console.error('Erreur lors de la récupération des produits du panier :', error);
            }
          };
        fetchCartProducts();
    }, [])

    const handleRemoveItem = async (id) => {
        try {
          const accesstoken = localStorage.getItem('accesstoken'); // Récupérer le token d'accès
          if (!accesstoken) {
            toast.error('Vous devez être connecté pour supprimer un produit.');
            return;
          }
      
          const response = await fetch(`api.fermierconnect.com:8080/api/cart/delete-cart-item`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accesstoken}`, // Ajouter le token dans l'en-tête Authorization
            },
            body: JSON.stringify({
              _id: id// ID du produit à supprimer
            }),
          });
      
          const responseText = await response.text();
      
          if (!response.ok) {
            throw new Error(`Erreur lors de la suppression du produit : ${responseText}`);
          }

          setCartProducts( (prevCartProducts) => prevCartProducts.filter((item) => item._id !== id) )
      
          toast.success('Produit supprimé avec succès.');
        } catch (error) {
          console.error('Erreur lors de la suppression du produit :', error);
          toast.error('Une erreur est survenue lors de la suppression du produit.');
        }
      };


      // const handleCheckout = async () => {
      //   try {
      //     const accesstoken = localStorage.getItem('accesstoken'); // Récupérer le token d'accès
      //     if (!accesstoken) {
      //       toast.error('Vous devez être connecté pour passer à la caisse.');
      //       return;
      //     }
      
      //     // Préparer les données pour l'API
      //     const list_items = cartProduct.map((item) => ({
      //       productId: item.productId._id,
      //       name: item.productId.name,
      //       price: item.productId.price,
      //       quantity: item.quantity,
      //     }));
      
      //     const subtotal_amount = list_items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      //     const total_amount = subtotal_amount; // Ajoutez des frais supplémentaires si nécessaire
      
      //     const body = {
      //       list_items,
      //       subtotal_amount,
      //       total_amount,
      //     };
      
      //     console.log('Données envoyées pour le paiement :', body);
      
      //     // Initialiser le paiement avec FedaPay
      //     FedaPay.init({
      //       public_key: PUBLIC_KEY, // Utilisez votre clé publique FedaPay
      //       transaction: {
      //         amount: total_amount, // Montant total
      //         currency: 'XOF', // Devise
      //       },
      //       customer: {
      //         firstname: 'John', // Remplacez par les données utilisateur
      //         lastname: 'Doe',
      //         email: 'user@example.com',
      //       },
      //       onComplete: async (response) => {
      //         console.log('Réponse du paiement :', response);
      
      //         // Vérifiez si le paiement a réussi
      //         if (response.status === 'approved') {
      //           // Envoyer la requête à l'API backend pour finaliser le paiement
      //           const apiResponse = await fetch('api.fermierconnect.com:8080/api/order/checkout', {
      //             method: 'POST',
      //             headers: {
      //               'Content-Type': 'application/json',
      //               'Authorization': `Bearer ${accesstoken}`,
      //             },
      //             body: JSON.stringify({
      //               ...body,
      //               paymentReference: response.transaction_id, // Référence du paiement
      //             }),
      //           });
      
      //           if (!apiResponse.ok) {
      //             throw new Error(`Erreur lors du paiement : ${apiResponse.statusText}`);
      //           }
      
      //           const data = await apiResponse.json();
      //           console.log('Réponse de l\'API de paiement :', data);
      
      //           toast.success('Paiement effectué avec succès !');
      //           navigate('/confirmation'); // Rediriger vers une page de confirmation
      //         } else {
      //           toast.error('Le paiement a échoué.');
      //         }
      //       },
      //       onCancel: () => {
      //         console.log('Paiement annulé par l\'utilisateur.');
      //         toast.error('Paiement annulé.');
      //       },
      //       onError: (error) => {
      //         console.error('Erreur lors du paiement :', error);
      //         toast.error('Une erreur est survenue lors du paiement.');
      //       },
      //     });
      
      //     FedaPay.open(); // Ouvrir l'interface de paiement
      //   } catch (error) {
      //     console.error('Erreur lors du paiement :', error);
      //     toast.error('Une erreur est survenue lors du paiement.');
      //   }
      // };

      const subtotal_amount = cartProduct.reduce(
        (sum, item) => sum + item.productId.price * item.quantity,
        0
      );
      
      const checkoutButtonOptions = {
        public_key: PUBLIC_KEY,
        transaction: {
          amount: subtotal_amount * 100, // Montant en centimes
          description: 'Paiement de votre panier',
        },
        currency: {
          iso: 'XOF',
        },
        button: {
          class: 'font-montserrat font-medium text-white bg-primary rounded-md py-2 mt-8 cursor-pointer focus:border-none',
          text: `Payer ${subtotal_amount} FCFA`,
        },
        onComplete: async (resp) => {
          const FedaPay = window['FedaPay'];
          if (resp.reason === FedaPay.DIALOG_DISMISSED) {
            toast.error('Vous avez fermé la boîte de dialogue.');
          } else {
            toast.success('Paiement effectué avec succès !');
            console.log('Transaction terminée :', resp.transaction);
    
            // Envoyer la requête au backend pour finaliser la commande
            const accesstoken = localStorage.getItem('accesstoken');
            const response = await fetch('https://api.fermierconnect.com/api/order/checkout', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accesstoken}`,
              },
              body: JSON.stringify({
                list_items: cartProduct.map((item) => ({
                  productId: item.productId._id,
                  name: item.productId.name,
                  price: item.productId.price,
                  quantity: item.quantity,
                })),
                subtotal_amount,
                total_amount: subtotal_amount,
                paymentReference: resp.transaction.id,
              }),
            });
    
            if (!response.ok) {
              throw new Error('Erreur lors de la finalisation de la commande.');
            }
    
            navigate('/confirmation');
          }
        },
      };

  return (
    <>
        <div className="grid grid-cols-12 mt-12 h-full">
            <div className=" col-span-10 col-start-2 mb-4">
                <p className='font-montserrat font-bold text-2xl leading-[28.8px]'>Votre Panier</p>

                <section className='mt-[38px] flex mb-[100px] gap-8 sm:flex-row flex-col'>
                    <div className="bg-[#F0F2F4] flex-1 px-[12px] py-[13px] flex flex-col gap-[13px]">
                        {
                            cartProduct.length === 0 ? 
                            (
                                <div className="my-auto flex flex-col items-center justify-center gap-4">
                                    <h3 className='font-montserrat font-bold text-3xl text-center'>Votre Panier est vide</h3>
                                    <button 
                                        className='p-2 rounded-md bg-primary text-white text-lg font-medium text-enter cursor-pointer w-48 focus:border-none'
                                        onClick={() => navigate('/')}
                                    >Ajouter Produits</button>
                                </div>
                            ) :
                            (
                                cartProduct.map( (item) => (
                                    <BasketProduct 
                                        name={item.productId.name} 
                                        price={item.productId.price} 
                                        image={item.productId.image} 
                                        id={item.productId._id}
                                        id_panier={item._id}
                                        onRemove={() => handleRemoveItem(item._id)}
                                        quantity={item.quantity} 
                                        key={item.productId._id}
                                    />
                                ) )
                            )
                        }
                    </div>
                    <div className="bg-[#F0F2F4] p-8 h-3/4 flex flex-col gap-[20px] w-[350px]">
                        <p className='text-tertiary font-montserrat font-bold text-lg text-center'>Résumé de la commande</p>
                        <div className='flex justify-between items-center'>
                            <p className='font-medium font-montserrat text-tertiary text-sm'>Estimation du total </p>
                            <span className='text-tertiary text-sm font-bold'>15000F CFA</span>
                        </div>
                        <p className='font-montserrat text-[10px] font-semibold leading-[12px] text-[#1D252C]'>Comment souhaitez-vous obtenir votre commande?</p>
                        <label className='text-[#001E73] font-montserrat font-medium text-[10px] leading-[12px] flex gap-1 items-center'>
                            <input type="checkbox" />
                            Expédition à domicile
                        </label>
                        <label className='text-[#C5CBD5] font-montserrat font-medium text-[10px] leading-[12px] flex gap-1 items-center'>
                            <input type="checkbox" />
                            Ramassage au magasin
                        </label>
                        {/* <button
                            className='font-montserrat font-medium text-white bg-primary rounded-md py-2 mt-8 cursor-pointer focus:border-none'
                            onClick={handleCheckout}
                        >Passer à la caisse</button> */}
                        <FedaCheckoutButton options={checkoutButtonOptions} />
                    </div>
                </section>
            </div>
        </div>
    </>
  )
}

export default Basket