import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

const ForgotPasswordOtpVerification = () => {
  const location = useLocation(); // Récupérer l'état transmis par navigate
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState(location.state?.email || ''); // Récupérer l'email ou définir une valeur par défaut
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('api.fermierconnect.com:8080/api/user/verify-forgot-password-otp', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      if (!response.ok) {
        throw new Error('Failed to verify OTP');
      }

      const data = await response.json();
      console.log('OTP verification successful:', data);

      toast.success('OTP vérifié avec succès !');
      navigate('/resetpassword', { state: { email } }); // Rediriger vers la page de réinitialisation du mot de passe
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast.error('Une erreur est survenue lors de la vérification de l\'OTP. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold font-montserrat text-tertiary text-center">Vérification OTP</h1>
      <form onSubmit={handleOtpVerification} className="flex flex-col  gap-8 mt-10 w-2/5 mx-auto">
        <input
          type="email"
          placeholder="Entrez votre adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-2 border rounded-md text-tertiary font-semibold font-montserrat focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input
          type="text"
          placeholder="Entrez votre OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          className="p-2 border rounded-md text-gray-700 font-montserrat focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          onClick={handleOtpVerification}
          className="bg-primary text-white p-2 rounded-md w-1/3 mx-auto font-montserrat font-semibold shadow-md"
        >
          {isSubmitting ? 'Vérification en cours...' : 'Vérifier'}
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordOtpVerification;