const express = require('express'),
      morgan = require('morgan'),
      bodyParser = require('body-parser'),
      uuid = require('uuid'), 
      mongoose = require('mongoose'),
      Models = require('./models.js');
const app = express();
const Movies = Models.Movie;
const Users = Models.User;
mongoose.connect('mongodb://localhost/myFlixDB', {useNewUrlParser: true, useUnifiedTopology: true});

// let movies = [
//   {
//     id: 1,
//     title: 'Grandma\'s Boy',
//     description: 'A thirty-five-year-old video game tester has to move in with his grandma and her two old lady roommates.',
//     genre: 'Comedy',
    
//   },
//   { 
//     id: 2,
//     title:'The Matrix Trilogy',
//     description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',  
//     genre: 'Action',
    
//   },
//   {
//     id: 3,
//     title:'John Wick',
//     description: 'An ex-hit-man comes out of retirement to track down the gangsters that killed his dog and took everything from him.',
//     genre: 'Action',
    
//   },
//   {
//     id: 4,
//     title: 'Cloud Atlas',
//     description: 'An exploration of how the actions of individual lives impact one another in the past, present and future, as one soul is shaped from a killer into a hero, and an act of kindness ripples across centuries to inspire a revolution. ',
//     genre: 'Sci-Fi, Drama',
    
//   },
//   {
//     id:5,
//     title:'Goldeneye',
//     description: 'Years after a friend and fellow 00 agent is killed on a joint mission, a secret space based weapons program known as "GoldenEye" is stolen. James Bond sets out to stop a Russian crime syndicate from using the weapon.',
//     genre: 'Action',
    
//   },
//   {
//     id:6,
//     title: 'The Witcher',
//     description: 'Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.',
//     genre: 'Fantasy',
    
//   },
//   {
//     id:7,
//     title:'Scott Pilgrim vs. The World',
//     description:'Scott Pilgrim must defeat his new girlfriend\'s seven evil exes in order to win her heart. ',
//     genre: 'Adventure',
    
//   },
//   {
//     id:8,
//     title:'Youth In Revolt',
//     description: 'While his trailer trash parents teeter on the edge of divorce, Nick Twisp sets his sights on dream girl Sheeni Saunders, hoping that she\'ll be the one to take away his virginity. ',
//     genre:  'Comedy',
    
//   },
//   {
//     id:9,
//     title:'Pan\'s Labyrinth',
//     description: ' In the Falangist Spain of 1944, the bookish young stepdaughter of a sadistic army officer escapes into an eerie but captivating fantasy world. ',
//     genre: 'Fantasy, Drama',
    
//   },
//   {
//     id:10,
//     title:'The Avengers',
//     description: 'Earth\'s mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.',
//     genre: 'Adventure, Sci-Fi',
    
//   }
// ];

// // list of genres

// let genres = [
//   {
//       type: 'Comedy',
//       description: 'A comedy film is a genre of film in which the main emphasis is on humour.'
//   },
//   {
//       type: 'Action',
//       description: 'Action film are movies in which the protagonist or protagonists are thrust into a series of events that typically include violence, fighting, physical feats, and frantic chases. Action films tend to feature a hero struggling against incredible odds, usually against a villain, or a pursuit which usually concludes in victory for the hero.'
//   },
//   {
//       type: 'Drama',
//       description: 'In film and television, drama is a genre of narrative fiction intended to be more serious than humorous in tone. '
//   },
//   {
//       type: 'Fantasy',
//       description: 'Fantasy films are films that belong to the fantasy genre with fantastic themes, usually magic, supernatural events, mythology, folklore, or exotic fantasy worlds. The genre is considered a form of speculative fiction alongside science fiction films and horror films, although the genres do overlap. Fantasy films often have an element of magic, myth, wonder, escapism, and the extraordinary.'
//   },
//   {
//       type: 'Sci-fi',
//       description: 'Science fiction (or sci-fi) is a film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science, such as extraterrestrial lifeforms, alien worlds, extrasensory perception and time travel, along with futuristic elements such as spacecraft, robots, cyborgs, interstellar travel or other technologies. Science fiction films have often been used to focus on political or social issues, and to explore philosophical issues like the human condition. '
//   }
// ];

// // list of directors

// let directors = [
// {
//   name:'Nicholaus Goossenn',
//   birthday: 'Born: August 18, 1978, Los Angeles, CA',
// },
// {
//   name: 'Lana Wachowski, Lilly Wachowski',
//   birthday: 'Lana Wachowski - Born: June 21, 1965 (age 55 years), Chicago, IL, \nLily Wachowski - Born: August 18, 1978, Los Angeles, CA',
// },

