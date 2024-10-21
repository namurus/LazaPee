import { useState } from 'react';
import { googleLogo, signupBanner } from '../assets';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch('https://dummyjson.com/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          username: username,
          email: email,
          password: password,
        }),
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`Welcome ${data.firstName} ${data.lastName}!`);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Signup failed');
      }
    } catch {
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-white p-4 lg:p-10">
        <h1 className="text-3xl lg:text-4xl font-semibold mb-2">SIGN UP</h1>
        <p className="text-gray-500 mb-8">Create a new account.</p>
        <form className="w-full lg:w-3/4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">First Name</label>
            <input
              type="text"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Last Name</label>
            <input
              type="text"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
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
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              placeholder="*********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="*********"
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
          <button className="w-full flex items-center justify-center border py-2 rounded-lg shadow-md hover:bg-gray-100">
            <img src={googleLogo} alt="Google logo" className="mr-2 h-6 w-6" />
            Sign up with Google
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {message && <p className="text-green-500 mt-4">{message}</p>}
        <p className="mt-4 text-gray-700">
          Already have an account?{' '}
          <a href="#" className="text-red-500">
            Log in here!
          </a>
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
