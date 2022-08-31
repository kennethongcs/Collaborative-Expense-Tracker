import { Op } from 'sequelize';

export default function initStatisticsController(db) {
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
      console.log(`retrieve statistics err: ${err}`);
    }
  };

  return { retrieve };
}
