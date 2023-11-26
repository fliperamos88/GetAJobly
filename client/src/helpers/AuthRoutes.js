import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const AuthRoute = () => {
  const location = useLocation();
  const username = cookies.get('Jobly') ? cookies.get('Jobly')[0] : null;
  if (
    location.pathname === '/' ||
    location.pathname === '/login' ||
    location.pathname === '/register'
  ) {
    return !cookies.get('Jobly') ? (
      <Outlet />
    ) : (
      <Navigate to={`/${username}`} />
    );
  } else {
    return cookies.get('Jobly') ? <Outlet /> : <Navigate to="/" />;
  }
};
