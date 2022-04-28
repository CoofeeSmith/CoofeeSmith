import React, { useState, useEffect, useContext } from 'react';
import UserContext from './UserDetails';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Login from './Login'

const Navbar = (props) => {
  const user = useContext(UserContext);
  console.log(user)
  let navigate = useNavigate();
  // props.hide

  const handleLogout = (e) => {
    
    console.log('handleLogout');
    document.cookie = 'BrewCookie=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  };

  return (
    <>
      <header>
        <div className='brand nav'>FindMyBrews&#127867;</div>
        {/*Leaving this as a UL/LI so that we want to add more navbar options */}
        <ul className='nav_links'>
            {props.hide === false && <li>
              <Link className='logout-Btn' to='/login' onClick={handleLogout}>
                Logout
              </Link>
            </li>}
        </ul>
      </header>
    </>
  );
};

export default Navbar;
