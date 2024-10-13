import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdAddToPhotos, MdOutlineFeedback } from 'react-icons/md';
import { TbMapSearch } from 'react-icons/tb';
import connectionString from '../connectionString';
import logo from '../../miscellaneous/Designer.png';

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const logout = async (e) => {
    e.preventDefault();
    const res = await fetch(`${connectionString}logout`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    sessionStorage.clear();
    window.location.href = '/';
  };

  return (
    <nav className="bg-blue-950 p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className=" h-8 " sizes='15' />
        <Link to="/" className="text-white px-4 text-2xl font-bold">
          NearMe
        </Link>
      </div>
      <div className="flex items-center md:hidden">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      <ul className="hidden md:flex flex-row items-center">
        <li>
          <Link
            to="/search"
            className="text-white hover:border-b-2 text-center hover:border-b-white mr-4"
          >
            Search
          </Link>
        </li>
        {sessionStorage.getItem('token') && (
          <>
            <li>
              <Link
                to="/addService"
                className="text-white hover:border-b-2 text-center hover:border-b-white mr-4"
              >
                Add
              </Link>
            </li>
            <li>
              <Link
                to="/getallservices"
                className="text-white hover:border-b-2 text-center hover:border-b-white mr-4"
              >
                My Services
              </Link>
            </li>
            <li>
              <button
                onClick={logout}
                className="text-white hover:border-b-2 text-center hover:border-b-white mr-4"
              >
                Log out
              </button>
            </li>
          </>
        )}
        {!sessionStorage.getItem('token') && (
          <li>
            <Link
              to="/sign-in"
              className="text-white hover:border-b-2 text-center hover:border-b-white mr-4"
            >
              Login
            </Link>
          </li>
        )}
        <li>
          <Link
            to="/about"
            className="text-white hover:border-b-2 text-center hover:border-b-white mr-4"
          >
            About
          </Link>
        </li>
        {/* Add more navigation links as needed */}
      </ul>
      {sidebarOpen && (
        <ul className="md:hidden flex flex-col absolute top-16 left-0 bg-blue-950 w-full z-10">
          <li>
            <Link
              to="/search"
              className="text-white text-center py-2"
              onClick={() => setSidebarOpen(false)}
            >
              Search
            </Link>
          </li>
          {sessionStorage.getItem('token') && (
            <>
              <li>
                <Link
                  to="/addService"
                  className="text-white text-center py-2"
                  onClick={() => setSidebarOpen(false)}
                >
                  Add
                </Link>
              </li>
              <li>
                <Link
                  to="/getallservices"
                  className="text-white text-center py-2"
                  onClick={() => setSidebarOpen(false)}
                >
                  My Services
                </Link>
              </li>
              <li>
                <button
                  onClick={(e) => {
                    logout(e);
                    setSidebarOpen(false);
                  }}
                  className="text-white text-center py-2"
                >
                  Log out
                </button>
              </li>
            </>
          )}
          {!sessionStorage.getItem('token') && (
            <li>
              <Link
                to="/sign-in"
                className="text-white text-center py-2"
                onClick={() => setSidebarOpen(false)}
              >
                Login
              </Link>
            </li>
          )}
          <li>
            <Link
              to="/about"
              className="text-white text-center py-2"
              onClick={() => setSidebarOpen(false)}
            >
              About
            </Link>
          </li>
          {/* Add more navigation links as needed */}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
