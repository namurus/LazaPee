import { useState } from 'react';
import { googleLogo, loginBanner } from '../assets';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password,
          expiresInMins: 30,
        }),
        credentials: 'same-origin',
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage(`Welcome ${data.firstName} ${data.lastName}!`);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-white p-4 lg:p-10">
        <h1 className="text-3xl lg:text-4xl font-semibold mb-2">WELCOME BACK</h1>
        <p className="text-gray-500 mb-8">Welcome back! Please enter your details.</p>
        <form className="w-full lg:w-3/4" onSubmit={handleSubmit}>
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
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              placeholder="*********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2 text-gray-700">Remember me</span>
            </label>
            <a href="#" className="text-gray-700">
              Forgot password
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded-lg shadow-md hover:bg-red-600 mb-4"
          >
            Sign in
          </button>
          <button className="w-full flex items-center justify-center border py-2 rounded-lg shadow-md hover:bg-gray-100">
            <img src={googleLogo} alt="Google logo" className="mr-2 h-6 w-6" />
            Sign in with Google
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {message && <p className="text-green-500 mt-4">{message}</p>}
        <p className="mt-4 text-gray-700">
          Don&apos;t have an account?{' '}
          <a href="#" className="text-red-500">
            Sign up for free!
          </a>
        </p>
      </div>
      <div className="w-full lg:w-1/2 bg-gray-100 flex justify-center items-center">
        <img
          src={loginBanner}
          alt="Illustration of a person in sportswear jumping"
          className="w-full h-auto object-cover" // Sử dụng h-auto để duy trì tỷ lệ khung hình
        />
      </div>
    </div>
  );
};

export default Login;
