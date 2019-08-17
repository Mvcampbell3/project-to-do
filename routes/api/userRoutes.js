const router = require("express").Router();
const db = require("../../models");

router.get("/all", (req, res, next) => {
  db.User.find()
    .then(tasks => res.status(200).json(tasks))
    .catch(err => res.status(500).json(err))
})

router.use((req,res,next) => {
  res.status(404).json({message: "endpoint not found"})
})

module.exports = router;