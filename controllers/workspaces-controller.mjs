import sequelizePackage from 'sequelize';
import { Op } from 'sequelize';

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
      await db.UserWorkspace.create(newUserWorkspace);

      const selectedWorkspace = {
        id: workspace.id,
        name: workspace.name,
        purpose: workspace.purpose,
      };

      res.cookie('workspace', JSON.stringify(selectedWorkspace));

      res.send(selectedWorkspace);
    } catch (err) {
      console.log(`create workspace err: ${err}`);
    }
  };

  // add inputted user into w/s as collaborator
  const joinWorkspace = async (req, res) => {
    const { email, workspaceId } = req.body;
    console.log(`email: ${email}, workspaceId: ${workspaceId}`);
    // retrieve userId
    try {
      const userId = await db.User.findOne({
        where: {
          email,
        },
      });
      console.log('userid: ', userId.id);
      // get workspace authority
      const workspaceAuth = await db.WorkspaceAuthority.findOne({
        where: {
          type: 'Viewing',
        },
      });
      // add inputted user into M-M user_workspace table as viewing
      await db.UserWorkspace.create({
        userId: userId.id,
        workspaceId,
        workspaceAuthorityId: workspaceAuth.id,
      });

      res.send('User added successfully');
    } catch (err) {
      console.log(`Error adding user to existing w/s: ${err}`);
    }
  };

  const NUM_OF_WORKSPACES = 8;

  const retrieve = async (req, res) => {
    const { userId, limit = NUM_OF_WORKSPACES } = req.query;

    try {
      // get workspaces for this user
      const userWorkspaces = await db.Workspace.findAll({
        include: {
          model: db.User,
          where: {
            id: userId,
          },
          attributes: [],
        },
        attributes: ['id'],
        order: [['id', 'DESC']],
        limit,
      });

      // put workspace id into array
      const workspaceIds = userWorkspaces.map((workspace) => workspace.id);

      // add more details to workspaces for this user
      const workspaces = await db.Workspace.findAll({
        include: {
          model: db.User,
          attributes: ['id', 'firstName', 'lastName'],
          through: {
            attributes: ['workspaceAuthorityId'],
          },
        },
        where: { id: { [Op.in]: workspaceIds } },
        attributes: ['id', 'name', 'purpose'],
        order: [['id', 'DESC']],
        limit,
      });

      res.send(workspaces);
    } catch (err) {
      console.log(`retrieve workspace err: ${err}`);
    }
  };

  return { create, retrieve, joinWorkspace };
}
