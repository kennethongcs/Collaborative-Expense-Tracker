/* eslint-disable react/self-closing-comp */
import React, { useState, useRef } from 'react';
import axios from 'axios';

import UserList from '../components/UserList.jsx';

const CollaboratorForm = () => {
  const [collaborator, setCollaborator] = useState('');

  const [retrievedUsers, setRetrievedUsers] = useState([]);
  const collaboratorName = useRef();

  // add user email into input box
  const whenUserIsClicked = (user) => {
    collaboratorName.current.value = user.email;
  };

  // runs when any char is typed into "input box"
  const getCollaboratorName = () => {
    // should set timeout on this to prevent many queries to server
    const input = collaboratorName.current.value;
    // console.log(input);
    if (input !== '') {
      // TODO
      // axios to get user data from server
      axios
        .post('/retrieveusers', {
          user: input,
        })
        .then((res) => {
          const { data } = res;
          // console.log(data);
          // console.log(`retrieved users: ${emails}`);
          setRetrievedUsers(data);
        });
    }
  };

  // sends invitation email to invite to collaborate on workspace
  const submitEmail = () => {
    const input = collaboratorName.current.value;
    console.log(input);
  };
  return (
    <div>
      <div>Add collaborator page</div>
      <input
        type="text"
        placeholder="enter collaborators email"
        ref={collaboratorName}
        onChange={getCollaboratorName}
      ></input>
      <button onClick={submitEmail}>Collaborate!</button>
      <ul>
        {/* upon input, query db for users with that email / username */}
        <UserList
          retrievedUsers={retrievedUsers}
          whenUserIsClicked={whenUserIsClicked}
        />
      </ul>
    </div>
  );
};

export default CollaboratorForm;
