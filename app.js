const express = require("express");
const router = require("./router");
const fs = require("fs");
const https = require("https");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", router);

const privateKey = fs.readFileSync("./https/server.key");
const crt = fs.readFileSync("./https/server.crt");
const credentials = {
  key: privateKey,
  cert: crt,
};
const httpsServer = https.createServer(credentials, app);

const server = app.listen(5000, function () {
  console.log("Http Server is running on http://localhost:%s", 5000);
});

httpsServer.listen(18082, function () {
  console.log("HTTPS Server is running on: https://localhost:%s", 18082);
});
