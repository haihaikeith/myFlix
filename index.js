const express = require('express'),
      morgan = require('morgan'),
      bodyParser = require('body-parser'),
      uuid = require('uuid');
const app = express();

let movies = [
  {
    id: 1,
    title: 'Grandma\'s Boy',
    description: 'A thirty-five-year-old video game tester has to move in with his grandma and her two old lady roommates.',
    genre: 'Comedy',
    
  },
  { 
    id: 2,
    title:'The Matrix Trilogy',
    description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',  
    genre: 'Action',
    
  },
  {
    id: 3,
    title:'John Wick',
    description: 'An ex-hit-man comes out of retirement to track down the gangsters that killed his dog and took everything from him.',
    genre: 'Action',
    
  },
  {
    id: 4,
    title: 'Cloud Atlas',
    description: 'An exploration of how the actions of individual lives impact one another in the past, present and future, as one soul is shaped from a killer into a hero, and an act of kindness ripples across centuries to inspire a revolution. ',
    genre: 'Sci-Fi, Drama',
    
  },
  {
    id:5,
    title:'Goldeneye',
    description: 'Years after a friend and fellow 00 agent is killed on a joint mission, a secret space based weapons program known as "GoldenEye" is stolen. James Bond sets out to stop a Russian crime syndicate from using the weapon.',
    genre: 'Action',
    
  },
  {
    id:6,
    title: 'The Witcher',
    description: 'Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.',
    genre: 'Fantasy',
    
  },
  {
    id:7,
    title:'Scott Pilgrim vs. The World',
    description:'Scott Pilgrim must defeat his new girlfriend\'s seven evil exes in order to win her heart. ',
    genre: 'Adventure',
    
  },
  {
    id:8,
    title:'Youth In Revolt',
    description: 'While his trailer trash parents teeter on the edge of divorce, Nick Twisp sets his sights on dream girl Sheeni Saunders, hoping that she\'ll be the one to take away his virginity. ',
    genre:  'Comedy',
    
  },
  {
    id:9,
    title:'Pan\'s Labyrinth',
    description: ' In the Falangist Spain of 1944, the bookish young stepdaughter of a sadistic army officer escapes into an eerie but captivating fantasy world. ',
    genre: 'Fantasy, Drama',
    
  },
  {
    id:10,
    title:'The Avengers',
    description: 'Earth\'s mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.',
    genre: 'Adventure, Sci-Fi',
    
  }
];

// list of genres

let genres = [
  {
      type: 'Comedy',
      description: 'A comedy film is a genre of film in which the main emphasis is on humour.'
  },
  {
      type: 'Action',
      description: 'Action film are movies in which the protagonist or protagonists are thrust into a series of events that typically include violence, fighting, physical feats, and frantic chases. Action films tend to feature a hero struggling against incredible odds, usually against a villain, or a pursuit which usually concludes in victory for the hero.'
  },
  {
      type: 'Drama',
      description: 'In film and television, drama is a genre of narrative fiction intended to be more serious than humorous in tone. '
  },
  {
      type: 'Fantasy',
      description: 'Fantasy films are films that belong to the fantasy genre with fantastic themes, usually magic, supernatural events, mythology, folklore, or exotic fantasy worlds. The genre is considered a form of speculative fiction alongside science fiction films and horror films, although the genres do overlap. Fantasy films often have an element of magic, myth, wonder, escapism, and the extraordinary.'
  },
  {
      type: 'Sci-fi',
      description: 'Science fiction (or sci-fi) is a film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science, such as extraterrestrial lifeforms, alien worlds, extrasensory perception and time travel, along with futuristic elements such as spacecraft, robots, cyborgs, interstellar travel or other technologies. Science fiction films have often been used to focus on political or social issues, and to explore philosophical issues like the human condition. '
  }
];

// list of directors

