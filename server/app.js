"use strict";
const express = require('express');
require('dotenv').config();
var cors = require("cors");
const app = express();
app.use(cors());
app.listen(5000, () => {
    console.log("listening on port 5000");
});
