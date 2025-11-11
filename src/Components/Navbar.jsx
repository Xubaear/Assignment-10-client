import React, { useContext, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext); // get user & logout
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logOut().catch(err => console.log(err));
    setDropdownOpen(false);
  };

  const links = (
    <>
      <Link to="/"><li><a>Home</a></li></Link>
      {user && <Link to="/add-transaction"><li><a>Add Transaction</a></li></Link>}
      {user && <Link to="/my-transactions"><li><a>My Transaction</a></li></Link>}
      {user && <Link to="/reports"><li><a>Reports</a></li></Link>}
    </>
  );

  return (
    <div className="navbar bg-linear-to-r from-gray-800 via-gray-700 to-gray-600 text-white shadow-md max-w-6xl mx-auto rounded-xl">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> 
            </svg>
          </div>
          {dropdownOpen && (
            <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
              {links}
              {user && (
                <li className="mt-2 border-t pt-2">
                  <span className="block px-2 py-1">{user.email}</span>
                  <button onClick={handleLogout} className="btn btn-error btn-sm w-full mt-1">Logout</button>
                </li>
              )}
            </ul>
          )}
        </div>

        <Link to="/" className="btn btn-ghost text-xl">FinEase</Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links}
        </ul>
      </div>

      <div className="navbar-end">
        {!user ? (
          <Link to="/login">
            <button className="button">
              <div className="blob1"></div>
              <div className="blob2"></div>
              <div className="inner">Login</div>
            </button>
          </Link>
        ) : (
          <div className="relative">
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="btn btn-ghost">
              {user.email}
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-base-100 rounded shadow-lg p-2">
                <button onClick={handleLogout} className="btn btn-error w-full">Logout</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
