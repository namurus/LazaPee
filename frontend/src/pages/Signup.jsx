import { useState } from 'react';
import { googleLogo, signupBanner } from '../assets';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault();
    setError(null);
    
    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;
    if (!emailRegex || !emailRegex.test(email)) {
      setError("Please enter a valid email.");
      return;
    }

    setStep(2);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch('https://dummyjson.com/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          username: username,
          phoneNumber: phoneNumber,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`Welcome! Your account has been created.`);
        setAccessToken(data.accessToken);
        await handleFetchUserData();
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Signup failed');
        console.log(errorData);
      }
    } catch {
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  const handleFetchUserData = async () => {
    if (!accessToken) {
      setError("No access token available. Please sign up first.");
      return;
    }

    try {
      const response = await fetch('https://dummyjson.com/auth/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        credentials: 'include',
      });

      if (response.ok) {
        const userData = await response.json();
        console.log("User data:", userData);
        setMessage("User data fetched successfully. Check console for details.");
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to fetch user data');
      }
    } catch {
      setError('An unexpected error occurred while fetching user data.');
    }
  };

  const handleLoginRedirect = () => {
    navigate('../login');
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-white p-4 lg:p-10">
        <h1 className="text-3xl lg:text-4xl font-semibold mb-2">SIGN UP</h1>
        <p className="text-gray-500 mb-8">Create a new account.</p>

        <form className="w-full lg:w-3/4" onSubmit={step === 1 ? handleNext : handleSignup}>
          {step === 1 && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                type="submit"
                className="w-full bg-red-500 text-white py-2 rounded-lg shadow-md hover:bg-red-600 mt-4"
              >
                Next
              </button>
              <button className="w-full flex items-center justify-center border py-2 rounded-lg shadow-md hover:bg-gray-100 mt-4">
                <img src={googleLogo} alt="Google logo" className="mr-2 h-6 w-6" />
                Sign up with Google
              </button>
            </div>
          )}

          {step === 2 && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Phone Number</label>
                <input
                  type="text"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-red-500 text-white py-2 rounded-lg shadow-md hover:bg-red-600 mb-4"
              >
                Sign up
              </button>
            </>
          )}
        </form>

        {error && <p className="text-red-500 mt-4">{error}</p>}
        {message && <p className="text-green-500 mt-4">{message}</p>}
        <p className="mt-4 text-gray-700">
          Already have an account?{' '}
          <button onClick={handleLoginRedirect} className="text-red-500">
            Sign in here!
          </button>
        </p>
      </div>

      <div className="w-full lg:w-1/2 bg-gray-100 flex justify-center items-center">
        <img
          src={signupBanner}
          alt="Signup Banner"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Signup;
