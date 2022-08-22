import React, { useState } from 'react';

const CollaboratorForm = () => (
  // const[collaborator, setCollaborator] = useState('');
  <>
    <div>Add collaborator page</div>
    <input type="text" placeholder="collaborators email / username" />
    <button>Collaborate!</button>
    {/* upon input, query db for users with that email / username */}
  </>
);

export default CollaboratorForm;
