import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className="h-screen w-full flex">
      <div className="w-1/6 h-screen bg-gray-100 shadow-xl ">
        <div className="flex flex-col justify-start h-full p-10">
          <Link to='/' className=''>
              <div className="hidden lg:flex items-center space-x-2">
                  <span className='h-2.5 w-2.5 rounded-full bg-primary'></span>
                  <h1 className='text-2xl text-primary font-semibold font-montserrat'>AgroShop</h1>
              </div>
          </Link>
          <ul className='flex flex-col gap-10 mt-20'>
            <li className="text-tertiary flex items-center font-montserrat font-semibold text-xl ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-tertiary mr-4"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a8 8 0 100 16 8 8 0 000-16zm1.5 11.5a1.5 1.5 0 11-3 0v-3a1.5 1.5 0 013 0v3zm-.5-9a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
                  clipRule="evenodd"
                />
              </svg>
              Overview
            </li>
            <li className="text-tertiary flex items-center font-montserrat font-semibold text-xl ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-tertiary mr-4"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a8 8 0 100 16 8 8 0 000-16zm1.5 11.5a1.5 1.5 0 11-3 0v-3a1.5 1.5 0 013 0v3zm-.5-9a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
                  clipRule="evenodd"
                />
              </svg>
              Products
            </li>
            <li className="text-tertiary flex items-center font-montserrat font-semibold text-xl ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-tertiary mr-4"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a8 8 0 100 16 8 8 0 000-16zm1.5 11.5a1.5 1.5 0 11-3 0v-3a1.5 1.5 0 013 0v3zm-.5-9a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
                  clipRule="evenodd"
                />
              </svg>
              Customers
            </li>
            <li className="text-tertiary flex items-center font-montserrat font-semibold text-xl ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-tertiary mr-4"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a8 8 0 100 16 8 8 0 000-16zm1.5 11.5a1.5 1.5 0 11-3 0v-3a1.5 1.5 0 013 0v3zm-.5-9a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
                  clipRule="evenodd"
                />
              </svg>
              Orders
            </li>
            <li className="text-tertiary flex items-center font-montserrat font-semibold text-xl ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-tertiary mr-4"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a8 8 0 100 16 8 8 0 000-16zm1.5 11.5a1.5 1.5 0 11-3 0v-3a1.5 1.5 0 013 0v3zm-.5-9a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
                  clipRule="evenodd"
                />
              </svg>
              Settings
            </li>
          </ul>
        </div>
      </div>
      <div className="w-5/6 h-screen bg-white px-8 py-4 flex flex-col gap-4">
        <div className="h-20 bg-white rounded-xl shadow-xs w-full flex items-center gap-140 p-4">
          <div className="flex flex-1 gap-50 items-center justify-between">
            <h1 className="text-xl font-montserrat font-semibold text-tertiary">Dashboard</h1>
            <div className="h-12 col-span-4 col-start-4 relative flex-1">
                <input 
                    type="text" 
                    placeholder='search'
                    className='w-full h-full bg-transparent rounded-full border-primary border-2 outline-none sm:pl-10 pl-8 py-4 font-montserrat font-semibold text-tertiary sm:text-md text-sm'
                />
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary" />
            </div>
          </div>
          <div className="h-14 w-14 rounded-full bg-primary flex items-center justify-center cursor-pointer">
            <span className="text-white font-montserrat font-semibold text-xl">A</span>
          </div>
        </div>
        <p className='py-8 pl-10 text-4xl font-montserrat font-semibold text-tertiary'>
          Overview
        </p>
        <div className="h-full bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  )
}

export default Dashboard