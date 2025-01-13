import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { post } from '../../api/config';
import Image from '../atoms/Image';
import { loginBanner } from '../../assets';
import { Link } from 'react-router-dom';

const AdminRegister = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    try {
      const response = await post('admin/auth/register', {
        username: username,
        password: password,
        fullName: fullName,
      });
      console.log(response);

      if (response) {
        setMessage(`Welcome! Your account has been created.`);
      } else {
        setError('Signup failed');
      }
    } catch (error) {
      console.log('Error in signup:', error);
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className='flex min-h-screen flex-col lg:flex-row'>
      <div className='flex w-full flex-col items-center justify-center bg-white p-4 lg:w-1/2 lg:p-10'>
        <h1 className='mb-2 text-3xl font-semibold lg:text-4xl'>
          ADMIN REGISTER
        </h1>
        <p className='mb-8 text-gray-500'>
          Welcome! Please enter your details.
        </p>
        <form className='w-full lg:w-3/4' onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='mb-2 block text-gray-700'>Full Name</label>
            <input
              type='text'
              placeholder='Enter your full name'
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className='w-full rounded-lg border px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500'
            />
          </div>
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
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full rounded-lg border px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500'
            />
          </div>
          {error && <p className='mt-4 text-red-500'>{error}</p>}
          {message && <p className='mt-4 text-green-500'>{message}</p>}
          <button
            type='submit'
            className='mb-4 w-full rounded-lg bg-red-500 py-2 text-white shadow-md hover:bg-red-600'
          >
            Register
          </button>
        </form>
        <p className='mt-4 text-gray-700'>
          Already have an account?{' '}
          <Link to='../login' className='text-red-500'>
            Login here.
          </Link>
        </p>
      </div>
      <div className='flex w-full items-center justify-center bg-gray-100 lg:w-1/2'>
        <Image
          src={loginBanner} // Thay đổi với ảnh banner admin
          alt='Admin Banner'
          className='h-full w-full object-cover'
        />
      </div>
    </div>
  );
};

export default AdminRegister;