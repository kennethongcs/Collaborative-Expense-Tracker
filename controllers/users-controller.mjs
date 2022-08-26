import jsSHA from 'jssha';
import sequelizePackage from 'sequelize';

const { Sequelize } = sequelizePackage;
const SALT = process.env.SALT_PASSWORD;

const getHashSalted = (input) => {
  // create new SHA object
  const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
  // create an unhashed cookie string based on user ID and salt
  const unhashedString = `${input}-${SALT}`;

  // generate a hashed cookie string using SHA object
  shaObj.update(unhashedString);

  return shaObj.getHash('HEX');
};

export default function initUsersController(db) {
  const signup = async (req, res) => {
    const {
      firstName, lastName, password, email,
    } = req.body;

    try {
      const user = await db.User.findOne({
        where: {
          email,
        },
      });
      console.log('user', user);

      if (!user) {
        const hashedPassword = getHashSalted(password);
        console.log('hashed password', hashedPassword);

        const newUser = {
          email,
          firstName,
          lastName,
          password: hashedPassword,
        };

        const userNew = await db.User.create(newUser);

        res.send({
          email: userNew.email,
        });
      } else {
        res.status(409).send({
          error: 'The email address is already in use.',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const save = async (req, res) => {
    const {
      firstName, lastName, email, id,
    } = req.body;

    try {
      const user = await db.User.findOne({
        where: {
          id,
        },
      });
      console.log('user', user);

      if (user) {
        user.email = email;
        user.firstName = firstName;
        user.lastName = lastName;

        await user.save();

        res.send({
          email,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await db.User.findOne({
        where: {
          email,
        },
      });

      const hashedPassword = getHashSalted(password);

      if (hashedPassword === user.password) {
        const unhashedCookieString = `${user.id}-${SALT}`;
        const hashedCookieString = getHashSalted(unhashedCookieString);
        res.cookie('loggedInHash', hashedCookieString);

        const loggedInUser = {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        };

        res.cookie('user', JSON.stringify(loggedInUser));

        // const userWorkspace = await db.Workspace.findOne({
        //   include: {
        //     model: db.User,
        //     where: {
        //       id: user.id,
        //     },
        //     attributes: [],
        //   },
        //   attributes: ['id', 'name', 'purpose'],
        //   order: [['id', 'DESC']],
        // });

        // if (userWorkspace) {
        //   res.cookie('workspace', JSON.stringify(userWorkspace));
        // }
        const userWorkspace = null;

        const result = {
          user: loggedInUser,
          workspace: userWorkspace,
        };

        res.send(result);
      } else {
        res.status(401).send({
          error: 'The login information is incorrect.',
        });
      }
    } catch (err) {
      console.log(`Login error: ${err}`);
    }
  };

  const logout = async (req, res) => {
    try {
      res.clearCookie('loggedInHash');
      res.clearCookie('user');
      res.clearCookie('workspace');

      res.json({ redirect: '/' });
    }
    catch (error) {
      console.log(error);
    }
  };

  const retrieveusers = async (req, res) => {
    const { user } = req.body;
    const input = user.toLowerCase();
    console.log(input);
    try {
      const { Op } = Sequelize;
      const users = await db.User.findAll({
        where: {
          email: {
            [Op.like]: `${input}%`,
          },
        },
      });
      console.log(users);
      res.send(users);
    } catch (err) {
      console.log(`Error retrieving users: ${err}`);
    }
  };

  const verify = async (req, res) => {
    const { user } = req.cookies;
    const { loggedInHash } = req.cookies;

    const unhashedCookieString = `${user.id}-${SALT}`;
    const hashedCookieString = getHashSalted(unhashedCookieString);

    if (loggedInHash === hashedCookieString) {
      res.json(user);
    } else {
      res.clearCookie('loggedInHash');
      res.clearCookie('user');
      res.clearCookie('workspace');
      res.json({ redirect: '/' });
    }
  };

  return {
    signup, save, login, logout, retrieveusers, verify,
  };
}
