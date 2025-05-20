import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
//   const location = useLocation(); // Récupérer l'état transmis par navigate
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
//   const [email, setEmail] = useState(location.state?.email || ''); // Récupérer l'email transmis
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.fermierconnect.com/api/user/reset-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify({ email, password }),
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        throw new Error('Failed to reset password');
      }

      const data = await response.json();
      console.log('Password reset successful:', data);

      toast.success('Mot de passe réinitialisé avec succès !');
      navigate('/login'); // Rediriger vers la page de connexion
    } catch (error) {
      console.error('Error resetting password:', error);
      toast.error('Une erreur est survenue lors de la réinitialisation du mot de passe.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold font-montserrat text-tertiary text-center">Réinitialisation du mot de passe</h1>
      <form onSubmit={handleResetPassword} className="flex flex-col  gap-8 mt-10 w-2/5 mx-auto">
        <input
          type="password"
          placeholder="Entrez votre nouveau mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-2 border rounded-md text-gray-500 font-semibold font-montserrat focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input
          type="password"
          placeholder="Confirmez votre nouveau mot de passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="p-2 border rounded-md text-gray-500 font-semibold font-montserrat focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          onClick={handleResetPassword}
          className="bg-primary text-white p-2 rounded-md w-2/5 mx-auto font-montserrat font-semibold shadow-md"
        >
          {isSubmitting ? 'Réinitialisation en cours...' : 'Réinitialiser'}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;