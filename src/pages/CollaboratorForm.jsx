import React, { useState, useRef } from 'react';
import AppBar from '../components/AppBar.jsx';

const CollaboratorForm = () => {
  const [collaborator, setCollaborator] = useState('');
  const collaboratorName = useRef();

  const getCollaboratorName = () => {
    // should set timeout on this to prevent many queries to server
    const input = collaboratorName.current.value;
    console.log(input);
  };
  const submitEmail = () => {
    const input = collaboratorName.current.value;
    console.log(input);
  };
  return (
    <div>
      <div>Add collaborator page</div>
      <input
        type="text"
        placeholder="collaborators email / username"
        ref={collaboratorName}
        onChange={getCollaboratorName}
      ></input>
      <button onClick={submitEmail}>Collaborate!</button>
      {/* upon input, query db for users with that email / username */}
    </div>
  );
};

export default CollaboratorForm;
