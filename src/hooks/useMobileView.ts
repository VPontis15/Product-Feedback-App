import { useEffect, useState } from 'react';

// Custom hook to check if viewport matches mobile size
export const useMobileView = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 650);
    };

    // Check on mount
    checkIfMobile();

    // Set up event listener
    window.addEventListener('resize', checkIfMobile);

    // Clean up
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return isMobile;
};