// {
//   name:'Chad Stahelski, David Leitch(uncredited)',
//   birthday: 'C.S. - 09.20.1968, D.L. - 11.16.1975',

// },

// {
//   name:'Lana Wachowski, Lilly Wachowski, Tom Tykwer',
//   birthday: 'Lana Wachowski - Born: June 21, 1965 (age 55 years), Chicago, IL, \nLily Wachowski - Born: August 18, 1978, Los Angeles, CA, \nTom Tykwer - Born: May 23, 1965 (age 55 years), Wuppertal, Germany',

// },

// {
//   name: 'Martin Campbell',
//   birthday: 'Born: October 24, 1943 (age 76 years), Hastings, New Zealand'

// },

// {
//   name: 'Lauren Schmidt',
//   birthday: 'Born: August 1, 1978 Westerville, Ohio'
// },

// {
//   name: 'Edgar Wright',
//   birthday: ' Born: April 18, 1974 in Poole, Dorset, England, UK '

// },

// {
//   name: 'Miguel Arteta',
//   birthday: 'Born: August 29, 1965, San Juan, Puerto Rico'
// },

// {
//   name: 'Guillermo del Toro',
//   birthday: '10.09.1964',
// },

// {
//   name: '‎Joss Whedon',
//   birthday: '06.23.1964'
// }

// ];

// let users = [ 
// {
//   id: 1,
//   username : 'iamfirst',
//   password : 'iamfirstagain1234',
//   email : 'thefirstemail@internet.com',
//   birthday : '12.29.1986',
//   favorites: [
    
//   ]
// }
// ];

// let favorites = [
//   {
//     id: 3,
//     title:'John Wick',
//     description: 'An ex-hit-man comes out of retirement to track down the gangsters that killed his dog and took everything from him.',
//     genre: 'Action'
//   }
// ]

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
app.get('/Movies', (req, res) => {
  Movies.find()
  .then((movie) => {
    res.status(201).json(movie);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
    });
  });

// Get request for a single movie by title
app.get('/Movies/:Title', (req, res) => {
  Movies.findOne({ Title: req.params.Title})
    .then((title) => {
      res.json(title);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});



// GET request for all genres
app.get('/genres', (req, res) => {
  Movies.find()
    .then((genres) => {
      res.status(201).json(genres);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
      });
    });

// GET request for genre description based on title
app.get('/Movies/Genre/:Title', (req, res) => {
  Movies.findOne({'genres.Name': req.params.Name })
    .then((genre) => {
      res.status(201).json(genre.Name);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: 69 ' + err);
    });
});

// Get data about a director by name
app.get('/Movies/:Director', (req, res) => {
  Movies.findOne({ "Director.Name": req.params.Name })
    .then((movies) => {
      res.status(201).json('Name: ' + movies.Director.Name + 'Bio :' + movies.Director.Bio);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: 69 ' + err);
    });
});

// GET request for all users
app.get('/users', (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
      });
    });

// GET request for user by username
app.get('/users/:Username', (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
  });

// Add a user

/* expected json in this format
{
  ID: Interger,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/

app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) => {res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
    }
})
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
  });


// Update user info by username
/* expected JSON format 
{
  Username: String,
  (required)
  Password: String,
  (required)
  Email: String,
  (required)
  Birthday: Date

}*/

app.put('/users/:Username', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, 
    { $set: 
      {
        Username: req.body.Usernam,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      }
  },
  { new: true }, // this line makes sure updated document is returned
    (err, updatedUser) => {
      if(err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
    });
});

// Add a movie to user's favorites
app.post('/users/:Username/Movies/:MovieID',  (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, 
    { $push: { FavoriteMovies: req.params.MovieID}
  },
  {new: true}, //makes sure updated doc. is returned
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
  } else {
    res.json(updatedUser);
  }
  });
});

// DELETE request to remove movie from favorites
app.delete('/users/:username/movies/favorites', (req, res) => {
  let favorite = favorites.find( (favorite) => {
    return favorite.title === req.params.title });
    

    if (favorite) {
      favorites = favorites.filter(function(obj) {
        return obj.title !== req.params.title  });
        res.status(201).send(req.params.title + ' is no longer a favorite')
      }
    });
  

// Delete a user by username
app.delete('/users/:Username', (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' does not exist.');
      } else {
        res.status(200).send(req.params.Username + ' is no more.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// error handling middleware defined last in chain
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something is very wrong');
  });


// listenening for requests
app.listen(8080, () => {
    console.log('My movie app is hearing things on Port 8080.');
});


 