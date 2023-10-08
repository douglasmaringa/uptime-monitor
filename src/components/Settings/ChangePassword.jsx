import React, { useState } from 'react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_SERVER_URL;

function ChangePassword() {
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to request a password reset code
      const response = await axios.post(`${apiUrl}/api/user/reset-password/request`, {
        email: email,
      });

      if (response.status === 200) {
        // Password reset code sent successfully
        setSuccessMessage('Password reset code sent successfully.');
        setIsCodeSent(true); // Set this to true to show the second form
        
      } else {
        setErrorMessage('Invalid email.');
      }
    } catch (error) {
      // Handle errors here
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to confirm password reset with email, code, and new password 
      
      const response = await axios.post(`${apiUrl}/api/user/reset-password/confirm`, {
        email: email,
        resetCode: parseInt(resetCode),
        newPassword: newPassword,
      });

      if (response.status === 200) {
        // Password reset successful
        setSuccessMessage('Password reset successful.');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
    
        window.location.href = '/login';

      } else if (response.status === 400) {
        setErrorMessage('Invalid reset code.');
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
        <form onSubmit={handleSubmit} className="tw-mb-6">
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
          <button type="submit" className="tw-w-full tw-text-lg tw-bg-green-500 tw-hover:tw-bg-green-600 tw-text-white tw-font-semibold tw-py-2 tw-px-4 tw-rounded">
            Request Password Reset Code
          </button>
        </form>
      ) : (
        <form onSubmit={handleResetPassword}>
          <div className="tw-mb-4">
            <label className="tw-block tw-text-gray-700 tw-text-lg">Reset Code:</label>
            <input
              type="text"
              value={resetCode}
              onChange={(e) => setResetCode(e.target.value)}
              required
              className="tw-w-full tw-border tw-border-gray-300 tw-rounded-md tw-py-2 tw-px-3 tw-text-lg tw-focus:tw-outline-none tw-focus:tw-border-blue-400"
              placeholder="Enter the reset code"
            />
          </div>
          <div className="tw-mb-4">
            <label className="tw-block tw-text-gray-700 tw-text-lg">New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="tw-w-full tw-border tw-border-gray-300 tw-rounded-md tw-py-2 tw-px-3 tw-text-lg tw-focus:tw-outline-none tw-focus:tw-border-blue-400"
              placeholder="Enter your new password"
            />
          </div>
          <button type="submit" className="tw-w-full tw-text-lg tw-bg-green-500 tw-hover:tw-bg-green-600 tw-text-white tw-font-semibold tw-py-2 tw-px-4 tw-rounded">
            Reset Password
          </button>
        </form>
      )}
    </div>
  );
}

export default ChangePassword;
