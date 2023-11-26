import { Routes, Route, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import UserEditForm from '../Forms/UserEditForm';

const EditForm = () => {
  return (
    <div>
      <UserEditForm />
    </div>
  );
};

export default EditForm;
