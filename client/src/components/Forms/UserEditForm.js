import { useState, useEffect } from 'react';
import { Jobly } from '../../helpers/requestApi';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';

const UserEditForm = () => {
  let { username } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fectchUser = async () => {
      try {
        const { data } = await Jobly.getOne('users', username);
        setFormData(data.User);
      } catch {
        navigate(`/`);
      }
    };
    fectchUser();
  }, []);

  const initialState = {
    first_name: '',
    last_name: '',
    email: '',
  };

  const [formData, setFormData] = useState(initialState);
  const [submit, setSubmit] = useState(false);
  const [alertMSG, setAlertMSG] = useState();

  const sucessMessage = 'Edit submitted! Updating profile';
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
  };

  const handleSubmit = async (e) => {
    setSubmit(false);
    e.preventDefault();
    try {
      const newUser = await Jobly.update('users', username, formData);
      setAlertMSG(sucessMessage);
      setSubmit(true);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch {
      setAlertMSG(failureMessage);
      setSubmit(true);
    }
  };

  return (
    <div className="form-component">
      <div className="form-container" id="form-container-edit">
        <div className="">
          <h2 className="">Edit Profile</h2>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label htmlFor="first_name" className="">
                <b>First Name</b>
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
              />
            </div>
            <div className="input-container">
              <label htmlFor="lastName" className="">
                <b>Last Name</b>
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
              />
            </div>
            <div className="input-container">
              <label htmlFor="email" className="">
                <b>Email</b>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              ></input>
            </div>
            <div className="submit-edit">
              <button onClick={handleSubmit} className="btn btn-light">
                SUBMIT EDITS
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
      </div>
    </div>
  );
};

export default UserEditForm;
