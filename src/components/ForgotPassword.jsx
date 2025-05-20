import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate pour la redirection

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate(); // Initialiser useNavigate

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('api.fermierconnect.com:8080/api/user/forgot-password', {
        method: 'PUT', // Méthode définie dans SummaryApi
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }), // Envoyer l'email dans le corps de la requête
      });

      if (!response.ok) {
        throw new Error('Failed to send forgot password request');
      }

      const data = await response.json();
      console.log('Forgot password response:', data);

      toast.success('Un email de réinitialisation a été envoyé !');

      // Rediriger vers la page de vérification OTP avec l'email
      navigate('/forgotpasswordotp', { state: { email } });
    } catch (error) {
      console.error('Error in forgot password:', error);
      toast.error('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold font-montserrat text-tertiary text-center">Mot de passe oublié</h1>
      <form onSubmit={handleForgotPassword} className="flex flex-col  gap-10 mt-10 w-2/5 mx-auto">
        <input
          type="email"
          placeholder="Entrez votre adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-2 border rounded-md text-tertiary font-semibold font-montserrat focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary text-white p-2 rounded-md w-1/3 mx-auto font-montserrat font-semibold shadow-md"
        >
          {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;