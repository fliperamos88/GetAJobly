import {
  Link,
  NavLink,
  Outlet,
  useParams,
  useLocation,
} from 'react-router-dom';
import Cookies from 'universal-cookie';
import { Jobly } from '../helpers/requestApi';
import { useState, useEffect } from 'react';
const cookies = new Cookies();

export const NavBar = () => {
  const [user, setUser] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      if (cookies.get('Jobly')) {
        const { data } = await Jobly.getOne('users', cookies.get('Jobly')[0]);
        setUser(data.User);
      }
    };
    fetchUser();
  }, []);

  const logOut = () => {
    cookies.remove('Jobly');
    setUser('');
  };

  return (
    <>
      <div>
        <div className="navBar">
          <div>
            <Link to="/">JOBLY</Link>
          </div>
          <div>
            {cookies.get('Jobly') ? (
              <>
                <NavLink to={`/${cookies.get('Jobly')[0]}/profile`}>
                  Profile
                </NavLink>
                <NavLink to="/companies">Companies</NavLink>
                <NavLink to="/jobs">Jobs</NavLink>
                <NavLink to={`/${cookies.get('Jobly')[0]}/applications`}>
                  Applications
                </NavLink>
                <NavLink to="/" onClick={logOut} reloadDocument>
                  Log Out
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/register">Register</NavLink>
                <NavLink to="/login">Login</NavLink>
              </>
            )}
          </div>
        </div>
        {cookies.get('Jobly') && (
          <div>
            <h1>
              Welcome {user.first_name} {user.last_name}
            </h1>
          </div>
        )}
      </div>
      <Outlet />
    </>
  );
};
