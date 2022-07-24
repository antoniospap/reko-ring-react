/**
 * Require & import stuff
 */
require("dotenv").config();

const express = require("express");
const https = require("https");
const path = require("path");
const fs = require("fs");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Connect to mongoDB Database
 */

mongoose.connect(process.env.MONGODB_URI || process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", error => console.log(error));
db.once("open", () => console.log("Connected to Database"));


/**
 * Routes
 */

const farmRouter = require("./routes/API/farms");
const usersRouter = require("./routes/API/users");
const articlesRouter = require("./routes/API/articles");
const cartsRouter = require("./routes/API/carts");

app.use("/API/farms", farmRouter);
app.use("/API/users", usersRouter);
app.use("/API/articles", articlesRouter);
app.use("/API/carts", cartsRouter);

/**
 * Start HTTPS Server


const sslServer = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, "cert", "key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "cert", "cert.pem")),
  },
  app
  sslServer.listen(port, () => console.log("Server Started"));

);
 */
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server Started"));


const XLSX = require('xlsx');

app.post("/export-xls", async (req, res) => {
  console.log(req.body.export);
  const workSheet = XLSX.utils.json_to_sheet(req.body.export);
  const workBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workBook,workSheet,"user_bookings");

  //generate buffer
  XLSX.write(workBook,{bookType: 'xlsx', type:"buffer"});

  //binary string
  XLSX.write(workBook,{bookType: 'xlsx', type:"binary"});

  //download
  XLSX.writeFile(workBook,"user_bookings.xlsx");
});
