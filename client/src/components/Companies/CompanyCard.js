import JobsList from '../Jobs/JobsList';
import { useNavigate, Navigate } from 'react-router-dom';

const CompanyCard = ({ company }) => {
  let navigate = useNavigate();

  return (
    <div style={{ border: 'solid 3px red' }}>
      <h5>{company.handle}</h5>
      <h5>{company.name}</h5>
      <h5>{company.num_employees}</h5>
      <h5>{company.description}</h5>
      <button
        onClick={() =>
          navigate(`${company.handle}/jobs`, { state: { jobs: company.jobs } })
        }
      >
        Available Jobs
      </button>
    </div>
  );
};

export default CompanyCard;
