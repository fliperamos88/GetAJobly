import JobsList from '../Jobs/JobsList';
import { useNavigate, Navigate } from 'react-router-dom';

const CompanyCard = ({ company }) => {
  let navigate = useNavigate();

  return (
    <div className="company-container">
      <div className="company-details">
        <div>
          <span>
            <b>Company name:</b>
            &nbsp;
            {company.name}
          </span>
        </div>
        <div>
          <span>
            <b>N. of Employees:</b>
            &nbsp;
            {company.num_employees}
          </span>
        </div>
        <div>
          <span>
            <b>Company Description:</b>
            &nbsp;
            {company.description}
          </span>
        </div>
      </div>
      <div>
        <button
          onClick={() =>
            navigate(`${company.handle}/jobs`, {
              state: { jobs: company.jobs },
            })
          }
        >
          Available Jobs
        </button>
      </div>
    </div>
  );
};

export default CompanyCard;
