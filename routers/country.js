const router = require("express").Router();

const { authenticate } = require("../auth/authentication.js");


const db = require("../data/dbconfig.js");

router.get("/countrylist" ,(req, res) => {
  db("country")
    .then(country => {
      res.status(200).json(country);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/country", (req, res) => {
  const isAdmin = req.session.user.isAdmin;
  const filter = {};
  if (!isAdmin) {
    filter.id = req.session.user.country_id;
  }
  db("country")
    .where({filter})
    .then(country => {
      res.status(200).json(country);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post("/country", authenticate, async (req, res) => {
  if (!req.body.country) {
    res.status(400).json({ msg: "Please provide a country" });
  } else {
    let country = await db("country").where({ country: req.body.country } ).first();

    if (country) {
      res.status(200).json( { error: "Country already exist" } );
    } else {
      db("country")
      .insert(req.body)
      .then(ids => {
        db("country")
          .where({ id: ids[0] })
          .first()
          .then(country => {
            res.status(200).json(country);
          })
          .catch(err => {
            res.status(500).json(err);
          });
      })
      .catch(err => {
          console.log('I am in error', err)
        res.status(500).json(err);
      });
    }
  }
});

module.exports = router;
