//Story starts with here
const connectToMongo = require("./db"); //Accesing the DataBase file
const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000; //We can simply choose on which port we want to run

app.use(cors());

connectToMongo(); //This funciton is from db.js file bcoz we export from there with this name so we can use it here

app.use(express.json());

//Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`iNotebook Backend listening at http://localhost:${port}`);
});
