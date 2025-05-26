import React, { useState, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { toast } from 'react-toastify';

const Login = () => {
  // Ici se trouve les variables d'état
  const [formData, setFormData] = useState({
    email: '', 
    password: ''
  })


  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
      // Simulate page loading
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }, []);


  // Ici se trouve les fonctions
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

const validate = (values) => {
    let errors = {}
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    if (!values.email) {
      errors.email = 'L\'adresse mail est requise'
    } else if (!emailRegex.test(values.email)) {
      errors.email = 'L\'adresse mail est invalide'
    }
    if (!values.password) {
      errors.password = 'Le mot de passe est requis'
    } else if (values.password.length < 6) {
      errors.password = 'Le mot de passe doit contenir au moins 6 caractères'
    }
    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      setErrorMessage('');
      try {
        // const response = await fetch('https://api.fermierconnect.com/api/user/login', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify(formData)
        // });
        const response = await fetch('http://77.37.54.205:8080/api/category/get', {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to log in');
        }
        const data = await response.json();
        console.log('Login successful', data);

        // Stocker le token dans le localStorage ou le sessionStorage
        localStorage.setItem('accesstoken', data.data.accesstoken);

        toast.success('Connexion réussie !')
        navigate('/'); // Redirige vers la page de connexion
      } catch (error) {
        console.error('Error logging in', error);
        setErrorMessage('Une erreur est survenue lors de la connexion. Veuillez réessayer.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  if (isLoading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 h-full">
          <div className="h-screen bg-gray-200"></div>
          <div className="h-screen"> 
            <div className="sm:w-2/4 w-3/4 h-screen flex flex-col align-center justify-center mx-auto">
              <h1 className='text-3xl font-medium font-montserrat text-tertiarry text-center'>
                <Skeleton width={350} height={20} />
              </h1>
              <form className='flex flex-col gap-8 mt-8'>
                <div className="flex flex-col justify-start align-start">
                  <Skeleton height={12} width={90} />
                  <Skeleton height={40} />
                </div>

                <div className="flex flex-col justify-start align-start">
                  <Skeleton height={12} width={90} />
                  <Skeleton height={40} />
                  <Skeleton height={10} width={250} />
                </div>
                   
                <div className="mt-4">
                  <Skeleton height={40} />
                  <div className="flex align-center justify-center mt-4 gap-1">
                      <Skeleton height={12} width={350} />
                      <Skeleton height={12} width={90} />
                  </div> 
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    }

  

  // Ici se trouve le code de la page de connexion
  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 mt-8">
        <div className="bg-[url(/assets/cantsco.jpg)] bg-cover bg-no-repeat" ></div>
        <div className="overflow-hidden">
            <div className="sm:w-2/4 h-screen w-3/4 flex flex-col align-center justify-center mx-auto">
                <h1 className='text-3xl font-semibold font-montserrat text-tertiarry text-center'>Connexion Page</h1>
                <form action="" onSubmit={handleSubmit} className='flex flex-col gap-8 mt-8'>

                  {errorMessage && <span className="text-red-500 text-center font-montserrat text-sm mt-1">{errorMessage}</span>}
                            
                  <div className="flex flex-col justify-start align-start">
                                <label htmlFor="email" className="block text-sm font-semibold text-tertiary font-montserrat">Adresse mail <span className="text-red-500">*</span></label>
                                {isSubmitting ?
                                    (<Skeleton height={40} /> )
                                    : (
                                        <input 
                                            type="email" 
                                            name="email" 
                                            id="email" 
                                            placeholder='fermierconnect@gmail.com'
                                            value={formData.email}
                                            onChange={handleChange} 
                                            className={`mt-1 p-2 sm:p-3 focus:ring-indigo-500 focus:border-primary block w-full shadow-sm sm:text-sm border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                        />
                                    )
                                }
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div className="flex flex-col justify-start align-start">
                      <label htmlFor="password" className="block text-sm font-semibold text-tertiary font-montserrat">Mot de passe <span className="text-red-500">*</span></label>
                      {isSubmitting ?
                          (<Skeleton height={40} /> )
                          : (
                            <div className="relative w-full">
                              <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                id="password"
                                placeholder='********'
                                value={formData.password}
                                onChange={handleChange}
                                className={`mt-1 p-2 sm:p-3 focus:ring-indigo-500 focus:border-primary block w-full shadow-sm sm:text-sm border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                              />
                              <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                                <button type="button" onClick={toggleShowPassword} className="focus:outline-none">
                                  {showPassword ? <FaEyeSlash /> : <FaEye /> }
                                </button>
                              </div>
                          </div>
                          )
                      }
                      {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}

                      <Link to='/forgotpassword' className='mt-2 text-tertiary text-sm font-montserrat font-semibold cursor-pointer'>Mot de passe oublié ?</Link>
                  </div>

                  <div className="">
                        <button
                          className='bg-primary mt-6 text-white p-2 sm:p-3 sm:text-xl text-center rounded-md font-montserrat font-semibold font-montserrat w-full'
                          type='submit'
                          disabled={isSubmitting}
                          onClick={handleSubmit}
                        >
                            {isSubmitting ? <div className="loader"></div> : 'Connexion'}
                        </button>
                        <p className='text-center text-tertiary text-lg font-montserrat font-semibold mt-4'>
                            Vous n'avez pas de compte ? 
                            <Link to='/signup' className='text-primary text-lg font-montserrat font-semibold'>Inscrivez-vous</Link>
                        </p>
                  </div>
                </form>
          </div>
          </div>
      </div>
  )
}

export default Login