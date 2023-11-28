import { Jobly } from '../../helpers/requestApi';
import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

// const

const JobCard = ({ job, applicationList, removeHandle }) => {
  const location = useLocation();
  let username;
  const [applied, setApplied] = useState(false);
  if (cookies.get('Jobly')) {
    username = cookies.get('Jobly')[0];
  }
  const [applicationCard, setApplicationCard] = useState(
    `${username}-${job.id}`
  );

  const [applicationBody, setApplicationBody] = useState({
    username: username,
    job_id: job.id,
  });

  const applyForJob = async () => {
    const res = await Jobly.create('applications', applicationBody);

    setApplied(true);
  };

  const withdrawFromJob = async () => {
    const res = await Jobly.delete('applications', '', applicationBody);
    if (location.pathname === '/felipeferreira/applications') {
      removeHandle(job.id);
    }
    setApplied(false);
  };

  useEffect(() => {
    const applyEffect = () => {
      if (applicationList.includes(applicationCard)) {
        setApplied(true);
      }
    };
    applyEffect();
  }, []);

  return (
    <div className="job-container">
      <div className="job-details-container">
        <div>
          <span>
            <b>Job Title:</b>&nbsp;
            {job.title}
          </span>
        </div>
        <div>
          <span>
            <b>Job Salary:</b>&nbsp; ${job.salary}/year
          </span>
        </div>
        <div>
          <span>
            <b>Hiring Company:</b>&nbsp;
            {job.company.name}
          </span>
        </div>
      </div>
      <div className="card-button-container">
        {applied && (
          <>
            <div>
              <span className="applied-msg">Applied!</span>
              <i
                class="fa-solid fa-circle-check fa-xl"
                style={{ color: '#20c53c' }}
              ></i>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-warning"
                onClick={withdrawFromJob}
              >
                Remove application
              </button>
            </div>
          </>
        )}
        {!applied && (
          <button type="button" className="btn btn-info" onClick={applyForJob}>
            Apply for this job
          </button>
        )}
      </div>
    </div>
  );
};

export default JobCard;
