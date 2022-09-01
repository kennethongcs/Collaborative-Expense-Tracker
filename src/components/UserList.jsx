import React from 'react';

const IndividualUser = ({ user, whenUserIsClicked }) => {
  const onUserClick = () => {
    whenUserIsClicked(user);
    console.log(`added: ${user.email}`);
  };
  // TODO add uuid for key in prop
  return <li onClick={onUserClick}>{user.email}</li>;
};

export default function UserList({ retrievedUsers, whenUserIsClicked }) {
  return retrievedUsers.map((user) =>
    // onclick to add that users email into input box
    (
      <IndividualUser
        key={user.id}
        user={user}
        whenUserIsClicked={whenUserIsClicked}
      />
    ));
}
