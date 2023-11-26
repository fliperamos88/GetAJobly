import { useState, createContext } from 'react';
import { Outlet } from 'react-router-dom';

const FilterContext = createContext();
const FilterHandlerContext = createContext();

const FilterProvider = () => {
  const [filter, setFilter] = useState(false);

  return (
    <FilterContext.Provider value={filter}>
      <FilterHandlerContext.Provider value={setFilter}>
        <Outlet />
      </FilterHandlerContext.Provider>
    </FilterContext.Provider>
  );
};

export { FilterContext, FilterHandlerContext, FilterProvider };
