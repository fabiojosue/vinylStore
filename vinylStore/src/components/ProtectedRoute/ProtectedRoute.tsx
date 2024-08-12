import React from 'react';
import { Navigate } from 'react-router-dom';
import { isTokenValid } from '../../Service/UserServiceGraphql';

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        const valid = await isTokenValid();
        setIsAuthenticated(valid);
      } catch (error) {
        console.error('Error during authentication check:', error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Or a spinner
  }

  return isAuthenticated ? element : <Navigate to="/" />;
};

export default ProtectedRoute;
