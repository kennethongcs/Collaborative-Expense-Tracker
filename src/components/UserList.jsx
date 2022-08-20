import React from 'react';

const IndividualUser = ({ user, whenUserIsClicked }) => {
  const onUserClick = () => {
    whenUserIsClicked(user);
    console.log(user.name);
  };
  return <li onClick={onUserClick}>{user.name}</li>;
};

export default function UserList({ retrievedUsers, whenUserIsClicked }) {
  return retrievedUsers.map((user) => {
    // onclick to add that users email into input box
    return <IndividualUser user={user} whenUserIsClicked={whenUserIsClicked} />;
  });
}
