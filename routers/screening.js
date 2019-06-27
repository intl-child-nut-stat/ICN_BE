const router = require("express").Router();
const db = require("../data/dbconfig.js");

router.get("/screening/:children_id", (req, res) => {
    db("screening")
    .where({ children_id: req.params.children_id })
    .then(screening => {
        res.status(200).json(screening);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });


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

router.delete("/screening/:id", (req, res) => {
  const screenid = req.params.id;
  db("screening")
    .where({ id: screenid })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(200).json({
          message: `${count} ${count > 1 ? "records" : "record"} deleted`
        });
      } else {
        res.status(400).json({ message: "No such screening exists" });
      }
    })

    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/screening/:id", (req, res) => {
  db("screening")
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      if (count > 0) {
        res.status(200).json({
          message: `${count} ${count > 1 ? "screening" : "screening"} updated`
        });
      } else {
        res.status(400).json({ message: "no such screening exists" });
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err);
    });
});


module.exports = router;