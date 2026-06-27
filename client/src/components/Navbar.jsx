import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LogOut, CheckSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <CheckSquare className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-slate-900">Task Tracker</span>
          </div>
          
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-slate-700">
                  Welcome, {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
