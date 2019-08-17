const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const PORT = process.env.PORT || 3000;
const routes = require("./routes");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const dbase = "project-to-do";

app.use(express.static(path.join(__dirname, "public"), { extensions: ['html', 'htm'] }));

app.use(routes);

mongoose
  .connect(process.env.MONGODB_URI || `mongodb://localhost/${dbase}`, { useNewUrlParser: true })
  .then(() => {
    console.log("mongoDB linked")
    app.listen(PORT, () => {
      console.log("Server is live at http://localhost:3000");
    })
  });


