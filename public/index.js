const express = require('express'),
      morgan = require('morgan'),
      bodyParser = require('body-parser'),
      uuid = require('uuid');
const app = express();

let topMovies = [
  {
    id: 1,
    movie:{
      title: 'Grandma\'s Boy',
      description: 'A thirty-five-year-old video game tester has to move in with his grandma and her two old lady roommates.'
    },
    director: {
      name:'Nicholaus Goossenn',
      birthday: 'Born: August 18, 1978, Los Angeles, CA'
    },
    genre: 'Comedy',
    
  },
  { 
    id: 2,
    movie:{ 
      title:'The Matrix Trilogy',
      description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.'
  },
    director: {
      name: 'Lana Wachowski, Lilly Wachowski',
      birthday: 'Lana Wachowski - Born: June 21, 1965 (age 55 years), Chicago, IL, \nLily Wachowski - Born: August 18, 1978, Los Angeles, CA',
    },
    genre: 'Action',
    
  },
  {
    id: 3,
    movie: {
      title:'John Wick',
      description: 'An ex-hit-man comes out of retirement to track down the gangsters that killed his dog and took everything from him.'
    },
    director: {
      name:'Chad Stahelski, David Leitch(uncredited)',
      birthday: 'C.S. - 09.20.1968, D.L. - 11.16.1975',
    },
    genre: 'Action',
    
  },
  {
    id: 4,
    movie: {
      title: 'Cloud Atlas',
      description: 'An exploration of how the actions of individual lives impact one another in the past, present and future, as one soul is shaped from a killer into a hero, and an act of kindness ripples across centuries to inspire a revolution. '
    },
    director: {
      name:'Lana Wachowski, Lilly Wachowski, Tom Tykwer',
      birthday: 'Lana Wachowski - Born: June 21, 1965 (age 55 years), Chicago, IL, \nLily Wachowski - Born: August 18, 1978, Los Angeles, CA, \nTom Tykwer - Born: May 23, 1965 (age 55 years), Wuppertal, Germany',
    },
    genre: 'Sci-Fi, Drama',
    
  },
  {
    id:5,
    movie: {
      title:'Goldeneye',
      description: 'Years after a friend and fellow 00 agent is killed on a joint mission, a secret space based weapons program known as "GoldenEye" is stolen. James Bond sets out to stop a Russian crime syndicate from using the weapon.'
    },
    director: {
      name: 'Martin Campbell',
      birthday: 'Born: October 24, 1943 (age 76 years), Hastings, New Zealand'
    },
    genre: 'Action',
    
  },
  {
    id:6,
    movie: {
      title: 'The Witcher',
      description: 'Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.'
    },
    director: {
      name: 'Lauren Schmidt',
      birthday: 'Born: August 1, 1978 Westerville, Ohio'
    },
    genre: 'Fantasy',
    
  },
  {
    id:7,
    movie: {
      title:'Scott Pilgrim vs. The World',
      description:'Scott Pilgrim must defeat his new girlfriend\'s seven evil exes in order to win her heart. '
    },
    director: {
      name: 'Edgar Wright',
      birthday: ' Born: April 18, 1974 in Poole, Dorset, England, UK '
    },
    genre: 'Adventure',
    
  },
  {
    id:8,
    movie: {
      title:'Youth In Revolt',
      description: 'While his trailer trash parents teeter on the edge of divorce, Nick Twisp sets his sights on dream girl Sheeni Saunders, hoping that she\'ll be the one to take away his virginity. '
    },
    director: {
      name: 'Miguel Arteta',
      birthday: 'Born: August 29, 1965, San Juan, Puerto Rico'
    },
    genre:  'Comedy',
    
  },
  {
    id:9,
    movie: {
      title:'Pan\'s Labyrinth',
      description: ' In the Falangist Spain of 1944, the bookish young stepdaughter of a sadistic army officer escapes into an eerie but captivating fantasy world. '
    },
    director: {
      name: 'Guillermo del Toro',
      birthday: '10.09.1964',
    }, 
    genre: 'Fantasy, Drama',
    
  },
  {
    id:10,
    movie: {
      title:'The Avengers',
      description: 'Earth\'s mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.'
    },
    director: {
      name: '‎Joss Whedon',
      birthday: '06.23.1964'
    },
    genre: 'Adventure, Sci-Fi',
    
  }
];

// use express to serve documentation.html
app.use(express.static('public'));

// use morgan to log requests
app.use(morgan('common'));

// error handling
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send('Something is definitely not right');
});
// GET request for ALL movies
app.get('/topMovies', (req, res) => {
  res.json(topMovies);
});

// Get request for a single movie by title
app.get('/topMovies/:movie/:title', (req, res) => {
    res.json(topMovies.find( (topMovie) =>
    {return topMovies.title === req.params.title}))
});

// GET request for movie description by name/movie
app.get('/topMovies/:movie/:description', (req, res) => {
  res.json(topMovies.find( (topMovie) =>
  {return topMovies.description === req.params.description}))
});


// listenening for requests
app.listen(8080, () => {
    console.log('My movie app is hearing things on Port 8080.');
});
