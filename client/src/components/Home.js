import Cookies from 'universal-cookie';
import HomeGeneral from './HomeGeneral';

const Home = ({ description }) => {
  return (
    <>
      {description == 'logged-home' ? (
        <div className="background-home-logged">
          <h2>
            “Pleasure in the job puts perfection in the work.” – Aristotle
          </h2>
        </div>
      ) : (
        <div className="background-home-general">
          <HomeGeneral />
        </div>
      )}
    </>
  );
};

export default Home;
