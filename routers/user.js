const router = require("express").Router();
const Users = require("./usermodel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../helpers/secrets.js");




router.post("/register",async (req, res) => {
  let user = req.body;

  if ((!user.username && !user.password) && (!user.country_id || defined (user.isAdmin))) {
    res.status(404).json({
      error: "You need to send username, password and isAdmin/country_id"
    });
  }

  let foundUser = await Users.findBy( { username: user.username } ).first();
    
  if (foundUser) { 
      res.status(200).json( { error: "User already exist" } );
  } else {
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
  
    Users.add(user)
      .then(saved => {
        res.status(201).json({
          id: saved[0].id,
          isAdmin: saved[0].isAdmin,
          username: saved[0].username
        });
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
        const token = generateToken(user);

        res.status(200).json({
          userId: user.id,
          isAdmin: user.isAdmin,
          token
        });
      } else {
        res.status(401).json({ message: "Your username/password is incorrect" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.send('error logging out');
      } else {
        res.send('good bye');
      }
    });
  }
});



function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };
  const options = {
    expiresIn: "1d"
  };
  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
