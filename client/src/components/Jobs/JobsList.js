import { useState, useEffect, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Jobly } from '../../helpers/requestApi';
import JobCard from './JobCard';
import { v4 as uuidv4 } from 'uuid';
import FilterForm from '../Forms/FilterForm';
import {
  FilterContext,
  FilterHandlerContext,
} from '../../helpers/filterProvider';

const JobsList = () => {
  const { company } = useParams();
  const filter = useContext(FilterContext);
  const setFilter = useContext(FilterHandlerContext);
  const location = useLocation();
  const [jobList, setJobList] = useState([]);
  const [applicationList, setApplicationList] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const { data } = await Jobly.getAll('applications');
      const appMap = data.Applications.map((value) => {
        return value.username + '-' + value.job_id;
      });
      setApplicationList(appMap);
    };
    fetchApplications();
  }, []);

  console.log(applicationList);
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
      <div className="background-list-jobs">
        <div>
          {location.pathname === '/jobs' && (
            <h2 className="page-title">List of all available jobs</h2>
          )}
          {location.pathname !== '/jobs' && (
            <h2 className="page-title">
              Available jobs at {location.state.jobs[0].company.name}
            </h2>
          )}
          <div className="search-form-container">
            <div>
              {location.pathname === '/jobs' && (
                <FilterForm
                  searchHandler={searchHandler}
                  placeholder="Filter by job title"
                />
              )}
            </div>
            <div className="filter-results-container">
              <span style={{ marginRight: '8px' }}>
                {' '}
                N. of results: {jobList.length}
              </span>
              {filter && (
                <button
                  onClick={() => setFilter(false)}
                  className="btn btn-dark"
                >
                  Remover filter
                </button>
              )}
            </div>
          </div>
          <div className="job-list-container">
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
        </div>
      </div>
    </>
  );
};

export default JobsList;
