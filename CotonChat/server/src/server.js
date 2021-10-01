require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const server = express();

server.use(cors());
server.use(morgan("dev"));


server.listen(process.env.SERVER_PORT, () => {
  console.log(`server is up and running on port${process.env.SERVER_PORT}`);
});
