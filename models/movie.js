import mongoose from 'mongoose';

const movieSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  genres: {
    name: String,
    description: String
  },
  director: {
    name: String,
    bio: String,
    birthDate: Date,
    deathDate: Date
  },
  imageURL: String,
  featured: Boolean,
  rating: Number,
  releaseDate: Date,
  language: String,
  runtime: String,
  cast: [String]
});

/**
 * Business logic of movie Schema
 * @exports {{  title: String,
 *   description: String,
 *   genres: {
 *     name: String,
 *     description: String
 *   },
 *   director: {
 *     name: String,
 *     bio: String,
 *     birthDate: Date,
 *     deathDate: Date
 *   },
 *   imageURL: String,
 *   featured: Boolean,
 *   rating: Number,
 *   releaseDate: Date,
 *   language: String,
 *   runtime: String,
 *   cast: Array}} Movie
 */

export const Movie = mongoose.model('Movie', movieSchema);
