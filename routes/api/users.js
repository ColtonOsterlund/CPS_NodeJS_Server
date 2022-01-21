const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  createUser,
  userExistsByEmail,
  readUserByEmail,
  blacklistToken,
} = require('../../database/users');
const { authenticateToken } = require('../../middleware/authentication');

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
  const { iat, exp, ...user } = req.user;
  res.status(200).json(user);
});

router.post('/', async (req, res) => {
  if (
    req.body?.email === undefined ||
    req.body?.password === undefined ||
    req.body?.firstName === undefined ||
    req.body?.lastName === undefined ||
    req.body?.mainAddress === undefined ||
    req.body?.secondaryAddress === undefined === undefined ||
    req.body?.city === undefined ||
    req.body?.province === undefined ||
    req.body?.country === undefined ||
    req.body?.zipCode === undefined ||
    req.body?.phone === undefined
  ) {
    return res.status(400).json({ message: 'Missing fields in request body' });
  }

  // TODO: Validation

  const emailExists = await userExistsByEmail(req.body.email);
  if (emailExists) {
    return res.status(409).json({ message: 'The email is already in use' });
  }

  const saltRounds = 10;
  bcrypt.hash(req.body.password, saltRounds, async (error, hash) => {
    if (error) throw error;

    const user = {
      email: req.body.email,
      hash: hash,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      mainAddress: req.body.mainAddress,
      secondaryAddress: req.body.secondaryAddress,
      city: req.body.city,
      province: req.body.province,
      country: req.body.country,
      zipCode: req.body.zipCode,
      phone: req.body.phone,
    };

    const result = await createUser(user);
    // TODO: Respond with error message if cannot create user in DB
  });

  res.status(201).json({ message: 'Successfully created user' });
});

router.post('/login', async (req, res) => {
  if (!req.body?.email || !req.body?.password) {
    return res.status(400).json({ message: 'Missing fields in request body' });
  }

  const user = await readUserByEmail(req.body.email);
  const { password, ...payload } = user;

  if (Object.keys(user).length > 0) {
    try {
      bcrypt.compare(req.body.password, password, (error, result) => {
        if (error) throw error;

        if (result) {
          const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
            expiresIn: '8670h',
          });
          return res.status(200).json({ message: 'Logged in', token: token });
        }

        return res
          .status(400)
          .json({ message: 'Incorrect email and/or password' });
      });
    } catch (error) {
      console.error(error);
      return res
        .status(400)
        .json({ message: 'Incorrect email and/or password' });
    }
  } else {
    return res.status(400).json({ message: 'Incorrect email and/or password' });
  }
});

router.get('/logout', authenticateToken, async (req, res) => {
  const result = await blacklistToken(req.token, req.user.exp);
  res.status(200).json({ message: 'Logged out' });
});


module.exports = router;
