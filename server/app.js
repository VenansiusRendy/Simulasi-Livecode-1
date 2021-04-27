const express = require("express");
const dotenv = require("dotenv").config();
const router = require("./routers");
const app = express();
const port = 3000;

// app.use(dotenv);
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(port, () => {
	console.log(`Applikasi jalan di port ${port}`);
});
