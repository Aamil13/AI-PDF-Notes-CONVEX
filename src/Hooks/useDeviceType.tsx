import { useState, useEffect } from "react";

// Define breakpoints for mobile, tablet, and desktop
const BREAKPOINTS = {
  MOBILE: 640, // Mobile: less than or equal to 480px
  TABLET: 1024, // Tablet: between 481px and 768px
};

// Define the types for the device type state
interface DeviceType {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

const useDeviceType = (): DeviceType => {
  const [deviceType, setDeviceType] = useState<DeviceType>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  });

  const updateDeviceType = () => {
    const width = window.innerWidth;
    setDeviceType({
      isMobile: width <= BREAKPOINTS.MOBILE,
      isTablet: width > BREAKPOINTS.MOBILE && width <= BREAKPOINTS.TABLET,
      isDesktop: width > BREAKPOINTS.TABLET,
    });
  };

  useEffect(() => {
    // Initialize the device type
    updateDeviceType();

    // Add event listener for resize
    window.addEventListener("resize", updateDeviceType);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateDeviceType);
    };
  }, []);

  return deviceType;
};

export default useDeviceType;
