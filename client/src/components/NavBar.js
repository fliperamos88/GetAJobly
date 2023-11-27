import { Link, NavLink, Outlet } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { Jobly } from '../helpers/requestApi';
import { useState, useEffect, useContext } from 'react';
import { FilterHandlerContext } from '../helpers/filterProvider';
const cookies = new Cookies();

export const NavBar = () => {
  const setFilter = useContext(FilterHandlerContext);
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
  };

  return (
    <>
      <div className="navBar">
        <div className="navBar-LoggedOut">
          <div>
            <Link to="/" className="nav-Logo">
              JOBLY
            </Link>
          </div>
          <div className="nav-Links">
            {cookies.get('Jobly') ? (
              <>
                <NavLink to="/" reloadDocument onClick={logOut}>
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
          <div className="navBar-Logged">
            <div className="navBar-Welcome">
              <h3 className="">Welcome </h3>
              <span>
                {user.first_name} {user.last_name}
              </span>
            </div>
            <div className="nav-Links">
              <NavLink to={`/${cookies.get('Jobly')[0]}/profile`}>
                Profile Edit
              </NavLink>
              <NavLink to={`/${cookies.get('Jobly')[0]}/applications`}>
                | Applications
              </NavLink>
              <NavLink to="/companies" onClick={() => setFilter(false)}>
                | Companies
              </NavLink>
              <NavLink to="/jobs" onClick={() => setFilter(false)}>
                | Jobs
              </NavLink>
            </div>
          </div>
        )}
      </div>
      <Outlet />
    </>
  );
};
