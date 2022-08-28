/* eslint-disable arrow-body-style */
/* eslint-disable react/self-closing-comp */
import React, { useState, useRef } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import axios from 'axios';

import UserList from '../components/UserList.jsx';

const CollaboratorForm = ({ user, workspace }) => {
  const [retrievedUsers, setRetrievedUsers] = useState([]);
  const [authority, setAuthority] = useState('');

  const workspaceId = workspace.id;
  const collaboratorName = useRef('');

  // add user email into input box
  const whenUserIsClicked = (user) => {
    collaboratorName.current.value = user.email;
  };

  // runs when any char is typed into "input box"
  const getCollaboratorName = () => {
    const input = collaboratorName.current.value;
    // console.log(input);
    if (input !== '') {
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
    console.log(workspaceId);
    // use workspaceId and add an existing user into your user_workspace table

    axios
      .post('/joinworkspace', {
        email: input,
        workspaceId,
      })
      .then((res) => {
        console.log(res);
      });
  };

  const handleChangeAuthority = (e) => {
    const input = e.target.value;
    setAuthority(input);
  };

  const AuthoritySelect = () => {
    return (
      <FormControl fullWidth>
        <InputLabel id="editing-authority-label">Authority</InputLabel>
        <Select
          labelId="editing-authority-label"
          id="edit-authority-select"
          label="Authority"
          onChange={handleChangeAuthority}
          value={authority}
        >
          <MenuItem value="Viewing">Viewing</MenuItem>
          <MenuItem value="Editing">Editing</MenuItem>
        </Select>
      </FormControl>
    );
  };

  return (
    <div>
      <div>Add collaborators here:</div>
      <div>
        <input
          type="text"
          placeholder="Email"
          // ref={collaboratorName}
          onChange={getCollaboratorName}
        ></input>
      </div>
      <div>
        <ul>
          {/* upon input, query db for users with that email / username */}
          <UserList
            retrievedUsers={retrievedUsers}
            whenUserIsClicked={whenUserIsClicked}
          />
        </ul>
      </div>
      <div>
        <div>Select collaborator authority:</div>
        <div>
          <AuthoritySelect />
        </div>
      </div>
      <button onClick={submitEmail}>Collaborate!</button>
    </div>
  );
};

export default CollaboratorForm;
