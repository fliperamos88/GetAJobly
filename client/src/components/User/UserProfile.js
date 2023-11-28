import { Routes, Route, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import UserEditForm from '../Forms/UserEditForm';

const EditForm = () => {
  return (
    <div className="background-edit-form">
      <div>
        <UserEditForm />
      </div>
    </div>
  );
};

export default EditForm;
