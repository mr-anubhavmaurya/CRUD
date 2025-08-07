const express = require("express");
const app = express();
const PORT = 8000;
const db = require("./connection");
const bodyParser = require("body-parser");
const userRoute = require("./routes/user")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use("/user", userRoute);
//server connection
app.listen(PORT,()=>console.log(`server started @...http://localhost: ${PORT}`))