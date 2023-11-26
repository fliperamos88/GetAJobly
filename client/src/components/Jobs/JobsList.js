import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Jobly } from '../../helpers/requestApi';
import JobCard from './JobCard';
import { v4 as uuidv4 } from 'uuid';
import FilterForm from '../Forms/FilterForm';

const JobsList = () => {
  const [filter, setFilter] = useState(false);
  const location = useLocation();
  const [jobList, setJobList] = useState([]);
  const [applicationList, setApplicationList] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const { data } = await Jobly.getAll('applications');
      const appMap = data.Applications.map((value) => {
        return Object.values(value).join('-');
      });
      setApplicationList(appMap);
    };
    fetchApplications();
  }, []);

  const searchHandler = async (term) => {
    const { data } = await Jobly.getAll('jobs', term);
    setFilter(true);
    setJobList(data.All_Jobs);
  };

  useEffect(() => {
    const fetchCompanies = async () => {
      if (!filter && location.pathname === '/jobs') {
        const { data } = await Jobly.getAll('jobs');
        setJobList(data.All_Jobs);
      }
    };
    fetchCompanies();
  }, [filter]);

  useEffect(() => {
    const fetchJobs = async () => {
      if (location.pathname === '/jobs') {
        const { data } = await Jobly.getAll('jobs');
        setJobList(data.All_Jobs);
      } else {
        setJobList(location.state.jobs);
      }
    };
    fetchJobs();
  }, []);

  return (
    <>
      <div>
        {location.pathname === '/jobs' && (
          <FilterForm searchHandler={searchHandler} />
        )}
        <div>
          <span> N. of results: {jobList.length}</span>
          {filter && (
            <button onClick={() => setFilter(false)}>Remover filter</button>
          )}
        </div>
        {jobList.map((job) => {
          return (
            <JobCard
              job={job}
              key={uuidv4()}
              applicationList={applicationList}
            />
          );
        })}
      </div>
    </>
  );
};

export default JobsList;
