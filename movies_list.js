// array to store movie names
module.exports.bestMovies = () => {
  const movies = [
    {
      name: "F9",
      releaseDate: "June 25, 2021",
      language: "English",
      cast: [
        "Vin Diesel",
        "Michelle Rodriguez",
        "Tyrese Gibson",
        'Chris "Ludacris" Bridges'
      ],
      genre: ["Adventure", "Action", "Crime"],
      director: "Justin Lin",
      runtime: "2h 25m"
    },
    {
      name: "Palmer",
      releaseDate: "Jan 29, 2021",
      language: "English",
      cast: [
        "Justin Timberlake",
        "Juno Temple",
        "Alisha Wainwright",
        "June Squibb"
      ],
      genre: ["Drama"],
      director: "Fisher Stevens",
      runtime: "1h 51m"
    },
    {
      name: "In the Heights",
      releaseDate: "June 10, 2021",
      language: "English",
      cast: ["Anthony Ramos", "Corey Hawkins. Leslie Grace", "Melissa Barrera"],
      genre: ["Musical"],
      director: "Jon M. Chu",
      runtime: "2h 23m"
    },
    {
      name: "Nobody",
      releaseDate: "March 26, 2021",
      language: "English",
      cast: ["Bob Odenkirk", "Connie Nielsen", "RZA", "Aleksei Serebryakov"],
      genre: ["Mystery & Thriller", "Comedy", "Action"],
      director: "Ilya Naishuller",
      runtime: "1h 32m"
    },
    {
      name: "Night of the Kings",
      releaseDate: "February 26, 2021",
      language: "French",
      cast: ["Bakary Koné", "Issaka Sawadogo", "Steve Tientcheu"],
      genre: ["Drama"],
      director: "Philippe Lacôte",
      runtime: "1h 33m"
    },
    {
      name: "No Sudden Move",
      releaseDate: "July 1, 2021",
      language: "English",
      cast: ["Don Cheadle", "Benicio Del Toro", "David Harbour", "Jon Hamm"],
      genre: ["Mystery & Thriller", "Crime", "Drama"],
      director: "Steven Soderbergh",
      runtime: "1h 30m"
    },
    {
      name: "Stowaway",
      releaseDate: "Apr 22, 2021",
      language: "English",
      cast: [
        "Anna Kendrick",
        "Daniel Dae Kim",
        "Toni Collette",
        "Shamier Anderson"
      ],
      genre: ["Sci-Fi", "Drama", "Mystery & Thriller"],
      director: "Joe Penna",
      runtime: "1h 56m"
    },
    {
      name: "Riders of Justice",
      releaseDate: "May 14, 2021",
      language: "Danish",
      cast: [
        "Mads Mikkelsen",
        "Nikolaj Lie Kaas",
        "Andrea Heick Gadeberg",
        "Lars Brygmann"
      ],
      genre: ["Mystery & Thriller", "Comedy", "Action"],
      director: "Anders Thomas Jensen",
      runtime: "1h 56m"
    },
    {
      name: "Percy vs Goliath",
      releaseDate: "April 30, 2021",
      language: "English",
      cast: ["Peter Stebbings"],
      genre: ["Drama", "Biography"],
      director: "Clark Johnson",
      runtime: "1h 40m"
    },
    {
      name: "My Salinger Year",
      releaseDate: "March 5, 2021",
      language: "English",
      cast: [
        "Margaret Qualley",
        "Sigourney Weaver",
        "Douglas Booth",
        "SeÃ¡na Kerslake"
      ],
      genre: ["Drama"],
      director: "Philippe Falardeau",
      runtime: "1h 41m"
    }
  ];
  return movies;
};