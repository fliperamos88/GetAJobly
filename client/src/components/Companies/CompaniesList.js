import { useState, useEffect, useContext } from 'react';
import { Jobly } from '../../helpers/requestApi';
import CompanyCard from './CompanyCard';
import { v4 as uuidv4 } from 'uuid';
import FilterForm from '../Forms/FilterForm';
import axios from 'axios';
import {
  FilterContext,
  FilterHandlerContext,
} from '../../helpers/filterProvider';

const CompaniesList = () => {
  const [compList, setCompList] = useState([]);
  // const [filter, setFilter] = useState(false);
  const filter = useContext(FilterContext);
  const setFilter = useContext(FilterHandlerContext);

  const searchHandler = async (term) => {
    const { data } = await Jobly.getAll('companies', term);
    setFilter(true);
    setCompList(data.Companies);
  };

  useEffect(() => {
    const fetchCompanies = async () => {
      if (!filter) {
        const { data } = await Jobly.getAll('companies');
        setCompList(data.Companies);
      }
    };
    fetchCompanies();
  }, [filter]);

  return (
    <>
      <div>
        <FilterForm searchHandler={searchHandler} />
        <div>
          <span> N. of results: {compList.length}</span>
          {filter && (
            <button onClick={() => setFilter(false)}>Remover filter</button>
          )}
        </div>
        {compList.map((company) => (
          <CompanyCard company={company} key={uuidv4()} />
        ))}
      </div>
    </>
  );
};

export default CompaniesList;
