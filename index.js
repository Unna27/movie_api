// load express and morgan framework
const express = require("express"),
  morgan = require("morgan"),
  bodyParser = require("body-parser"),
  uuid = require("uuid"); // for unique identification number generation

const app = express();

// load list of movies module
const moviesFile = require("./movies_list.js");

// use morgan framework to use logging function
app.use(morgan("common"));
app.use(bodyParser.json());
//serve static files in public folder
app.use(express.static("public"));

// use http method GET to send response
app.get("/", (req, res) => {
  res.send("Welcome to my Movie API!");
});

/*
app.get("/documentation", (req, res) => {
res.sendFile("public/documentation.html", {
root: __dirname
});
});
*/
// request to return a list of all movies
app.get("/movies", (req, res) => {
  res.json(moviesFile.bestMovies());
});

// request to return details of a single movie by its title
app.get("/movies/:title", (req, res) => {
  let movies = moviesFile.bestMovies();
  res.json(
    movies.find(movie => {
      return movie.title === req.params.title;
    })
  );
});

// request to return general description of a single movie by its title
app.get("/movies/:title/genre", (req, res) => {
  let movies = moviesFile.bestMovies();
  let movie = movies.find(movie => {
    return movie.title === req.params.title;
  });
  if (movie) {
    console.log(req.params.title + " movie found");
    let genre = Object.values(movie.genre); //Object.values() filters out object's keys and keeps the values alone returned as a new array
    console.log(genre);
    res
      .status(201)
      .send(
        "General Description of the movie " + req.params.title + ": " + genre
      );
  } else {
    console.log(req.params.title + "movie not found");
    res
      .status(404)
      .send("Movie with the title " + req.params.title + "was not found");
  }
});

// request to return details of a director by name
app.get("/directors/:name", (req, res) => {
  res.send("Director details will be listed...");
});

// request to add a new user
app.post("/users", (req, res) => {
  let newUser = req.body;

  if (!newUser.name) {
    const message = "Missing name in request body";
    res.status(400).send(message);
  } else {
    newUser.id = uuid.v4();
    res.status(201).send("User: " + newUser.name + " added");
  }
});

// request to update email of the user
app.put("/users/:name/:email", (req, res) => {
  res.send("User email updated");
});

// request to add a movie to the favorite list
app.post("/users/:name/:movietitle", (req, res) => {
  res.send("Added favorite movie to the list");
});

// request to remove a movie from favorite list
app.delete("/users/:name/:movietitle", (req, res) => {
  res.send("Removed favorite movie from the list");
});

// request to delete a user by id
app.delete("/users/:id", (req, res) => {
  res.send("Deleted user details");
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
