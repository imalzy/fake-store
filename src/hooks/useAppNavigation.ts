import { useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const useAppNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goTo = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (path: string, state?: Record<string, any>) => {
      navigate(path, { state });
    },
    [navigate]
  );

  // go back one step
  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  // check if current path matches
  const isCurrentPath = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  return {
    navigate,     
    location,     
    goTo,         
    goBack,       
    isCurrentPath 
  };
};
