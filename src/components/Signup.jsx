import React, { useState, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
// import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import 'flag-icons-css/css/flag-icon.min.css';

const Signup = () => {
// ici on peut mettre les variables qui seront utilisées dans la page d'inscription
const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    password: '',
    organization: '',
    email: '',
    mobile: '',
    compte: '',
    domaine: ''
  });
  
const [errors, setErrors] = useState({});
const [isSubmitting, setIsSubmitting] = useState(false);
const [isLoading, setIsLoading] = useState(true);
const [errorMessage, setErrorMessage] = useState('');

const navigate = useNavigate();

useEffect(() => {
    // Simulate page loading
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

// ici on peut mettre les fonctions qui seront utilisées dans la page d'inscription
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: name === 'mobile' ? Number(value) : value // Convertir en nombre si le champ est "mobile"
  });
};
  
  // const handlePhoneChange = (value) => {
  //   setFormData({
  //     ...formData,
  //     phone: value
  //   });
  // };

  const validate = () => {
    const newErrors = {};
    if (formData.name.length < 2) {
      newErrors.name = 'Le nom doit contenir au moins 2 caractères';
    }
    if (formData.lastName.length < 2) {
      newErrors.lastName = 'Le prénom doit contenir au moins 2 caractères';
    }
    if (!formData.email.includes('@')) {
      newErrors.email = 'L\'adresse mail est invalide';
    }
    if (formData.organization.length < 2) {
      newErrors.organization = 'Le nom de l\'organisation doit contenir au moins 2 caractères';
    }
    if (formData.mobile.length < 10) {
      newErrors.mobile = 'Le numéro de téléphone doit contenir au moins 8 chiffres';
    }
    if (formData.password.length < 6) {
      newErrors.password = 'Le password doit contenir au moins 6 chiffres'; 
    }
    if (!formData.compte || formData.compte === 'default') {
      newErrors.compte = 'Veuillez sélectionner un type de compte';
    }
    // Valider le champ domaine uniquement si le compte est "fournisseur"
    if (formData.compte === 'fournisseur' && formData.domaine.length < 2) {
      newErrors.domaine = 'Le domaine d\'activité doit contenir au moins 2 caractères';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    console.log('Form data:', formData); // Log the form data
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      setErrorMessage('');
      try {
        const payload = {
          ...formData,
          mobile: Number(formData.mobile) // Assurez-vous que mobile est un nombre
        };
        const response = await fetch('http://77.37.54.205:8080/api/user/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
        if (!response.ok) {
          throw new Error('Failed to sign up');
        }
        const data = await response.json();
        console.log('Form submitted', data);
        toast.success('Inscription réussie !');
        navigate('/login'); // Redirige vers la page de connexion
      } catch (error) {
        console.error('Error submitting form', error);
        setErrorMessage('Une erreur est survenue lors de l\'inscription. Veuillez réessayer.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 h-full z-30">
        <div className="h-screen bg-gray-200"></div>
        <div className="h-screen">
          <div className="sm:w-2/4 w-3/4 h-screen flex flex-col item-center justify-center mx-auto mt-26">
            <h1 className='text-3xl font-medium font-montserrat text-tertiarry text-center mb-4 mt-16'>
                <Skeleton width={350} height={20} />
            </h1>
            <form className='flex flex-col gap-8'>
              <div className="flex flex-col justify-start align-start">
                <Skeleton height={12} width={90} />
                <Skeleton height={40} />
              </div>
              <div className="flex flex-col justify-start align-start">
                <Skeleton height={12} width={90} />
                <Skeleton height={40} />
              </div>
              <div className="flex flex-col justify-start align-start">
                <Skeleton height={12} width={90} />
                <Skeleton height={40} />
              </div>
              <div className="flex flex-col justify-start align-start">
                <Skeleton height={12} width={90} />
                <Skeleton height={40} />
              </div>
              <div className="flex flex-col justify-start align-start">
                <Skeleton height={12} width={90} />
                <Skeleton height={40} />
              </div>
              <div className="flex flex-col justify-start align-start">
                <Skeleton height={12} width={90} />
                <Skeleton height={40} />
              </div>
              <div className="flex flex-col justify-start align-start">
                <Skeleton height={12} width={90} />
                <Skeleton height={40} />
              </div>    
              <div className="mt-4 mb-50">
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
// ceci est le rendu de la page d'inscription
    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 mt-8 ">
                <div className="bg-[url(src/assets/agriasso.jpg)] bg-cover bg-no-repeat"></div>
                <div className="">
                    <div className="sm:w-2/4 w-3/4 h-screen flex flex-col item-center justify-center mx-auto mt-26 mb-10">
                        <h1 className='text-3xl font-medium font-montserrat text-tertiarry text-center'>Inscription Page</h1>
                        <form action="" onSubmit={handleSubmit} className='flex flex-col gap-8 mt-4'>
                            {errorMessage && <p className="text-red-500 text-xs mt-1">{errorMessage}</p>}
                            <div className="flex flex-col justify-start align-start">
                                <label htmlFor="name" className="block text-sm font-semibold text-tertiary font-montserrat">Nom <span className="text-red-500 font-semibold">*</span></label>
                                {isSubmitting ? 
                                    (<Skeleton height={40} /> )
                                    :  (
                                        <input 
                                            type="text" 
                                            name="name"
                                            id="name" 
                                            placeholder='Agro' 
                                            value={formData.name}
                                            onChange={handleChange}
                                            className={`mt-1 p-2 sm:p-3 focus:ring-indigo-500 focus:border-primary block w-full shadow-sm sm:text-sm border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                        />
                                    )
                                }
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>
                            <div className="flex flex-col justify-start align-start">
                                <label htmlFor="lastName" className="block text-sm font-semibold text-tertiary font-montserrat">Prénom <span className="text-red-500 font-semibold">*</span></label>
                                {isSubmitting ?
                                    (<Skeleton height={40} /> )
                                    : (
                                        <input 
                                        type="text" 
                                        name="lastName"
                                        id="lastName" 
                                        placeholder='shop' 
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className={`mt-1 p-2 sm:p-3 focus:ring-indigo-500 focus:border-primary block w-full shadow-sm sm:text-sm border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                    />
                                    )
                                }
                                {errors.laastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                            </div>
                            <div className="flex flex-col justify-start align-start">
                                <label htmlFor="email" className="block text-sm font-semibold text-tertiary font-montserrat">Adresse mail <span className="text-red-500">*</span></label>
                                {isSubmitting ?
                                    (<Skeleton height={40} /> )
                                    : (
                                        <input 
                                            type="email" 
                                            name="email" 
                                            id="email" 
                                            placeholder='Adedev@gmail.com'
                                            value={formData.email}
                                            onChange={handleChange} 
                                            className={`mt-1 p-2 sm:p-3 focus:ring-indigo-500 focus:border-primary block w-full shadow-sm sm:text-sm border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                        />
                                    )
                                }
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>
                            <div className="flex flex-col justify-start align-start">
                              <label htmlFor='password' className="block text-sm font-semibold text-tertiary font-montserrat">Password</label>
                              {isSubmitting ?
                                  (<Skeleton height={40} /> )
                                  : (
                                      <input 
                                          type="password" 
                                          name="password" 
                                          id="password" 
                                          value={formData.password}
                                          onChange={handleChange}
                                          placeholder='*********'
                                          className={`mt-1 p-2 sm:p-3 focus:ring-indigo-500 focus:border-primary block w-full shadow-sm sm:text-sm border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                      />
                                  )
                              }
                              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                            </div>
                            <div className="flex flex-col justify-start align-start">
                                <label htmlFor="organization" className="block text-sm font-semibold text-tertiary font-montserrat">Nom de votre organisation <span className="text-red-500 font-semibold">*</span></label>
                                {isSubmitting ?
                                    (<Skeleton height={40} /> )
                                    : (
                                        <input 
                                            type="text" 
                                            name="organization" 
                                            id="organization" 
                                            placeholder='Agroshop'
                                            value={formData.organization}
                                            onChange={handleChange}
                                            className={`mt-1 p-2 sm:p-3 focus:ring-indigo-500 focus:border-primary block w-full shadow-sm sm:text-sm border ${errors.organization ? 'border-red-500' : 'border-gray-300'} rounded-md`} 
                                        />
                                    )
                                }
                                {errors.organization && <p className="text-red-500 text-xs mt-1">{errors.organization}</p>}
                            </div>
                            <div className="flex flex-col justify-start align-start">
                                <label htmlFor="mobile" className="block text-sm font-semibold text-tertiary font-montserrat">Numéro de téléphone <span className="text-red-500 font-semibold">*</span></label>
                                {isSubmitting ?
                                    (<Skeleton height={40} /> )
                                    : (
                                        <input 
                                            type="tel" 
                                            name="mobile" 
                                            id="mobile" 
                                            placeholder='97 00 00 00'
                                            value={formData.mobile}
                                            onChange={handleChange}
                                            className={`mt-1 p-2 sm:p-3 focus:ring-indigo-500 focus:border-primary block w-full shadow-sm sm:text-sm border ${errors.mobile ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                        />
                                    )
                                }
                                {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
                            </div>
                            <div className="">
                                <label htmlFor="compte" className="block text-sm font-semibold text-tertiary font-montserrat">Type de compte <span className="text-red-500 font-semibold">*</span></label>
                                {isSubmitting ?
                                    (<Skeleton height={40} /> )
                                    : (
                                        <select 
                                            name="compte" 
                                            id="compte" 
                                            value={formData.compte}
                                            onChange={handleChange}
                                            className={`mt-1 p-2 sm:p-3 focus:ring-indigo-500 focus:border-primary block w-full shadow-sm sm:text-sm border ${errors.compte ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                        >
                                            <option value="default">-- Sélectionnez un type de compte --</option>
                                            <option value='client'>Client</option>
                                            <option value='fournisseur'>Fournisseur</option>
                                      </select>
                                    )
                                }
                                {errors.compte && <p className="text-red-500 text-xs mt-1">{errors.compte}</p>}
                            </div>
                            { formData.compte === 'fournisseur' && (
                              <div className="">
                                  <label htmlFor="domaine" className="block text-sm font-semibold text-tertiary font-montserrat">Domaine d'activite</label>
                                  {isSubmitting ?
                                      (<Skeleton height={40} /> )
                                      : (
                                          <select 
                                              name="domaine" 
                                              id="domaine" 
                                              value={formData.domaine}
                                              required={false}
                                              onChange={handleChange}
                                              className={`mt-1 p-2 sm:p-3 focus:ring-indigo-500 focus:border-primary block w-full shadow-sm sm:text-sm border ${errors.domaine ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                          >
                                              <option value="default">-- Sélectionnez un domaine --</option>
                                              <option value="agriculteur">Agriculteur</option>
                                              <option value="commercant">Commercant</option>
                                              <option value="distributeur">Distributeur</option>
                                              <option value="autre">Autre</option>
                                      </select>
                                      )
                                  }
                                  {errors.domaine && <p className="text-red-500 text-xs mt-1">{errors.domaine}</p>}
                              </div>
                            )
                            }
                            <div className="">
                                <button
                                    className='bg-primary cursor-pointer mt-6 text-white p-2 sm:p-3 sm:text-xl text-center rounded-md font-montserrat font-semibold font-montserrat w-full'
                                    type='submit'
                                    onClick={handleSubmit}
                                >
                                    {isSubmitting ? 'En cours...' : 'Inscription'}
                                </button>
                                <p className='text-center text-tertiary text-lg font-montserrat font-semibold mt-4'>
                                    Vous avez déjà un compte ? 
                                    <Link to="/login" className='text-primary text-lg font-montserrat font-semibold'>Connectez-vous</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>  
    )
}

export default Signup