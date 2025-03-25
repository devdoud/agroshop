import React, { useState, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Link } from 'react-router-dom';
// import 'flag-icons-css/css/flag-icon.min.css';

const Signup = () => {
// ici on peut mettre les variables qui seront utilisées dans la page d'inscription
const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    organisation: '',
    email: '',
    phone: '',
    compte: '',
    domaine: ''
  });
  
const [errors, setErrors] = useState({});
const [isSubmitting, setIsSubmitting] = useState(false);
const [isLoading, setIsLoading] = useState(true);
const [errorMessage, setErrorMessage] = useState('');

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
      [name]: value
    });
  };
  
  const handlePhoneChange = (value) => {
    setFormData({
      ...formData,
      phone: value
    });
  };

  const validate = () => {
    const newErrors = {};
    if (formData.nom.length < 2) {
      newErrors.nom = 'Le nom doit contenir au moins 2 caractères';
    }
    if (formData.prenom.length < 2) {
      newErrors.prenom = 'Le prénom doit contenir au moins 2 caractères';
    }
    if (!formData.email.includes('@')) {
      newErrors.email = 'L\'adresse mail est invalide';
    }
    if (formData.phone.length < 10) {
      newErrors.phone = 'Le numéro de téléphone doit contenir au moins 10 chiffres';
    }
    if (formData.organisation.length < 2) {
      newErrors.organisation = 'Le nom de l\'organisation doit contenir au moins 2 caractères';
    }
    if (formData.domaine.length < 2) {
      newErrors.domaine = 'Le domaine d\'activité doit contenir au moins 2 caractères';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      setErrorMessage('');
      try {
        const response = await fetch('https://api.example.com/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        if (!response.ok) {
          throw new Error('Failed to sign up');
        }
        const data = await response.json();
        console.log('Form submitted', data);
        history.push('/login');
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
      <div className="grid grid-cols-1 sm:grid-cols-2 h-full">
        <div className="h-screen bg-gray-200"></div>
        <div className="h-screen">
          <div className="sm:w-2/4 w-3/4 h-screen flex flex-col align-center justify-center mx-auto">
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
// ceci est le rendu de la page d'inscription
    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 mt-8 ">
                <div className="bg-[url(src/assets/agriasso.jpg)] bg-cover bg-no-repeat"></div>
                <div className="">
                    <div className="sm:w-2/4 w-3/4 h-screen flex flex-col item-center justify-center mx-auto my-auto">
                        <h1 className='text-3xl font-medium font-montserrat text-tertiarry text-center'>Inscription Page</h1>
                        <form action="" onSubmit={handleSubmit} className='flex flex-col gap-8 mt-4'>
                            {errorMessage && <p className="text-red-500 text-xs mt-1">{errorMessage}</p>}
                            <div className="flex flex-col justify-start align-start">
                                <label htmlFor="nom" className="block text-sm font-semibold text-tertiary font-montserrat">Nom <span className="text-red-500 font-semibold">*</span></label>
                                {isSubmitting ? 
                                    (<Skeleton height={40} /> )
                                    :  (
                                        <input 
                                            type="text" 
                                            name="nom" 
                                            id="nom" 
                                            placeholder='Agro' 
                                            value={formData.nom}
                                            onChange={handleChange}
                                            className={`mt-1 p-2 sm:p-3 focus:ring-indigo-500 focus:border-primary block w-full shadow-sm sm:text-sm border ${errors.nom ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                        />
                                    )
                                }
                                {errors.nom && <p className="text-red-500 text-xs mt-1">{errors.nom}</p>}
                            </div>
                            <div className="flex flex-col justify-start align-start">
                                <label htmlFor="prenom" className="block text-sm font-semibold text-tertiary font-montserrat">Prénom <span className="text-red-500 font-semibold">*</span></label>
                                {isSubmitting ?
                                    (<Skeleton height={40} /> )
                                    : (
                                        <input 
                                        type="text" 
                                        name="prenom" 
                                        id="prenom" 
                                        placeholder='shop' 
                                        value={formData.prenom}
                                        onChange={handleChange}
                                        className={`mt-1 p-2 sm:p-3 focus:ring-indigo-500 focus:border-primary block w-full shadow-sm sm:text-sm border ${errors.prenom ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                    />
                                    )
                                }
                                {errors.prenom && <p className="text-red-500 text-xs mt-1">{errors.prenom}</p>}
                            </div>
                            <div className="flex flex-col justify-start align-start">
                                <label htmlFor="organisation" className="block text-sm font-semibold text-tertiary font-montserrat">Nom de votre organisation <span className="text-red-500 font-semibold">*</span></label>
                                {isSubmitting ?
                                    (<Skeleton height={40} /> )
                                    : (
                                        <input 
                                            type="text" 
                                            name="organisation" 
                                            id="organisation" 
                                            placeholder='Agroshop'
                                            value={formData.organisation}
                                            onChange={handleChange}
                                            className={`mt-1 p-2 sm:p-3 focus:ring-indigo-500 focus:border-primary block w-full shadow-sm sm:text-sm border ${errors.organisation ? 'border-red-500' : 'border-gray-300'} rounded-md`} 
                                        />
                                    )
                                }
                                {errors.organisation && <p className="text-red-500 text-xs mt-1">{errors.organisation}</p>}
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
                            <div className="">
                                <label htmlFor="phone" className="block text-sm font-semibold text-tertiary font-montserrat">Telephone <span className="text-red-500">*</span></label>
                                <div className="flex flex-col">
                                    <div className="flex align-center justify-center mt-1">
                                    {
                                        isSubmitting ? (<Skeleton height={40} width={250} />)
                                        : (
                                            <PhoneInput
                                            country={'bj'}
                                            value={formData.phone}
                                            onChange={handlePhoneChange}
                                            inputProps={{
                                            name: 'phone',
                                            required: true,
                                            autoFocus: true,
                                            className: `sm:h-12 h-10 sm:pl-12 focus:ring-indigo-500 focus:border-primary block w-full shadow-sm sm:text-sm border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md`
                                            }}
                                        />
                                        )
                                    }
                                </div>
                                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                            </div>
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
                                            <option value="coorperative">Client</option>
                                            <option value="industrie">Fournisseur</option>
                                    </select>
                                    )
                                }
                                {errors.compte && <p className="text-red-500 text-xs mt-1">{errors.compte}</p>}
                            </div>
                            <div className="">
                                <label htmlFor="domaine" className="block text-sm font-semibold text-tertiary font-montserrat">Domaine d'activite <span className="text-red-500 font'semibold">*</span></label>
                                {isSubmitting ?
                                    (<Skeleton height={40} /> )
                                    : (
                                        <input 
                                            type="text" 
                                            value={formData.domaine}
                                            onChange={handleChange}
                                            name="domaine"
                                            id="domaine"
                                            placeholder='Agriculture'
                                            className={`mt-1 p-2 sm:p-3 focus:ring-indigo-500 focus:border-primary block w-full shadow-sm sm:text-sm border ${errors.domaine ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                        />
                                    )
                                }
                                {errors.domaine && <p className="text-red-500 text-xs mt-1">{errors.domaine}</p>}
                            </div>
                            <div className="">
                                <button
                                    className='bg-primary mt-6 text-white p-2 sm:p-3 sm:text-xl text-center rounded-md font-montserrat font-semibold font-montserrat w-full'
                                    type='submit'
                                    disabled={isSubmitting}
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