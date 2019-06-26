const express = require("express");
const server = express();
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const userRouter = require("../routers/user.js");
const countryRouter = require("../routers/country.js");
const communityRouter = require("../routers/community.js");
const childrenRouter = require("../routers/children.js")
const session = require('express-session');

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan("dev"));

// configure express-session middleware
server.use(
  session({
    name: 'notsession', // default is connect.sid
    secret: 'nobody tosses a dwarf!',
    cookie: {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      secure: true, 
    }, 
    httpOnly: true, 
    resave: false,
    saveUninitialized: false,
  })
);


server.use("/user", userRouter);
server.use("/api",countryRouter);
server.use("/api", communityRouter);
server.use("/api", childrenRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "Server is up" });
});

module.exports = server;
