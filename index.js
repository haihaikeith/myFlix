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

// Get data about genre by name
app.get('/Movies/Genre/:Name/', (req, res) => {
  Movies.findOne({'Genre.Name': req.params.Name })
    .then((genres) => {
      res.status(201).json(genres.Genre.Name + ": " + genres.Genre.Description);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: 69 ' + err);
    });
});

// Get data about a director by name
app.get('/Movies/Director/:Name', (req, res) => {
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
        Username: req.body.Username,
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
app.post('/users/:Username/:FavoriteMovies/:_id',  (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, 
    { $push: { FavoriteMovies: req.params._id}
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
app.delete('/users/:Username/:FavoriteMovies/:_id', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, 
    { $pull: { FavoriteMovies: req.params._id}
  },
  {new: true}, //makes sure updated doc. is returned
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
  } else {
    res.json(updatedUser);
    res.status(200).send(req.params._id + ' is off your list.')
  }
  });
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