import { useState } from 'react';
import { loginBanner } from '../../assets';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { login } from '../../contexts/auth/reducers';
import { getMe, login as loginAPI } from '../../api/user/auth';
import Image from '../atoms/Image';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const { dispatch, isAuthenticated } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    try {
      const response = await loginAPI({
        username: username,
        password: password,
      });
      console.log(response);
      if (response.code === 200) {
        // get user
        const getMeResponse = await getMe();
        if (!getMeResponse) {
          setError('Failed to fetch user data');
          return;
        }
        if (getMeResponse.code !== 200) {
          setError(getMeResponse.message || 'Failed to fetch user data');
          return;
        }
        dispatch(
          login({
            user: {
              ...getMeResponse.data,
              accessToken: response.token,
            },
          })
        );
        setMessage('Login successful');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed');
      }
    } catch {
      setError('An unexpected error occurred. Please try again later.');
    }
  };
  if (isAuthenticated) {
    <Navigate to='/' />;
  }
  return (
    <div className='flex min-h-screen flex-col lg:flex-row'>
      <div className='flex w-full flex-col items-center justify-center bg-white p-4 lg:w-1/2 lg:p-10'>
        <h1 className='mb-2 text-3xl font-semibold lg:text-4xl'>
          WELCOME BACK
        </h1>
        <p className='mb-8 text-gray-500'>
          Welcome back! Please enter your details.
        </p>
        <form className='w-full lg:w-3/4' onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='mb-2 block text-gray-700'>Username</label>
            <input
              type='text'
              placeholder='Enter your username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='w-full rounded-lg border px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500'
            />
          </div>
          <div className='mb-4'>
            <label className='mb-2 block text-gray-700'>Password</label>
            <input
              type='password'
              placeholder='*********'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full rounded-lg border px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500'
            />
          </div>
          <div className='mb-6 flex items-center justify-between'>
            <label className='flex items-center'>
              <input type='checkbox' className='form-checkbox' />
              <span className='ml-2 text-gray-700'>Remember me</span>
            </label>
            <a href='#' className='text-gray-700'>
              Forgot password
            </a>
          </div>
          <button
            type='submit'
            className='mb-4 w-full rounded-lg bg-red-500 py-2 text-white shadow-md hover:bg-red-600'
          >
            Sign in
          </button>
          <button className='flex w-full items-center justify-center rounded-lg border py-2 shadow-md hover:bg-gray-100'>
            <Image
              src='/google_logo.png'
              alt='Google logo'
              className='mr-2 h-6 w-6'
            />
            Sign in with Google
          </button>
        </form>
        {error && <p className='mt-4 text-red-500'>{error}</p>}
        {message && <p className='mt-4 text-green-500'>{message}</p>}
        <p className='mt-4 text-gray-700'>
          Don&apos;t have an account?{' '}
          <Link to='../signup' className='text-red-500'>
            Sign up for free!
          </Link>
        </p>
      </div>
      <div className='flex w-full items-center justify-center bg-gray-100 lg:w-1/2'>
        <Image
          src={loginBanner}
          alt='Son Tung M-TP'
          className='h-full w-full object-cover'
        />
      </div>
    </div>
  );
};

export default Login;