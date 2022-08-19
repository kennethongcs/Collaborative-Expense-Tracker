import React from 'react';

const CategoryForm = ({ workspace }) => (
  <div>
    <div>
      Add categories for workspace Id:
      {' '}
      { workspace.id }
    </div>
    <div>Probably a search bar and list of added categories</div>
    <div>Might show default categories</div>
  </div>
);

export default CategoryForm;
