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
    <div style={{ border: 'solid 3px red' }}>
      <h5>{job.title}</h5>
      <h5>{job.salary}</h5>
      <h5>{job.equity}</h5>
      <h5>{job.company.name}</h5>

      <div>
        {applied && (
          <button style={{ color: 'green' }} onClick={withdrawFromJob}>
            Already applied
          </button>
        )}
        {!applied && (
          <button style={{ color: 'red' }} onClick={applyForJob}>
            Apply
          </button>
        )}
      </div>
    </div>
  );
};

export default JobCard;
