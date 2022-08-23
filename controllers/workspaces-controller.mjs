export default function initWorkspacesController(db) {
  const create = async (req, res) => {
    const { name, purpose, userId } = req.body;

    try {
      const newWorkspace = {
        name, purpose,
      };

      // create new workspace
      const workspace = await db.Workspace.create(newWorkspace);

      // get workspace authority
      const workspaceAuth = await db.WorkspaceAuthority.findOne({
        where: {
          type: 'Editing',
        },
      });

      const newUserWorkspace = {
        workspaceId: workspace.id,
        userId,
        workspaceAuthorityId: workspaceAuth.id,
      };

      // add user to new workspace
      const userWorkspace = await db.UserWorkspace.create(newUserWorkspace);

      res.send({
        workspace: workspace.id,
        userWorkspace: userWorkspace.id,
      });
    } catch (err) {
      console.log(`create workspace err: ${err}`);
    }
  };

  return { create };
}
