import React from 'react'
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaFacebook, FaWhatsapp } from 'react-icons/fa';
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className='grid grid-cols-12 text-white flex items-center justify-center bg-secondary mt-12'>
        <div className="col-span-10 col-start-2 flex flex-col pt-30">
            <div className="grid sm:grid-cols-12 grid-cols-1 gap-8 flex sm:flex-row flex-col sm:items-center sm:justify-between pb-30 border-b border-gray-100">
                <div className="col-span-4 flex flex-col gap-4">
                    <Link to='/' className="flex items-center space-x-2 cursor-pointer">
                      <span className='h-4 w-4 rounded-full bg-primary'></span>
                      <h1 className='text-4xl text-primary font-semibold font-montserrat'>FermierConnect</h1>
                    </Link>
                    <p className='font-montserrat sm:text-lg text-sm text-white '>AgroShop est une plateforme de vente en ligne de produits agricoles.</p>
                </div>
                <div className="col-span-8 sm:col-start-7 flex sm:flex-row flex-col space-y-8 sm:items-start sm:justify-between">
                    <div className="">
                      <h1 className='font-montserrat font-semibold text-2xl'>CONTACTS</h1>
                      <ul className='mt-4 sm:mt-8 flex flex-col space-y-2'>
                          <li className='font-montserrat text-lg hover:text-primary'>
                            <a href="#">
                              <span className='flex items-center gap-2'>
                                <FaMapMarkerAlt className='text-white' />
                                <span>Cotonou, Benin</span>
                              </span>
                            </a>
                          </li>
                          <li className='font-montserrat text-lg  hover:text-primary'>
                            <a href="#">
                              <span className='flex items-center gap-2'>
                                <FaEnvelope className='text-white' />
                                <span>agroshop@gmail.com</span>
                              </span>
                            </a>
                          </li>
                          <li className='font-montserrat text-lg hover:text-primary'>
                            <a href="#">
                              <span className='flex items-center gap-2'>
                                <FaPhone className='text-white' />
                                <span>+229 01 97 25 57 08</span>
                              </span>
                            </a>
                          </li>
                          <li className='font-montserrat text-lg hover:text-primary'>
                            <a href="#">
                              <span className='flex items-center gap-2'>
                                <FaFacebook className='text-white' />
                                <span>AgriMarket</span>
                              </span>
                            </a>
                          </li>
                      </ul>
                    </div>

                    {/* les liens rapides pages  */}
                    <div className="">
                      <h1 className='font-montserrat font-semibold text-2xl'>PAGES</h1>
                      <ul className='mt-4 sm:mt-8 flex flex-col space-y-2'>
                          <li className='font-montserrat text-lg hover:text-primary'>
                            <a href="#">Accueil</a>
                          </li>
                          <li className='font-montserrat text-lg hover:text-primary'>
                            <a href="#">Produits</a>
                          </li>
                          <li className='font-montserrat text-lg hover:text-primary'>
                            <a href="#">Panier</a>
                          </li>
                          <li className='font-montserrat text-lg hover:text-primary'>
                            <a href="#">Qui sommes nous?</a>
                          </li>

                      </ul>
                    </div>

                    {/* les liens de conditions d'utilistions  */}
                    <div className="">
                      <h1 className='font-montserrat font-semibold text-2xl'>MENTIONS LEGALES</h1>
                      <ul className='mt-4 sm:mt-8 flex flex-col space-y-2'>
                          <li className='font-montserrat text-lg hover:text-primary'>
                            <a href="#">Condition generale d'utilisation</a>
                          </li>
                          <li className='font-montserrat text-lg hover:text-primary'>
                            <a href="#">Confidentialité</a>
                          </li>
                      </ul>
                    </div>
                </div>
            </div>

            <small className='text-white text-center font-light font-montserrat sm:text-base text-sm p-2'>Copyright © 2025 AgriMarket All Rights Reserved.</small>
        </div>
    </footer>
  )
}

export default Footer