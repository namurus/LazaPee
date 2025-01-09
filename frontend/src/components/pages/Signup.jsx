import { useState } from 'react';
import { signupBanner } from '../../assets';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../api/user/auth'; // Import the signup function

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault();
    setError(null);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;
    if (!emailRegex || !emailRegex.test(email)) {
      setError('Please enter a valid email.');
      return;
    }

    setStep(2);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await signup({
        email: email,
        username: username,
        phone: phoneNumber,
        password: password,
        fullName: fullName,
      });

      if (response) {
        setMessage(`Welcome! Your account has been created.`);
      } else {
        setError('Signup failed');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  // const handleFetchUserData = async () => {
  //   if (!accessToken) {
  //     setError('No access token available. Please sign up first.');
  //     return;
  //   }

  //   try {
  //     const response = await fetch('https://dummyjson.com/auth/me', {
  //       method: 'GET',
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //       credentials: 'include',
  //     });

  //     if (response.ok) {
  //       const userData = await response.json();
  //       console.log('User data:', userData);
  //       setMessage(
  //         'User data fetched successfully. Check console for details.'
  //       );
  //     } else {
  //       const errorData = await response.json();
  //       setError(errorData.message || 'Failed to fetch user data');
  //     }
  //   } catch {
  //     setError('An unexpected error occurred while fetching user data.');
  //   }
  // };

  const handleLoginRedirect = () => {
    navigate('../login');
  };

  return (
    <div className='flex min-h-screen flex-col lg:flex-row'>
      <div className='flex w-full flex-col items-center justify-center bg-white p-4 lg:w-1/2 lg:p-10'>
        <h1 className='mb-2 text-3xl font-semibold lg:text-4xl'>SIGN UP</h1>
        <p className='mb-8 text-gray-500'>Create a new account.</p>

        <form
          className='w-full lg:w-3/4'
          onSubmit={step === 1 ? handleNext : handleSignup}
        >
          {step === 1 && (
            <div className='mb-4'>
              <label className='mb-2 block text-gray-700'>Email</label>
              <input
                type='email'
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full rounded-lg border px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500'
              />
              <button
                type='submit'
                className='mt-4 w-full rounded-lg bg-red-500 py-2 text-white shadow-md hover:bg-red-600'
              >
                Next
              </button>
              <button className='mt-4 flex w-full items-center justify-center rounded-lg border py-2 shadow-md hover:bg-gray-100'>
                <img
                  src='/google_logo.png'
                  alt='Google logo'
                  className='mr-2 h-6 w-6'
                />
                Sign up with Google
              </button>
            </div>
          )}

          {step === 2 && (
            <>
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
                <label className='mb-2 block text-gray-700'>Fullname</label>
                <input
                  type='text'
                  placeholder='Enter your fullname'
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className='w-full rounded-lg border px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500'
                />
              </div>
              <div className='mb-4'>
                <label className='mb-2 block text-gray-700'>Phone Number</label>
                <input
                  type='text'
                  placeholder='Enter your phone number'
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
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
              <div className='mb-4'>
                <label className='mb-2 block text-gray-700'>
                  Confirm Password
                </label>
                <input
                  type='password'
                  placeholder='Confirm your password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className='w-full rounded-lg border px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500'
                />
              </div>
              <button
                type='submit'
                className='mb-4 w-full rounded-lg bg-red-500 py-2 text-white shadow-md hover:bg-red-600'
              >
                Sign up
              </button>
            </>
          )}
        </form>

        {error && <p className='mt-4 text-red-500'>{error}</p>}
        {message && <p className='mt-4 text-green-500'>{message}</p>}
        <p className='mt-4 text-gray-700'>
          Already have an account?{' '}
          <button onClick={handleLoginRedirect} className='text-red-500'>
            Sign in here!
          </button>
        </p>
      </div>

      <div className='flex w-full items-center justify-center bg-gray-100 lg:w-1/2'>
        <img
          src={signupBanner}
          alt='Signup Banner'
          className='h-full w-full object-cover'
        />
      </div>
    </div>
  );
};

export default Signup;
