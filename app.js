require("dotenv").config();
require("./middleware/jwtAuth");
const express = require("express");
const passport = require("passport");
const expressSession = require("express-session");
const mainRouter = require("./routes/ursl");
const app = express();
const host = "localhost:";
const port = process.env.PORT || 9001;
// It is important to use expressSession middleware before initializing Passport
app.use(
  expressSession({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use("/", mainRouter);

app.listen(port, () => {
  console.log(`Server is running on ${host}${port}`);
});