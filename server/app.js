const express = require("express");
const dotenv = require("dotenv").config();
const router = require("./routers");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(port, () => {
	console.log(`Applikasi jalan di port ${port}`);
});
