import { NavLink } from 'react-router-dom';

const HomeGeneral = () => {
  return (
    <div className="home-container-general">
      <div class="home-welcome-container">
        <div className="jobly-description-container">
          <p>
            <b>Welcome to &nbsp; </b>
            <span className="nav-Logo" id="nav-logo-container">
              JOBLY
            </span>
            <b>
              . &nbsp; This is your website to find the best job opportunities.
              <br></br> Register now to enjoy our services!
            </b>
          </p>
        </div>
      </div>
      <div className="home-buttons-container">
        <button className="btn btn-warning" id="home-button-register">
          <NavLink to="/register">Register</NavLink>
        </button>
        <button className="btn btn-warning" id="home-button-login">
          <NavLink to="/login">Login</NavLink>
        </button>
      </div>
    </div>
  );
};

export default HomeGeneral;
