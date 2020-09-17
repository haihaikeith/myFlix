const express = require('express'),
      morgan = require('morgan');
const app = express();

let topMovies = [
  {
    title: 'Grandma\'s Boy',
    director: 'Nicholaus Goossenn'
  },
  { title: 'The Matrix Trilogy',
    director: 'The Wachowski Sisters'
  },
  {
    title: 'John Wick',
    director: 'Chad Stahelski, David Leitch'
  },
  {
    title: 'Starship Troopers',
    director: 'Paul Verhoeven'
  },
  {
    title: 'Goldeneye',
    director: 'Martin Campbell'
  },
  {
    title: 'The Witcher',
    director: 'Lauren Schmidt'   
  },
  {
    title: 'Scott Pilgrim vs. The World',
    director: 'Edgar Wright'
  },
  {
    title: 'Youth In Revolt',
    director: ' Miguel Arteta'
  },
  {
    title: 'Pan\'s Labyrinth',
    director: 'Guillermo del Toro'
  },
  {
    title: 'The Avengers',
    director: '‎Joss Whedon'
  }
];

// use express to serve documentation.html
app.use(express.static('public'));

// use morgan to log requests
app.use(morgan('common'))

// GET requests
app.get('/', (req, res) => {
    res.send('Welcome to my film club!');
});

app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', {root: __dirname });
});

app.get('/movies', (req, res) => {
    res.json(topMovies);
});

// listenening for requests
app.listen(8080, () => {
    console.log('My movie app is hearing things on Port 8080.');
});
