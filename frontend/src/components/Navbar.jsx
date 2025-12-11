import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();

  // Initialize auth state from localStorage
  const initialIsLoggedIn = typeof window !== 'undefined' && Boolean(localStorage.getItem('token'));
  const initialStoredName = typeof window !== 'undefined' ? localStorage.getItem('name') : null;

  const [loggedIn, setLoggedIn] = useState(initialIsLoggedIn);
  const [nameState, setNameState] = useState(initialIsLoggedIn ? (initialStoredName && initialStoredName.length > 0 ? initialStoredName : 'User') : '');
  const initial = nameState && nameState.length > 0 ? nameState[0].toUpperCase() : 'U';

  // Keep Navbar in sync if auth changes elsewhere (signin/signup/logout)
  useEffect(() => {
    const sync = () => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const stored = typeof window !== 'undefined' ? localStorage.getItem('name') : null;
      setLoggedIn(Boolean(token));
      setNameState(Boolean(token) ? (stored && stored.length > 0 ? stored : 'User') : '');
    };

    // custom event and storage event listener
    const onAuthChanged = () => sync();
    const onStorage = (e) => {
      sync();
    };

    window.addEventListener('authChanged', onAuthChanged);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener('authChanged', onAuthChanged);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('name');
    } catch (e) {/* Ignore errors */}

    try { window.dispatchEvent(new Event('authChanged')); } catch (e) {}
    navigate('/');
  }

  return (
    <nav className='flex items-center justify-between px-10 py-5 shadow-lg'>
      <Link to='/' className='text-3xl font-bold'>Payment App</Link>
      <div className='flex items-center gap-3'>
        {loggedIn ? (
          <>
            <p className='text-xl font-normal'>Hello, {nameState}</p>
            <div className='flex justify-center h-[40px] w-[40px] rounded-full bg-gray-300'>
              <div className='flex flex-col justify-center'>{initial}</div>
            </div>
            <button
              onClick={handleLogout}
              className='ml-4 py-2 px-4 rounded-md bg-red-500 text-white'
            >
              Logout
            </button>
          </>
        ) : (
          <div className='flex items-center gap-3'>
            <Link to="/signin" className='text-black bg-white py-2 px-4 rounded-md border border-gray-300'>
              Sign In
            </Link>
            <Link to="/signup" className='text-white bg-black py-2 px-4 rounded-md'>
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar