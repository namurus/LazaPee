// logo google
import { googleLogo, loginBanner } from '../assets';

const Login = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex flex-col justify-center items-center bg-white">
        <h1 className="text-4xl font-semibold mb-2">WELCOME BACK</h1>
        <p className="text-gray-500 mb-8">Welcome back! Please enter your details.</p>
        <form className="w-3/4">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              placeholder="*********"
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
          <button className="w-full bg-red-500 text-white py-2 rounded-lg shadow-md hover:bg-red-600 mb-4">
            Sign in
          </button>
          <button className="w-full flex items-center justify-center border py-2 rounded-lg shadow-md hover:bg-gray-100">
            <img src={googleLogo} alt="Google logo" className="mr-2 h-6 w-6" />
            Sign in with Google
          </button>
        </form>
        <p className="mt-4 text-gray-700">
          Don&apos;t have an account?{' '}
          <a href="#" className="text-red-500">
            Sign up for free!
          </a>
        </p>
      </div>
      <div className="w-1/2 bg-gray-100 flex justify-center items-center">
        <img
          src={loginBanner}
          alt="Illustration of a person in sportswear jumping"
          className="w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;