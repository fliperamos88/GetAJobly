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

  const sucessMessage =
    'Email sent! I will try to get back to you as soon as possible!';

  const failureMessage =
    'I am sorry, but something went wrong with your message delivery. Feel free to reach out to me directly at ffrf88@icloud.com';

  // const [alertMSG, setAlertMSG] = useState(true);
  // const [submit, setSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // const closeAlert = () => {
  //   setSubmit(false);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = await Authenticate.register(formData);
      console.log(newUser);
      navigate('/login');
      // setSubmit(true);
      // setFormData(initialState);
    } catch {
      // setAlertMSG(false);
      // setSubmit(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="">
        <h5 className="">Register</h5>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="">
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
          <div className="">
            <label htmlFor="lastName" className="">
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
          <div className="">
            <label htmlFor="email" className="">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            ></input>
          </div>
          <div className="">
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
          <div className="">
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
          <div className="text-center">
            <button className="btnContact">SUBMIT</button>
          </div>
        </form>
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
  );
};

export default RegisterForm;
