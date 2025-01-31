 

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const [isSmallDevice, setIsSmallDevice] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallDevice(window.innerWidth < 625);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (isSmallDevice && location.pathname === '/profile'||location.pathname==='/profile/orderHistory'  || location.pathname==='/profile/settings'|| location.pathname==='/profile/add-book' ) {
    return null;
  }

  return (
    <div className='bg-zinc-800 text-white px-8 py-4'>
      <h1 className='text-xl font-semibold text-center mb-0'>
        &copy; 2024, Made with love by Bhargav
      </h1>
    </div>
  );
};

export default Footer;
