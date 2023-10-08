import React, { useState } from 'react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_SERVER_URL;

function DeleteAccount() {
  const [email, setEmail] = useState('');
  const [deletionCode, setDeletionCode] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);

  const handleRequestDeletionCode = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to request account deletion code
      const response = await axios.post(`${apiUrl}/api/user/delete-account/request`, {
        email: email,
      });

      if (response.status === 200) {
        // Deletion code sent successfully
        setSuccessMessage('Deletion code sent successfully.');
        setIsCodeSent(true); // Set this to true to show the second form
      } else if (response.status === 404) {
        setErrorMessage('User not found.');
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    } catch (error) {
      // Handle errors here
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  const handleConfirmAccountDeletion = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to confirm account deletion with email and code
      const response = await axios.post(`${apiUrl}/api/user/delete-account/confirm`, {
        email: email,
        deletionCode: deletionCode,
      });

      if (response.status === 200) {
        // Account deletion successful
        setSuccessMessage('Account deletion successful.');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
    
        window.location.href = '/login';
      } else if (response.status === 400) {
        setErrorMessage('Invalid deletion code.');
      } else if (response.status === 404) {
        setErrorMessage('User not found.');
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    } catch (error) {
      // Handle errors here
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div>
     
      {successMessage && <p className="tw-text-green-500 tw-text-lg tw-mb-4">{successMessage}</p>}
      {errorMessage && <p className="tw-text-red-500 tw-text-lg tw-mb-4">{errorMessage}</p>}
      {!isCodeSent ? (
        <form onSubmit={handleRequestDeletionCode} className="tw-mb-6">
          <div className="tw-mb-4">
            <label className="tw-block tw-text-gray-700 tw-text-lg">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="tw-w-full tw-border tw-border-gray-300 tw-rounded-md tw-py-2 tw-px-3 tw-text-lg tw-focus:tw-outline-none tw-focus:tw-border-blue-400"
              placeholder="Enter your email"
            />
          </div>
          <button type="submit" className="tw-text-lg tw-w-full tw-bg-red-500 tw-hover:tw-bg-red-600 tw-text-white tw-font-semibold tw-py-2 tw-px-4 tw-rounded">
            Request Account Deletion Code
          </button>
        </form>
      ) : (
        <form onSubmit={handleConfirmAccountDeletion}>
          <div className="tw-mb-4">
            <label className="tw-block tw-text-gray-700 tw-text-lg">Deletion Code:</label>
            <input
              type="text"
              value={deletionCode}
              onChange={(e) => setDeletionCode(e.target.value)}
              required
              className="tw-w-full tw-border tw-border-gray-300 tw-rounded-md tw-py-2 tw-px-3 tw-text-lg tw-focus:tw-outline-none tw-focus:tw-border-blue-400"
              placeholder="Enter the deletion code"
            />
          </div>
          <button type="submit" className="tw-text-lg tw-w-full tw-bg-red-500 tw-hover:tw-bg-red-600 tw-text-white tw-font-semibold tw-py-2 tw-px-4 tw-rounded">
            Confirm Account Deletion
          </button>
        </form>
      )}
    </div>
  );
}

export default DeleteAccount;
