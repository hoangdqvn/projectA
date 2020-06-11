// Initialization of the web server
const express = require("express");
const app = express();

// Initialize body parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize the EJS template engine
app.engine(".ejs", require("ejs").__express);
app.set("view engine", "ejs");

// Initialize Sessions
const session = require("express-session");
app.use(
  session({
    secret: "example",
    resave: false,
    saveUninitialized: true,
  })
);

// Start web server
// Call in the browser: http://localhost:3000

app.listen(3000, function () {
  console.log("listening on 3000");
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/", function (req, res) {
  res.render("index", { message: "Please register first" });
});

app.post("/onLogin", function (req, res) {
  const username = req.body["username"];
  const password = req.body["password"];
  if (username == "studi" && password == "geheim") {
    console.log("Login Successful");
    req.session["authenticated"] = true;
    req.session["user"] = username;
    res.redirect("/content");
  } else {
    res.render("index", { message: "Login failed!" });
  }
});

app.get("/content", function (req, res) {
  if (req.session["authenticated"] == true) {
    res.render("content", { user: req.session["user"] });
  } else {
    res.redirect("/");
  }
});

app.get("/logout", function (req, res) {
  delete req.session["authenticated"];
  res.redirect("/");
});
