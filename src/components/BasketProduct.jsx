
import React, { useState } from 'react'
import { FaMinusCircle, FaPlusCircle, FaBookmark, FaTrash, FaCheck } from 'react-icons/fa';
import { applyTempUpdate, removeFromCart, updateTempQuantity } from '../features/shopCarts/cartSlice';
import { toast } from 'react-toastify';


  const BasketProduct = ({ name, price, image, id, quantity, onRemove, id_panier }) => {

  const [localQuantity, setLocalQuantity] = useState(quantity)

  const handleUpdateQuantity = async (id, quantiti) => {
    if (quantiti < 1) {
      toast.error('La quantité doit être au moins 1.');
      return;
    }

    console.log(quantiti)
    console.log(id)

    try {
      const accesstoken = localStorage.getItem('accesstoken'); // Récupérer le token d'accès
      if (!accesstoken) {
        toast.error('Vous devez être connecté pour mettre à jour la quantité.');
        return;
      }
  
      const response = await fetch('http://77.37.54.205:8080/api/cart/update-qty', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accesstoken}`, // Ajouter le token dans l'en-tête Authorization
        },
        body: JSON.stringify({
          _id: id_panier,
          qty: quantiti, // Nouvelle quantité
        }),
      });

  
      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour de la quantité.');
      }
  
      const data = await response.json();
      console.log('Quantité mise à jour avec succès :', data);
  
      toast.success('Quantité mise à jour avec succès.');
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la quantité :', error);
      toast.error('Une erreur est survenue lors de la mise à jour de la quantité.');
    }
  };
  
  const handleIncreaseQuantity = () => {
    const newQuantity = localQuantity + 1;
    setLocalQuantity(newQuantity);
    handleUpdateQuantity(id, newQuantity);
  };
  
  const handleDecreaseQuantity = () => {
    if (localQuantity > 1) {
      const newQuantity = localQuantity - 1;
      setLocalQuantity(newQuantity);
      handleUpdateQuantity(id, newQuantity);
    } else {
      toast.error('La quantité doit être au moins 1.');
    }
  };

  const calculateTotalPrice = () => {
    return localQuantity * price;
  };

  const handleApplyUpdate = () => {
    tempItems.forEach((item) =>{
        dispatch(applyTempUpdate(item.id))
    })
  }
  
  return (
    <div className='flex flex-col bg-white rounded drop-shadow-[0_1.5px_0_rgb(197, 203, 213)]'>
        <div
          className="flex border-b border-[#E0E6EF] items-end justify-between pt-[18px] pb-[35px] px-[24px]"
        >
          <div className="flex flex-col md:flex-row sm:flex-col gap-8 items-start">
            <img src={image} alt={name} className="h-37 w-60" />
            <div className="flex flex-col">
              <h4 className="font-montserrat font-semibold text-lg text-tertiary">{name}</h4>
              <div className="flex items-center gap-2 my-4">
                <FaCheck className="text-tertiary  h-4 w-4" />
                <p className="font-montserrat font-medium text-sm">Expédition disponible</p>
              </div>
              <div className="flex gap-4 items-center">
                <FaMinusCircle
                  className="text-primary  h-4 w-4"
                  onClick={handleDecreaseQuantity}
                />
                <input
                  className="border border-gray-200 w-24 rounded-md text-center"
                  type="number"
                  value={localQuantity}
                  onChange={(e) => {
                    const newQuantity = parseInt(e.target.value, 10);
                    if (newQuantity >= 1) {
                        setLocalQuantity(newQuantity);
                        handleUpdateQuantity(id, newQuantity);
                    } else {
                        toast.error('La quantité doit être au moins 1.');
                    }
                  }}
                />
                <FaPlusCircle
                  className="text-primary h-4 w-4"
                  onClick={handleIncreaseQuantity}
                />
              </div>
              <div className="flex gap-4 mt-[15px] items-center">
                <button
                  className="flex gap-1 items-center justify-center bg-red-500 py-1 px-3 rounded-md"
                  onClick={onRemove}
                >
                  <FaTrash className="text-white  h-3 w-3" />
                  <span className="font-montserrat font-medium text-sm text-white">Supprimer</span>
                </button>
                <button
                  onClick={handleApplyUpdate}
                  className="bg-primary text-white flex justify-center items-center rounded-md text-sm py-1 px-3"
                >
                  Mettre à jour
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end justify-end gap-1">
            <span className="font-montserrat text-[24px] text-[#1D252C] mt-[8px] leading-[24px]">
              {price} F CFA
            </span>
          </div>
        </div>  
        <div className="flex justify-between py-[20.5px] pl-[123px] pr-[24px] items-center">
            <p className='text-[#1D252C] font-montserrat font-semibold text-[14px] leading-[16.8px]'>Total des produits</p>
            <span className='font-montserrat text-sm font-bold leading-[18px]'>{calculateTotalPrice()}F CFA</span> 
        </div>
    </div>
  )
}

export default BasketProduct