let directors = [
{
  name:'Nicholaus Goossenn',
  birthday: 'Born: August 18, 1978, Los Angeles, CA',
},
{
  name: 'Lana Wachowski, Lilly Wachowski',
  birthday: 'Lana Wachowski - Born: June 21, 1965 (age 55 years), Chicago, IL, \nLily Wachowski - Born: August 18, 1978, Los Angeles, CA',
},

{
  name:'Chad Stahelski, David Leitch(uncredited)',
  birthday: 'C.S. - 09.20.1968, D.L. - 11.16.1975',

},

{
  name:'Lana Wachowski, Lilly Wachowski, Tom Tykwer',
  birthday: 'Lana Wachowski - Born: June 21, 1965 (age 55 years), Chicago, IL, \nLily Wachowski - Born: August 18, 1978, Los Angeles, CA, \nTom Tykwer - Born: May 23, 1965 (age 55 years), Wuppertal, Germany',

},

{
  name: 'Martin Campbell',
  birthday: 'Born: October 24, 1943 (age 76 years), Hastings, New Zealand'

},

{
  name: 'Lauren Schmidt',
  birthday: 'Born: August 1, 1978 Westerville, Ohio'
},

{
  name: 'Edgar Wright',
  birthday: ' Born: April 18, 1974 in Poole, Dorset, England, UK '

},

{
  name: 'Miguel Arteta',
  birthday: 'Born: August 29, 1965, San Juan, Puerto Rico'
},

{
  name: 'Guillermo del Toro',
  birthday: '10.09.1964',
},

{
  name: '‎Joss Whedon',
  birthday: '06.23.1964'
}

];

let users = [ 
{
  id: '1',
  username : 'iamfirst',
  password : 'iamfirstagain1234',
  email : 'thefirstemail@internet.com',
  birthday : '12.29.1986',
  favorites: {

  }
}
];

// use express to serve documentation.html
app.use(express.static('public'));

// use morgan to log requests
app.use(morgan('common'));

// using bodyParser

app.use(bodyParser.json());

// error handling
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send('Something is definitely not right');
});
// GET request for ALL movies
app.get('/movies', (req, res) => {
   res.json(movies);  
});

// Get request for a single movie by title
app.get('/movies/:title', (req, res) => {
      res.json(movies.find( (movie) => {
// makes GET param request and movie title lowercase before comparing them
     return movie.title.toLowerCase() === req.params.title.toLowerCase()}));
    
});

// GET request for genre description based on type
app.get('/genres', (req, res) => {
    res.json(genres.find( (genre) => {
      return genre.type.toLowerCase() === req.params.type.toLowerCase()}))
});

// GET request for director based on name
app.get('/directors/:name', (req, res) => {
  res.json(directors.find( (director) => {
     return director.name.toLowerCase() === req.params.name.toLowerCase()
  }));
});

// POST request to add new user

app.post('/users', (req, res) => {
  let newUser = req.body;

  if (!newUser.username) {
    const message = 'Missing something in request body';
    res.status(400).send(message);
  } else {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).send(newUser);
  }
});

// PUT request to update user info
app.put("/users/:username", (req, res) => {
  res.send("Successful User information updated");
});

// POST request to update user's favorite movies
app.post('/users/:username/:favorites', (req, res) =>{
  let newMovie = req.body;

  if (!newMovie.title) {
    const message = 'Missing title in request';
    res.status(404).send(message);
     } else {
        newMovie.id = uuid.v4();
        favorites.push(newMovie);
        res.status(201).send(newMovie);
     }
  });

// DELETE request for removing a movie from user's favorites
app.delete('/users/:username/favorites/:title', (req, res) =>
{
  let favorite = favorites.find((favorite) => {
    return title === req.params.title 
  });
  if (favorite) {
    favorites.filter( (obj) => {
      return obj.title !== req.params.title
    });
    res.status(201).send(req.params.title + ' is no longer your favorite :(');
  }

});

// listenening for requests
app.listen(8080, () => {
    console.log('My movie app is hearing things on Port 8080.');
});
