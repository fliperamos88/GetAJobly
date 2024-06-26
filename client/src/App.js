import './CSS/App.css';
import { Jobly, Authenticate } from './helpers/requestApi';
import { Routes, Route } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import Home from './components/Home';
import RegisterForm from './components/Forms/RegisterForm';
import LoginForm from './components/Forms/LoginForm';

import { AuthRoute } from './helpers/AuthRoutes';
import EditForm from './components/User/UserProfile';
import CompaniesList from './components/Companies/CompaniesList';
import JobsList from './components/Jobs/JobsList';
import UserApplications from './components/User/UserApplications';
import { FilterProvider } from './helpers/filterProvider';

function App() {
  return (
    <>
      <Routes>
        <Route path="/">
          <Route element={<FilterProvider />}>
            <Route element={<AuthRoute />}>
              <Route element={<NavBar />}>
                <Route
                  path="/"
                  element={
                    <Home key="general-home" description="general-home" />
                  }
                />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route
                  path="/:username"
                  element={<Home key="logged-home" description="logged-home" />}
                />
                <Route path="/:username/profile" element={<EditForm />} />
                <Route
                  path="/:username/applications"
                  element={<UserApplications />}
                />
                <Route path="/companies" element={<CompaniesList />} />
                <Route
                  path="/companies/:company/jobs"
                  element={<JobsList key="company-jobs" />}
                />
                <Route path="/jobs" element={<JobsList key="all-jobs" />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;


