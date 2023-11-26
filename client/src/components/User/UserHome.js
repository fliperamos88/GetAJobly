import { Routes, Route, useParams, Outlet } from 'react-router-dom';
import { useEffect } from 'react';

const UserHome = () => {
  let { username } = useParams();
  return (
    <>
      <h1>This is the homepage of {username}</h1>
      <Outlet />
    </>
  );
};

export default UserHome;
