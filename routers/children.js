const router = require("express").Router();
const db = require("../data/dbconfig.js");

router.get("/children/:community_id", (req, res) => {
    db("children")
    .where({ community_id: req.params.community_id })
    .then(children => {
        res.status(200).json(children);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

router.get("/children", (req, res) => {
  db("children")
    .then(children => {
      res.status(200).json(children);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/children", async (req, res) => {
  if (!req.body.name || !req.body.community_id) {
    res.status(400).json({ msg: "Please provide a name and community_id" });
  } else {
    db("children")
      .returning("id")
      .insert(req.body)
      .then(id => {
        db("children")
          .where({ id: id[0] })
          .then(children => {
            res.status(200).json(children[0]);
          })
          .catch(err => {
            res.status(500).json(err);
          });
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
});

module.exports = router;
