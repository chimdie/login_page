if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}
const express = require("express");
const bcrypt = require("bcrypt"); //used to hash passwords
const app = express();
const passport = require("passport");
const session = require('express-session')
const flash = require('express-flash')

// const saveData = require('./save')

const initializePassport = require('./passport-config')

initializePassport(passport, email => users.find(user => user.email))

const users = []; 

app.set("view-engine", "ejs");
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.get("/", (req, res) => {
  res.render("index.ejs");
});

//Login Route
app.get("/login", (req, res) => {
  res.render("login.ejs");
});
app.post('/login', passport.authenticate('local', {
  
}))

//Register Route
app.get("/register", (req, res) => {
  res.render("register.ejs");
});
app.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    //Redirect the user to login with the details they just registered with
    res.redirect("/login");
  } catch {
    res.redirect("/register");
  }
  console.log(users);
});

app.listen(4000);
