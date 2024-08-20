//Creating a new instance of the express framework//
const express = require("express");
const app = express();

//Including path module to app //
const path = require("path");

//Including hbs to the app//
const hbs = require("hbs");

//collecting exported module of mongodb.js//
const collection = require("./mongodb");



//Inorder to pass incoming data from JSON date as per the HTTP request//
app.use(express.json());

//Inorder to get URL encoded body parser from URL-encoded paylodes//
app.use(express.urlencoded({ extended: false }));

//Inorder to set up hbs view engine//
app.set("view engine", "hbs");

//conneting views folder to this app//
app.set("views");

app.use(express.static('public'));

//rendering to login page with method get//
app.get("/", (req, res) => {
  res.render("login");
});
//rendering to signup page with method get//
app.get("/signup", (req, res) => {
  res.render("signup");
});

//rendering to signup page from login page and datas were stored in database//
app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.name,
    password: req.body.password,
  };
  await collection.insertMany([data]);
  console.log(data);
  res.render("login");
});

//Checking requested data and database details are correct inorder to login//
app.post("/login", async (req, res) => {
  try {
    const check = await collection.findOne({name: req.body.name});
    if (check.password === req.body.password) {
      res.render("Home");
    } else {
      res.send("Wrong password");
    }
  } catch {
    res.send("wrong details");
  }
});

app.listen(3000, () => {
  console.log("port is running");
});
