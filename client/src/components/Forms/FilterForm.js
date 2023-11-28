import { useState } from 'react';

const FilterForm = ({ searchHandler, placeholder }) => {
  const initialState = { term: '' };
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchHandler(formData);
    setFormData(initialState);
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit} className="filter-form-container">
          <div>
            <input
              type="text"
              id="term"
              name="term"
              value={formData.term}
              onChange={handleChange}
              className="filter-input"
              placeholder={placeholder}
            ></input>
          </div>
          <div>
            <button className="btn btn-outline-light">SEARCH</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FilterForm;
