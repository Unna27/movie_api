const port = process.env.PORT || 8080;
const mongodb_uri =
  process.env.CONNECTION_URI || 'mongodb://localhost:27017/myFlixDB';

export { port, mongodb_uri };
