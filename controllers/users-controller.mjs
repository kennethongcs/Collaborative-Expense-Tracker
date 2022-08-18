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
    const { username } = req.body;
    const { password } = req.body;
    const { email } = req.body;

    const hashedPassword = getHashSalted(password);

    try {
      // create new user
      const user = await db.User.create({
        where: {
          firstname: firstname,
          lastname: lastname,
          password: hashedPassword,
          email: email,
        },
      });
      res.send({
        user: user.username,
      });
    } catch (err) {
      console.log(`create user err: ${err}`);
    }
  };

  const login = async (req, res) => {
    const { email } = req.body;
    const { password } = req.body;

    try {
      const userDetails = await db.User.findOne({
        where: {
          email: email,
        },
      });

      const hashedPassword = getHashSalted(hashedPassword);

      if (hashedPassword === userDetails.password) {
        res.send({
          user: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
        });
      }
    } catch (err) {
      console.log(`Login error: ${err}`);
    }
  };

  return { signup, login };
}
