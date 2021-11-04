// load express and morgan framework
const express = require("express"),
  morgan = require("morgan");
const app = express();

// load list of movies module
const moviesFile = require("./movies_list.js");

// use morgan framework to use logging function
app.use(morgan("common"));

// use http method GET to send response
app.get("/", (req, res) => {
  res.send("Welcome to my Movie API!");
});

app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", {
    root: __dirname
  });
});

app.get("/movies", (req, res) => {
  res.json(moviesFile.bestMovies());
});

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// make the app listen at port 8080
app.listen(8080, () => {
  console.log("Movie_API app listening on port 8080");
});
