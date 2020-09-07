const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const mongoose = require("mongoose");
const { Genre } = require("../models/genremodel");
const { Movie, validateMovie } = require("../models/moviemodel");

//HTTP get
router.get("/", async (req, res) => {
  const movies = await Movie.find().sort("name");
  res.send(movies);
});

router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie)
    return res
      .status("404")
      .send(`The movie with given Id ${req.params.id} not found`);
  res.send(movie);
});

//HTTP post
router.post("/", auth, async (req, res) => {
  const result = validateMovie(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid Genre");

  let movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  movie = await movie.save();
  res.send(movie);
});

//HTTP put
router.put("/:id", auth, async (req, res) => {
  const result = validateMovie(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid Genre");

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    },
    {
      new: true,
    }
  );

  if (!movie)
    return res.status("404").send(`The movie with given Id not found`);
  res.send(movie);
});

//HTTP delete
router.delete("/:id", auth, async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);
  if (!movie)
    return res
      .status("404")
      .send(`The movie with given Id ${req.params.id} not found`);
  res.send(movie);
});

module.exports = router;
