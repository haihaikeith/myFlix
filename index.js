const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  uuid = require('uuid'),
  mongoose = require('mongoose'),
  Models = require('./models.js');
const cors = require('cors');
const passport = require('passport')
require('./passport')

const { check, validationResult } = require('express-validator');
const app = express();
const Movies = Models.Movie;
const Users = Models.User;

// TO TEST ON LOCAL HOST
// mongoose.connect('mongodb://localhost/myFlixDB', {useNewUrlParser: true, useUnifiedTopology: true});  --localhost    

// HEROKU AND ATLAS DB CONNECTION
mongoose.connect(process.env.CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// using bodyParser
app.use(bodyParser.json());
// use morgan to log requests
app.use(morgan('common'));
// imports auth.js for authentication
let auth = require('./auth')(app);
// WHITELISTED DOMAINS
let allowedOrigins = ['http://localhost:8080', 'http://testsite.com', 'http://localhost:1234'];

// const { call } = require('body-parser');  // not sure what this is code is for

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) { // if a specific origin isn't found on the list
      let message = 'The CORS policy for this app doesn\'t allow access from origin ' + origin;
      return callback(new Error(message), false);
    }
    return callback(null, true);
  }
}));

app.get('/', (req, res) => {
  res.send('<h1>' + 'Welcome to myFlix Web App!' + '</h1>')
});

// ENDPOINTS

// GET request for ALL movies
app.get('/Movies', passport.authenticate('jwt', { session: false }), (req, res) => {
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
app.get('/Movies/:Title', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ Title: req.params.Title })
    .then((title) => {
      res.status(201).json(title);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});



// GET request for all genres
app.get('/genres', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.find()
    .then((genres) => {
      res.status(201).json(genres);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Get data about genre by name
app.get('/Movies/Genre/:Name/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ 'Genre.Name': req.params.Name })
    .then((genres) => {
      res.status(201).json(genres.Genre.Name + ": " + genres.Genre.Description);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: 69 ' + err);
    });
});

// Get data about a director by name
app.get('/Movies/Director/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ 'Director.Name': req.params.Name })
    .then((movies) => {
      res.status(201).json('Name: ' + movies.Director.Name + '   Bio: ' + movies.Director.Bio);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: 69 ' + err);
    });
});



// GET request for all users
app.get('/users', passport.authenticate('jwt', { session: false }), (req, res) => {
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
app.get('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});



/* expected json in this format
{
  ID: Interger,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/

// Add a user

// Validation logic here for request
//you can either use a chain of methods like .not().isEmpty()
//which means "opposite of isEmpty" in plain english "is not empty"
//or use .isLength({min: 5}) which means
//minimum value of 5 characters are only allowed

app.post('/users', [
  check('Username', 'Username is required').isLength({ min: 5 }),
  check('Username', 'Username contains alphanumeric characters that are not allowed').isAlphanumeric(),
  check('Password', 'Password is required').not().isEmpty(),
  check('Email', 'Email does not appear to be kosher').isEmail()], (req, res) => {
    let errors = validationResult(req);  // checks validation object for errors
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array });
    }
    let hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOne({ Username: req.body.Username }) // looks to see if user already exists
      .then((user) => {
        if (user) {
          return res.status(400).send(req.body.Username + 'already exists');
        } else {
          Users.create({
            Username: req.body.Username,
            Password: hashedPassword,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
            .then((user) => {
              res.status(201).json(user)
            })
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

app.put('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username },
    {
      $set:
      {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      }
    },
    { new: true }, // this line makes sure updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    });
});

// Add a movie to user's favorites
app.post('/users/:Username/:FavoriteMovies/:_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username },
    {
      $push: { FavoriteMovies: req.params._id }
    },
    { new: true }, //makes sure updated doc. is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
        res.status(200).send(req.params._id + ' is now in your Favorites.')
      }
    });
});

// DELETE request to remove movie from favorites
app.delete('/users/:Username/:FavoriteMovies/:_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username },
    {
      $pull: { FavoriteMovies: req.params._id }
    },
    { new: true }, //makes sure updated doc. is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
        res.status(200).send(req.params._id + ' is off your list.')
      }
    });
});


// Delete a user by username
app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
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

// use express to serve documentation.html
app.use(express.static('public'));

// error handling
app.use((err, req, res, next) => {
  if (err) {
    console.log(err.stack);
    res.status(500).send('Something is definitely not right');
  } else {
    console.log(err)
  }
});

// listenening for requests
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
  console.log('Listening on Port ' + port);
});

