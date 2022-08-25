import jsSHA from 'jssha';
import sequelizePackage from 'sequelize';

const { Sequelize } = sequelizePackage;

const getHashSalted = (input) => {
  // create new SHA object
  const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
  const SALT = process.env.SALT_PASSWORD;
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
    }
    catch (error) {
      console.log(error);
    }
  };

  const login = async (req, res) => {
    const { email } = req.body;
    const { password } = req.body;

    try {
      const user = await db.User.findOne({
        where: {
          email,
        },
      });

      const hashedPassword = getHashSalted(password);

      if (hashedPassword === user.password) {
        const loggedInUser = {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        };

        res.cookie('user', JSON.stringify(loggedInUser));

        res.send(loggedInUser);
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
      const user = await db.User.findOne({
        where: {
          id: req.cookies.userId,
        },
      });
      console.log('user', user);

      if (user) {
        res.clearCookie('user');
        res.clearCookie('workspace');

        res.send({ id: user.id });
      } else {
        res.status(404).send({
          error: 'Logout failed.',
        });
      }
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

  return {
    signup, save, login, logout, retrieveusers,
  };
}
