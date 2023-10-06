import { useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom'; 
import HeaderLoggedOut from '../../components/HeaderLoggedOut';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Loading from '../../components/Loading';
const apiUrl = import.meta.env.VITE_SERVER_URL;

function RegisterVerify() {
  const navigate = useNavigate()
   const location = useLocation();
  const [load, setLoad] = useState(false);
  const [formData, setFormData] = useState({
    email: location?.state?.email || '',
    verificationCode: '',
  });

  const { email, verificationCode } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true)

    try {
      const codeAsNumber = parseInt(verificationCode);

      if (isNaN(codeAsNumber)) {
        toast('Verification code must be a number');
        return;
      }

      const response = await axios.post(`${apiUrl}/api/user/verify-email`, {
        email,
        verificationCode:parseInt(verificationCode),
      });

      if (response.status === 200) {
        toast('Email verified successfully');
        await delay(1000);
        navigate("/login")
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 400) {
          toast('Invalid verification code');
        } else if (err.response.status === 404) {
          toast('User not found');
        } else {
          toast('An internal server error occurred');
        }
      } else {
        toast('Network error. Please try again.');
      }
      console.log(err);
    }
    setLoad(false)
  };

  // Add a function to check if all fields are filled in
  const isFormValid = () => {
    return email.trim() !== '' && verificationCode.trim() !== '';
  };

  return (
    <div>
    <HeaderLoggedOut/>
    <ToastContainer autoClose={2000} />
    <div className='tw-bg-gray-100 tw-min-h-screen tw-flex tw-justify-center tw-items-center'>
      <div className='tw-w-full tw-max-w-lg tw-p-6 tw-space-y-6 tw-bg-white tw-rounded-lg tw-shadow-md'>
        <h2 className='tw-text-2xl tw-text-center tw-font-semibold tw-text-gray-800'>Verify Registration Code</h2>
        <form onSubmit={handleSubmit}>
        <div className='tw-mb-4'>
            <label htmlFor='email' className='tw-block tw-text-gray-600 tw-font-semibold tw-text-xl tw-mb-2'>
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={email}
              onChange={handleInputChange}
              className=' tw-bg-gray-50 tw-border tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg tw-focus:ring-blue-500 tw-focus:border-blue-500 tw-block tw-w-full tw-p-2.5 tw-dark:bg-gray-700 tw-dark:border-gray-600 tw-dark:placeholder-gray-400 tw-dark:text-white tw-dark:focus:ring-blue-500 tw-dark:focus:border-blue-500'
              placeholder='Enter email'
            />
          </div>
           
          <div className='tw-mb-4'>
            <label htmlFor='email' className='tw-block tw-text-gray-600 tw-font-semibold tw-text-xl tw-mb-2'>
              Code
            </label>
            <input
              type='text'
              id='verificationCode'
              name='verificationCode'
              value={verificationCode}
              onChange={handleInputChange}
              className=' tw-bg-gray-50 tw-border tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg tw-focus:ring-blue-500 tw-focus:border-blue-500 tw-block tw-w-full tw-p-2.5 tw-dark:bg-gray-700 tw-dark:border-gray-600 tw-dark:placeholder-gray-400 tw-dark:text-white tw-dark:focus:ring-blue-500 tw-dark:focus:border-blue-500'
              placeholder='Enter verification code'
            />
          </div>
          
          <div className='tw-mb-6'>
            <button
              type='submit'
              disabled={isFormValid() ? false : true}
              className='tw-text-xl tw-w-full tw-px-4 tw-py-2 tw-bg-blue-600 tw-text-white tw-rounded tw-hover:bg-blue-700 tw-focus:tw-outline-none tw-focus:tw-bg-blue-700'
            >
              {load? <Loading/> :  "Verify"}
            </button>
          </div>
        </form>
        
      </div>
    </div>
    </div>
  );
}

export default RegisterVerify;
