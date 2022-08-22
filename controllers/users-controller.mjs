import jsSHA from 'jssha';

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
      firstname, lastname, password, email,
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
          firstName: firstname,
          lastName: lastname,
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
        res.send({
          id: user.id,
          user: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
        });
      } else {
        res.status(401).send({
          error: 'The login information is incorrect.',
        });
      }
    } catch (err) {
      console.log(`Login error: ${err}`);
    }
  };

  return { signup, login };
}
