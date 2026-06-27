import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { register, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await register(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="mt-6 text-4xl font-black tracking-tight text-gray-900">Register<span className="text-brand-red">.</span></h2>
        </div>
        <form className="mt-12 space-y-8" onSubmit={onSubmit}>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Full name</label>
              <input
                name="name"
                type="text"
                required
                className="appearance-none relative block w-full px-0 py-3 border-b-2 border-gray-200 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-brand-red sm:text-base transition-colors bg-transparent"
                placeholder="John Doe"
                value={formData.name}
                onChange={onChange}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Email address</label>
              <input
                name="email"
                type="email"
                required
                className="appearance-none relative block w-full px-0 py-3 border-b-2 border-gray-200 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-brand-red sm:text-base transition-colors bg-transparent"
                placeholder="hello@pulse.red"
                value={formData.email}
                onChange={onChange}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Password</label>
              <input
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-0 py-3 border-b-2 border-gray-200 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-brand-red sm:text-base transition-colors bg-transparent"
                placeholder="••••••••"
                value={formData.password}
                onChange={onChange}
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-4 px-4 text-base font-bold text-white bg-brand-red hover:bg-brand-red-hover focus:outline-none transition-colors"
            >
              Sign Up
            </button>
          </div>
          <div className="text-base text-center mt-6">
            <span className="text-gray-500">Already have an account? </span>
            <Link to="/login" className="font-semibold text-gray-900 hover:text-brand-red transition-colors">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
