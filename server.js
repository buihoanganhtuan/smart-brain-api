const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const { response } = require('express');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '123',
      database : 'smart_brain'
    }
});

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Express app is running on port ${PORT}`);
})

app.get('/', (req, res) => {
    res.send('success');
})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) });

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) }); // dependency injection (injecting whatever dependecies 'register' needs)

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) });

app.put('/image', (req, res) => { image.handleImage(req, res, db) });

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) });

/*
Route planning
/ --> res = this is working
/signin -->  POST = sucess/fail (why POST, cuz password)
/register --> POST = user
/profile/:userID --> GET = user 
/image --> PUT --> user 

*/