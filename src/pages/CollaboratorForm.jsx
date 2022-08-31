/* eslint-disable arrow-body-style */
/* eslint-disable react/self-closing-comp */
import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import EditOffIcon from '@mui/icons-material/EditOff';
import EditIcon from '@mui/icons-material/Edit';
import Autocomplete from '@mui/material/Autocomplete';

const CollaboratorForm = ({ workspace }) => {
  const [retrievedUsers, setRetrievedUsers] = useState([]);
  const [collaborator, setCollaborator] = useState('');
  const [authority, setAuthority] = useState('');
  const [collaborators, setCollaborators] = useState([]);

  const workspaceId = workspace.id;

  // runs when any char is typed into "input box"
  const getCollaboratorName = (input) => {
    console.log(input);
    if (input !== '') {
      // axios to get user data from server
      axios
        .post('/retrieveusers', {
          user: input,
        })
        .then((res) => {
          const { data } = res;

          const retUsers = data.map((user) => {
            return { label: user.email, id: user.id };
          });
          setRetrievedUsers(retUsers);
        });
    }
  };

  const addCollaborators = (newCollaborator) => {
    const collaboratorList = [...collaborators];
    collaboratorList.push(newCollaborator);
    setCollaborators(collaboratorList);
  };

  // sends invitation email to invite to collaborate on workspace
  const submitEmail = (event) => {
    event.preventDefault();

    // console.log(`collaborator: ${collaborator.label}`);
    // console.log(`authority: ${authority}`);
    // console.log(`workspace id: ${workspaceId}`);
    // use workspaceId and add an existing user into your user_workspace table

    axios
      .post('/joinworkspace', {
        email: collaborator.label,
        workspaceId,
        authority,
      })
      .then((res) => {
        console.log(res);
        collaborator.auth = authority;
        addCollaborators({ user: collaborator });
      });
  };

  const AuthoritySelect = () => {
    return (
      <FormControl fullWidth margin="normal" required>
        <InputLabel id="editing-authority-label">Authority</InputLabel>
        <Select
          labelId="editing-authority-label"
          id="edit-authority-select"
          label="Authority"
          onChange={(event) => {
            setAuthority(event.target.value);
          }}
          value={authority}
        >
          <MenuItem value="Viewing">Viewing</MenuItem>
          <MenuItem value="Editing">Editing</MenuItem>
        </Select>
      </FormControl>
    );
  };

  const getAuthorityIcon = (auth) => {
    if (auth === 'Viewing') return (<EditOffIcon />);
    return (<EditIcon />);
  };

  const navigate = useNavigate();
  const handleNext = () => {
    navigate('/workspace/4');
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={8} md={5}>
          <Box
            sx={{
              mt: 8,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h5">
              Add Collaborators
            </Typography>
            <Box
              component="form"
              noValidate
              sx={{ mt: 1 }}
            >
              <Autocomplete
                disablePortal
                fullWidth
                id="collaboratorName"
                options={retrievedUsers}
                selectOnFocus
                clearOnBlur
                onChange={(event, value) => setCollaborator(value)}
                noOptionsText=""
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    autoFocus
                    margin="normal"
                    label="Collaborator Name"
                    onChange={(event) => {
                      getCollaboratorName(event.target.value);
                    }}
                  />
                )}
              />
              <AuthoritySelect />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 2 }}
                onClick={submitEmail}
              >
                Collaborate
              </Button>
              <List dense sx={{ width: '100%', maxWidth: 360 }}>
                {collaborators.map(({ user }) => {
                  const labelId = `checkbox-list-secondary-label-${user.id}`;
                  return (
                    <ListItem
                      key={user.id}
                      secondaryAction={getAuthorityIcon(user.auth)}
                      disablePadding
                    >
                      <ListItemButton>
                        <ListItemAvatar>
                          <Avatar>{user.label.charAt(0).toUpperCase()}</Avatar>
                        </ListItemAvatar>
                        <ListItemText id={labelId} primary={user.label} />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={6} sm={8} md={5}>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleNext}
          >
            Skip
          </Button>
        </Grid>
        <Grid item xs={6} sm={8} md={5}>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleNext}
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default CollaboratorForm;
