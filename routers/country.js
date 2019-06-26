const router = require("express").Router();

const { authenticate } = require("../auth/authentication.js");

const db = require("../data/dbconfig.js");

router.get("/countrylist", (req, res) => {
  db("country")
    .then(country => {
      res.status(200).json(country);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/country", (req, res) => {
  db("country")
    .then(country => {
      res.status(200).json(country);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/country/:id", authenticate, (req, res) => {
  const id = req.params.id;

  db("country")
    .where({ id })
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
    let country = await db("country")
      .where({ country: req.body.country })
      .first();

    if (country) {
      res.status(200).json({ error: "Country already exist" });
    } else {
      db("country")
        .returning("id")
        .insert(req.body)
        .then(id => {
          db("country")
            .where({ id: id[0] })
            .then(country => {
              console.log(country);
              res.status(200).json(country);
            })
            .catch(err => {
              res.status(500).json(err);
            });
        })
        .catch(err => {
          console.log("I am in error", err);
          res.status(500).json(err);
        });
    }
  }
});

router.delete("/country/:id", (req, res) => {
  const countryid = req.params.id;
  db("country")
    .where({ id: countryid })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(200).json({
          message: `${count} ${count > 1 ? "records" : "record"} deleted`
        });
      } else {
        res.status(400).json({ message: "No such country exists" });
      }
    })

    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
