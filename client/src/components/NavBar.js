import { Link, NavLink, Outlet } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { Jobly } from '../helpers/requestApi';
import { useState, useEffect, useContext } from 'react';
import { FilterHandlerContext } from '../helpers/filterProvider';
const cookies = new Cookies();

export const NavBar = () => {
  const setFilter = useContext(FilterHandlerContext);
  const [user, setUser] = useState(false);
  const [headMessage, setHeadMessage] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      if (cookies.get('Jobly')) {
        const { data } = await Jobly.getOne('users', cookies.get('Jobly')[0]);
        setUser(data.User);
        setHeadMessage(true);
      }
    };
    fetchUser();
  }, []);

  const logOut = () => {
    setHeadMessage(false);
    setTimeout(async () => {
      cookies.remove('Jobly');
      window.location.replace('/');
    }, 2000);
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
                <a href="#" onClick={logOut}>
                  Log Out
                </a>
              </>
            ) : (
              <>
                <NavLink to="/register">Register</NavLink>
                <NavLink to="/login">Login</NavLink>
              </>
            )}
          </div>
        </div>
        {user && (
          <div className="navBar-Logged">
            <div className="navBar-Welcome">
              {headMessage && (
                <>
                  <h5 className="">Welcome </h5>
                  <span>
                    {user.first_name} {user.last_name}
                  </span>
                </>
              )}
              {!headMessage && (
                <>
                  <h5 className="">Logging out from </h5>
                  <span>
                    {user.first_name} {user.last_name}'s account{' '}
                    <i
                      class="fa-solid fa-spinner fa-spin fa-xl "
                      style={{ color: '322f2f' }}
                    ></i>
                  </span>
                </>
              )}
            </div>
            <div className="nav-Links">
              <NavLink to={`/${user.username}/profile`}>Profile Edit</NavLink>
              <NavLink to={`/${user.username}/applications`}>
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
