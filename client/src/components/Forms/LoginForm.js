import { useState } from 'react';
import { Authenticate } from '../../helpers/requestApi';
import { useNavigate, Navigate } from 'react-router-dom';

const LoginForm = () => {
  const initialState = {
    username: '',
    password: '',
  };

  let navigate = useNavigate();

  const [formData, setFormData] = useState(initialState);

  const [alertMSG, setAlertMSG] = useState('');
  const [submit, setSubmit] = useState(false);

  const sucessMessage = "Valid authentication. Redirecting to user's homepage";

  const failureMessage = 'Wrong username/password';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const closeAlert = () => {
    setSubmit(false);
    setAlertMSG('');
  };

  const handleSubmit = async (e) => {
    setSubmit(false);
    e.preventDefault();
    setAlertMSG('');
    setTimeout(() => {
      setSubmit(true);
    }, 1000);
    try {
      const { data } = await Authenticate.login(formData);
      setAlertMSG(sucessMessage);
      setTimeout(() => {
        setFormData(initialState);
        window.location = `/${data.user.username}`;
      }, 3000);
    } catch (err) {
      if (err.response.status) {
        setAlertMSG(failureMessage);
      }
    }
  };

  return (
    <div className="form-component">
      <div className="form-container" id="form-container-login">
        <div className="">
          <h2 className="">Login</h2>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label htmlFor="username" className="">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              ></input>
            </div>
            <div className="input-container">
              <label htmlFor="password" className="">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              ></input>
            </div>
            <div className="submit-edit">
              <button onClick={handleSubmit} className="btn btn-light">
                SUBMIT
              </button>
            </div>
          </form>
        </div>
        <div className="">
          {submit && (
            <div
              className={
                alertMSG === sucessMessage
                  ? 'alert alert-success'
                  : 'alert alert-danger'
              }
              role="alert"
            >
              {alertMSG}{' '}
              {alertMSG === sucessMessage && (
                <i
                  class="fa-solid fa-spinner fa-spin"
                  style={{ color: '322f2f' }}
                ></i>
              )}
              {alertMSG === failureMessage && (
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={closeAlert}
                  style={{ marginLeft: '2px' }}
                ></button>
              )}
            </div>
          )}
        </div>
        {/* <div className="d-flex justify-content-center mt-4 mx-2">
        {submit && (
          <div
            className={alertMSG ? 'alert alert-success' : 'alert alert-danger'}
            role="alert"
          >
            {alertMSG ? sucessMessage : failureMessage}
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={closeAlert}
            ></button>
          </div>
        )}
      </div> */}
      </div>
    </div>
  );
};

export default LoginForm;
