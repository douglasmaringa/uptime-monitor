import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom'; 
import HeaderLoggedOut from '../../components/HeaderLoggedOut';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Loading from '../../components/Loading';
const apiUrl = import.meta.env.VITE_SERVER_URL;

function Login() {
  const navigate = useNavigate()
  const [load, setLoad] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const {  email, password } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true)

    try {
      const response = await axios.post(`${apiUrl}/api/user/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        if(response.data.twoFactor == false){
        // User logged in successfully, you can handle the success scenario here
        console.log('User logged in successfully');
        localStorage.setItem('token', response?.data?.token);
        localStorage.setItem('userId', response?.data?.userId);
        //navigate("/")
        window.location.href = "/"
        // You might want to navigate to another page or update the UI accordingly
        }else{
          try {
             await axios.post(`${apiUrl}/api/user/login2fa/code`, {email});
             navigate("/loginverify",{state:{email:email,password:password}})
            }catch(error){
              toast("failed to send 2fa code")
              console.log(error)
            }
        }
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          // Invalid email or password, handle accordingly
          toast('Invalid email or password');
        } else if (error.response.status === 429) {
          // Account locked due to too many failed attempts, handle accordingly
          toast('Account locked due to too many failed attempts');
        } else {
          // An internal server error occurred, handle accordingly
          toast('An internal server error occurred');
        }
      } else {
        // Network error, handle accordingly
        toast('Network error. Please try again.');
      }
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
        <h2 className='tw-text-4xl tw-text-center tw-font-semibold tw-text-gray-800'>Login</h2>
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
              className='tw-text-xl tw-w-full tw-px-4 tw-py-2 tw-bg-blue-600 tw-text-white tw-rounded tw-hover:bg-blue-700 tw-focus:tw-outline-none tw-focus:tw-bg-blue-700'
            >
              {load? <Loading/> :  "Login"}
            </button>
          </div>
        </form>
        <div className='tw-text-center'>
          <p className='tw-text-lg'>Dont have an account? <Link className='tw-text-blue-500' to='/register'> Register</Link></p>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Login;
