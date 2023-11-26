import { useState } from 'react';

const FilterForm = ({ term, searchHandler }) => {
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
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="term"
            name="term"
            value={formData.term}
            onChange={handleChange}
          ></input>
          <button>Sarch Term</button>
        </form>
      </div>
    </>
  );
};

export default FilterForm;
