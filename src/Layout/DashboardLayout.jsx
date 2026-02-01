import React, { useContext, useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import PrivateRoute from '../Provider/PrivateRoute';

const DashboardLayout = () => {
  const { user, logOut } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut().then(() => {
      navigate('/');
    });
  };

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard Home', icon: '📊' },
    { path: '/add-transaction', label: 'Add Transaction', icon: '➕' },
    { path: '/my-transactions', label: 'My Transactions', icon: '📋' },
    { path: '/reports', label: 'Reports', icon: '📈' },
    { path: '/my-profile', label: 'My Profile', icon: '👤' },
  ];

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Top Navbar */}
        <header className="bg-white dark:bg-gray-800 shadow-md fixed top-0 left-0 right-0 z-40">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="btn btn-ghost lg:hidden"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <Link to="/" className="btn btn-ghost normal-case text-xl text-green-600 dark:text-white font-bold">
                FinEase
              </Link>
            </div>
            
            <div className="flex items-center gap-3">
              <Link to="/" className="btn btn-sm btn-ghost hidden sm:inline-flex">Home</Link>
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Profile"
                      src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg border border-gray-200 dark:border-gray-700">
                  <li className="menu-title">
                    <span>{user?.displayName || 'User'}</span>
                  </li>
                  <li className="menu-title">
                    <span className="text-xs opacity-70 break-words">{user?.email}</span>
                  </li>
                  <li><Link to="/my-profile">My Profile</Link></li>
                  <li><Link to="/dashboard">Dashboard Home</Link></li>
                  <li><button onClick={handleLogout}>Logout</button></li>
                </ul>
              </div>
            </div>
          </div>
        </header>

        <div className="flex pt-16">
          {/* Sidebar */}
          <aside className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-200 ease-in-out pt-16 lg:pt-0`}>
            <div className="h-full overflow-y-auto p-4">
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-green-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          {/* Overlay for mobile */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Main Content */}
          <main className="flex-1 p-4 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default DashboardLayout;
