const router = require("express").Router();
const path = require("path");
const apiRoutes = require("./api");

router.use("/api", apiRoutes);

router.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "/index.html"));
})

router.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "../public/lost.html"));
})

module.exports = router;