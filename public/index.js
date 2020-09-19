const express = require('express'),
      morgan = require('morgan');
const app = express();

let topMovies = [
  {
    title: 'Grandma\'s Boy',
    director: {
      name:'Nicholaus Goossenn',
      birthday: 'Born: August 18, 1978, Los Angeles, CA'
    },
    genre: 'Comedy',
    description: 'A thirty-five-year-old video game tester has to move in with his grandma and her two old lady roommates.'
  },
  { title: 'The Matrix Trilogy',
    director: {
      name: 'Lana Wachowski, Lilly Wachowski',
      birthday: 'Lana Wachowski - Born: June 21, 1965 (age 55 years), Chicago, IL, \nLily Wachowski - Born: August 18, 1978, Los Angeles, CA',
    },
    genre: 'Action',
    description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers. '
  },
  {
    title: 'John Wick',
    director: {
      name:'Chad Stahelski, David Leitch(uncredited)',
      birthday: 'C.S. - 09.20.1968, D.L. - 11.16.1975',
    },
    genre: 'Action',
    description: 'An ex-hit-man comes out of retirement to track down the gangsters that killed his dog and took everything from him. '
  },
  {
    title: 'Cloud Atlas',
    director: {
      name:'Lana Wachowski, Lilly Wachowski, Tom Tykwer',
      birthday: 'Lana Wachowski - Born: June 21, 1965 (age 55 years), Chicago, IL, \nLily Wachowski - Born: August 18, 1978, Los Angeles, CA, \nTom Tykwer - Born: May 23, 1965 (age 55 years), Wuppertal, Germany',
    },
    genre: 'Sci-Fi, Drama',
    description: 'An exploration of how the actions of individual lives impact one another in the past, present and future, as one soul is shaped from a killer into a hero, and an act of kindness ripples across centuries to inspire a revolution. '
  },
  {
    title: 'Goldeneye',
    director: {
      name: 'Martin Campbell',
      birthday: 'Born: October 24, 1943 (age 76 years), Hastings, New Zealand'
    },
    genre: 'Action',
    description: 'Years after a friend and fellow 00 agent is killed on a joint mission, a secret space based weapons program known as "GoldenEye" is stolen. James Bond sets out to stop a Russian crime syndicate from using the weapon.'
  },
  {
    title: 'The Witcher',
    director: {
      name: 'Lauren Schmidt',
      birthday: 'Born: August 1, 1978 Westerville, Ohio'
    },
    genre: 'Fantasy',
    description: 'Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.'
  },
  {
    title: 'Scott Pilgrim vs. The World',
    director: {
      name: 'Edgar Wright',
      birthday: ' Born: April 18, 1974 in Poole, Dorset, England, UK '
    },
    genre: 'Adventure',
    description:'Scott Pilgrim must defeat his new girlfriend\'s seven evil exes in order to win her heart. '
  },
  {
    title: 'Youth In Revolt',
    director: {
      name: 'Miguel Arteta',
      birthday: 'Born: August 29, 1965, San Juan, Puerto Rico'
    },
    genre:  'Comedy',
    description: 'While his trailer trash parents teeter on the edge of divorce, Nick Twisp sets his sights on dream girl Sheeni Saunders, hoping that she\'ll be the one to take away his virginity. '
  },
  {
    title: 'Pan\'s Labyrinth',
    director: {
      name: 'Guillermo del Toro',
      birthday: '10.09.1964',
    }, 
    genre: 'Fantasy, Drama',
    description: ' In the Falangist Spain of 1944, the bookish young stepdaughter of a sadistic army officer escapes into an eerie but captivating fantasy world. '
  },
  {
    title: 'The Avengers',
    director: {
      name: '‎Joss Whedon',
      birthday: '06.23.1964'
    },
    genre: 'Adventure, Sci-Fi',
    description: 'Earth\'s mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.'
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
// GET requests
app.get('/', (req, res) => {
    res.send('Welcome to my film club!');
});

app.get('/documentation', (req, res) => {
    res.sendFile('/documentation.html', {root: __dirname });
});

app.get('/movies', (req, res) => {
    res.json(topMovies);
});

// listenening for requests
app.listen(8080, () => {
    console.log('My movie app is hearing things on Port 8080.');
});
