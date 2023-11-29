import { useState } from 'react';
import { Authenticate } from '../../helpers/requestApi';
import { useNavigate, Navigate } from 'react-router-dom';

const RegisterForm = () => {
  let navigate = useNavigate();
  const initialState = {
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: '',
  };

  const [formData, setFormData] = useState(initialState);
  const [submit, setSubmit] = useState(false);
  const [alertMSG, setAlertMSG] = useState();

  const sucessMessage = 'Account being created, redirecting to the login page';

  const failureMessage = 'I am sorry, but something went wrong';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const closeAlert = () => {
    setSubmit(false);
    setAlertMSG();
  };

  const handleSubmit = async (e) => {
    setSubmit(false);
    e.preventDefault();
    setTimeout(() => {
      setSubmit(true);
    }, 1000);
    try {
      const newUser = await Authenticate.register(formData);
      console.log(newUser);
      setAlertMSG(sucessMessage);
      setTimeout(() => {
        setFormData(initialState);
        navigate('/login');
      }, 3000);
    } catch (err) {
      setAlertMSG(failureMessage);
    }
  };

  return (
    <div className="form-component">
      <div className="form-container" id="form-container-register">
        <div className="">
          <h2 className="">Register</h2>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label htmlFor="first_name" className="">
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-container">
              <label htmlFor="last_name" className="">
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-container">
              <label htmlFor="email" className="">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              ></input>
            </div>
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
                required
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
                minlength="6"
                placeholder="six characters minimum"
              ></input>
            </div>
            <div className="submit-edit">
              <button className="btn btn-light">SUBMIT</button>
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
      </div>
    </div>
  );
};

export default RegisterForm;
