const router = require("express").Router();
const db = require("../data/dbconfig.js");


router.get("/screening" ,(req, res) => {
    db("screening")
      .then(screening => {
        res.status(200).json(screening);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });



router.post("/screening", async (req, res) => {
    let screening = req.body
  if (!screening.date || !screening.age || !screening.height||!screening.weight||!screening.children_id) {
    res.status(400).json({ msg: "Please provide a date,age,height,weight and children_id" });
  } else {
    db("screening")
      .returning("id")
      .insert(req.body)
      .then(id => {
        db("screening")
          .where({ id: id[0] })
          .then(screening => {
            res.status(200).json(screening[0]);
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