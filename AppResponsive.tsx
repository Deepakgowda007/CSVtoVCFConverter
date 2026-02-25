import React, { useState, useEffect } from 'react';
import App from './App';
import AppMobile from './AppMobile';

const AppResponsive: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      // Check if screen width is less than 768px (tablet breakpoint)
      setIsMobile(window.innerWidth < 768);
    };

    // Check on mount
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Render mobile or desktop version based on screen size
  return isMobile ? <AppMobile /> : <App />;
};

export default AppResponsive;
