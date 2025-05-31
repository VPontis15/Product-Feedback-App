import { Navigate } from 'react-router-dom';
import Loader from './Loader';
import { useAuthContext } from '../context/authUtils';

interface PublicRouteProps {
  children: React.ReactNode;
}

export default function PublicRoute({ children }: PublicRouteProps) {
  const { user, isLoading } = useAuthContext();

  if (isLoading) {
    return <Loader />;
  }

  if (user) {
    // Redirect authenticated users to home
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
