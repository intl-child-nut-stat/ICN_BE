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

  router.post("/community",  async (req, res) => {
    if (!req.body.community || !req.body.country_id) {
      res.status(400).json({ msg: "Please provide a community and country_id" });
    } else {
      let community = await db("community").where({ community: req.body.community} ).first();
  
      if (community) {
        res.status(200).json( { error: "Community already exist" } );
      } else {
        db("community")
        .returning('id')
        .insert(req.body)
        .then(id => {
          db("community")
            .where({ id })
            .then(community => {
              console.log(community)
              res.status(200).json(community);
            })
            .catch(err => {
              console.log(`I am in catch`, err)
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

  router.get("/community/:id", (req, res) => {
    db("community")
      .where({ id: req.params.id })
      .first()
      .then(community => {
        if (community) {
          res.status(200).json(community);
        } else {
          res.status(404).json({ message: "no such community started yet" });
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

module.exports = router;