import sequelizePackage from 'sequelize';

const { Sequelize } = sequelizePackage;

export default function initWorkspacesController(db) {
  const create = async (req, res) => {
    const { name, purpose, userId } = req.body;

    try {
      const newWorkspace = {
        name,
        purpose,
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

  // add inputted user into w/s as collaborator
  const joinWorkspace = async (req, res) => {
    const { userId } = req.cookies;
    // retrieve latest w/s from workspace table
    const latestWS = db.Workspace.findOne({
      include: {
        model: db.User,
        where: {
          id: userId,
          order: [['createdAt', 'DESC']],
        },
      },
    });
    console.log(latestWS);
    // add inputted user into M-M user_workspace table as viewing
  };

  return { create, joinWorkspace };
}
