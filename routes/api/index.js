const router = require("express").Router();
const userRoutes = require("./userRoutes");
const taskRoutes = require("./taskRoutes");

router.use("/user", userRoutes);
router.use("/task", taskRoutes);

router.use((req,res,next) => {
  res.status(404).json({message: "endpoint not found"})
})

module.exports = router;