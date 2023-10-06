import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom'; 
import HeaderLoggedOut from '../../components/HeaderLoggedOut';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Loading from '../../components/Loading';
const apiUrl = import.meta.env.VITE_SERVER_URL;

function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [load, setLoad] = useState(false);

  const { email, password } = formData;

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
    // You can perform form submission logic here using formData
    try {
      const response = await axios.post(`${apiUrl}/api/user/register`, {
        email,
        password,
      });

      if (response.status === 201) {
        toast('User registered successfully');
        await delay(1000);
        navigate("/registerverify",{state:{email:email}})
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 409) {
          toast('Email already exists');
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
    return email.trim() !== '' && password.trim() !== '';
  };

  return (
    <div>
    <HeaderLoggedOut/>
    <ToastContainer autoClose={2000} />
    <div className='tw-bg-gray-100 tw-min-h-screen tw-flex tw-justify-center tw-items-center'>
      <div className='tw-w-full tw-max-w-lg tw-p-6 tw-space-y-6 tw-bg-white tw-rounded-lg tw-shadow-md'>
        <h2 className='tw-text-4xl tw-text-center tw-font-semibold tw-text-gray-800'>Register</h2>
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
              placeholder='Enter your email'
            />
          </div>
          <div className='tw-mb-4'>
            <label htmlFor='password' className='tw-block tw-text-gray-600 tw-font-semibold tw-text-xl tw-mb-2'>
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              value={password}
              onChange={handleInputChange}
              className=' tw-bg-gray-50 tw-border tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg tw-focus:ring-blue-500 tw-focus:border-blue-500 tw-block tw-w-full tw-p-2.5 tw-dark:bg-gray-700 tw-dark:border-gray-600 tw-dark:placeholder-gray-400 tw-dark:text-white tw-dark:focus:ring-blue-500 tw-dark:focus:border-blue-500'
              placeholder='Enter your password'
            />
          </div>
          <div className='tw-mb-6'>
            <button
              type='submit'
              disabled={isFormValid() ? false : true}
              className="tw-text-xl tw-w-full tw-px-4 tw-py-2 tw-bg-blue-600 tw-text-white tw-rounded tw-hover:bg-blue-700 tw-focus:tw-outline-none tw-focus:tw-bg-blue-700"
            >
              {load? <Loading/> :  "Register"}
            </button>
          </div>
        </form>
        <div className='tw-text-center'>
          <p className='tw-text-lg'>Already have an account? <Link className='tw-text-blue-500' to='/login'>Login</Link></p>
        </div>

        <div className='tw-text-center'>
        <p className='tw-text-lg'><Link className='tw-text-blue-500' to='/registerverify'>Verify</Link> an account?</p>
        </div>

        <div className='tw-text-center'>
          <p className='tw-text-lg'><Link className='tw-text-blue-500' to='/registerresend'>Resend</Link> Registration Code?</p>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Register;
