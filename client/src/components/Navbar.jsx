import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LogOut } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-10 pt-4 pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-12 items-center">
          <Link to="/" className="flex items-center text-3xl font-bold tracking-tight text-gray-900 cursor-pointer">
            Tracker<span className="text-brand-red">.</span>
          </Link>
          
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center gap-6">
                <span className="text-base font-medium text-gray-800">
                  Welcome, {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-base font-medium text-gray-500 hover:text-brand-red transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-base font-medium text-gray-800 hover:text-brand-red transition-colors">Login</Link>
                <Link to="/register" className="text-base font-medium px-4 py-2 bg-brand-red text-white hover:bg-brand-red-hover transition-colors rounded-none">Register</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
