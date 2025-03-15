import React from 'react'
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaFacebook, FaWhatsapp } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className='grid grid-cols-12 text-white flex items-center justify-center bg-secondary '>
        <div className="col-span-10 col-start-2 flex flex-col pt-30">
            <div className="grid grid-cols-12 flex items-center justify-between pb-30 border-b border-gray-200">
                <div className="col-span-3 flex flex-col gap-4">
                    <div className="flex items-center space-x-2">
                      <span className='h-4 w-4 rounded-full bg-primary'></span>
                      <h1 className='text-5xl text-primary font-semibold font-montserrat'>AgroShop</h1>
                    </div>
                    <p className='font-montserrat sm:text-lg text-sm text-white '>AgroShop est une plateforme de vente en ligne de produits agricoles.</p>
                </div>
                <div className="col-span-8 col-start-6 h-full flex items-start justify-between">
                    {/* les liens rapides  */}
                    {/* <div className="">
                      <h1 className='font-montserrat font-bold text-2xl'>LIENS RAPIDES</h1>
                      <ul className='mt-8 flex flex-col space-y-2'>
                          <li className='font-montserrat font-medium text-xl'>
                            <a href="#">Accueil</a>
                          </li>
                          <li className='font-montserrat font-medium text-xl'>
                            <a href="#">Produits</a>
                          </li>
                          <li className='font-montserrat font-medium text-xl'>
                            <a href="#">Panier</a>
                          </li>
                      </ul>
                    </div> */}

                    {/* nos differents contacts */}
                    <div className="">
                      <h1 className='font-montserrat font-semibold text-2xl'>CONTACTS</h1>
                      <ul className='mt-8 flex flex-col space-y-2'>
                          <li className='font-montserrat text-lg'>
                            <a href="#">
                              <span className='flex items-center gap-2'>
                                <FaMapMarkerAlt className='text-white' />
                                <span>Abidjan, Côte d'Ivoire</span>
                              </span>
                            </a>
                          </li>
                          <li className='font-montserrat text-lg'>
                            <a href="#">
                              <span className='flex items-center gap-2'>
                                <FaEnvelope className='text-white' />
                                <span>agroshop@gmail.com</span>
                              </span>
                            </a>
                          </li>
                          <li className='font-montserrat text-lg'>
                            <a href="#">
                              <span className='flex items-center gap-2'>
                                <FaPhone className='text-white' />
                                <span>+229 01 50 00 01 50</span>
                              </span>
                            </a>
                          </li>
                          <li className='font-montserrat text-lg'>
                            <a href="#">
                              <span className='flex items-center gap-2'>
                                <FaFacebook className='text-white' />
                                <span>AgroShop</span>
                              </span>
                            </a>
                          </li>
                          <li className='font-montserrat text-lg'>
                            <a href="#">
                              <span className='flex items-center gap-2'>
                                <FaX className='text-white' />
                                <span>AgroShop</span>
                              </span>
                            </a>
                          </li>
                          <li className='font-montserrat text-lg'>
                            <a href="#">
                              <span className='flex items-center gap-2'>
                                <FaWhatsapp className='text-white' />
                                <span>+229 01 20 01 02 03</span>
                              </span>
                            </a>
                          </li>
                      </ul>
                    </div>

                    {/* les liens rapides pages  */}
                    <div className="">
                      <h1 className='font-montserrat font-semibold text-2xl'>PAGES</h1>
                      <ul className='mt-8 flex flex-col space-y-2'>
                          <li className='font-montserrat text-lg'>
                            <a href="#">Accueil</a>
                          </li>
                          <li className='font-montserrat text-lg'>
                            <a href="#">Produits</a>
                          </li>
                          <li className='font-montserrat text-lg'>
                            <a href="#">Panier</a>
                          </li>
                          <li className='font-montserrat text-lg'>
                            <a href="#">Qui sommes nous?</a>
                          </li>

                      </ul>
                    </div>

                    {/* les liens de conditions d'utilistions  */}
                    <div className="">
                      <h1 className='font-montserrat font-semibold text-2xl'>MENTIONS LEGALES</h1>
                      <ul className='mt-8 flex flex-col space-y-2'>
                          <li className='font-montserrat text-lg'>
                            <a href="#">Condition generale d'utilisation</a>
                          </li>
                          <li className='font-montserrat text-lg'>
                            <a href="#">Confidentialité</a>
                          </li>
                      </ul>
                    </div>
                </div>
            </div>

            <small className='text-white text-center font-montserrat text-base p-4'>Copyright Agroshop All Rights Reserved 2025</small>
        </div>
    </footer>
  )
}

export default Footer