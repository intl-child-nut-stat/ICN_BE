const router = require("express").Router();

const db = require("../data/dbconfig.js");

router.get("/community", (req, res) => {
    console.log("i am here");
    db("community")
      .then(community => {
        res.status(200).json(community);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

  module.exports = router;