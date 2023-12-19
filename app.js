const express = require("express");
const router = require("./routes/index");
const userRouter = require("./routes/users");
const expressLayouts = require("express-ejs-layouts");
const config = require("./config/keys");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

require("./config/passport")(passport);

const app = express();
const PORT = process.env.PORT || 5000;

// DB config
const db = config.MongoURI;

// connect to Mongo
mongoose
  .connect(db)
  .then(() => {
    console.log("mongoDB connected");
  })
  .catch((error) => {
    console.log(error.message);
  });

// Body Parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Express Session
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// connect flash
app.use(flash());

// Global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Routes
app.use("/", router);
app.use("/users", userRouter);

// EJS
app.set("view engine", "ejs");
app.use(expressLayouts);

app.listen(PORT, () => {
  console.log(`Server is running successfully at http://localhost:${PORT}`);
});
