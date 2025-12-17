require('dotenv').config();
const express = require("express");
const mainRouter = require('./routes/index.js');
const cors = require('cors');

const app = express();

const CLIENT_URL = process.env.CLIENT_URL || '*';
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(express.json());
app.use("/api/v1", mainRouter);

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});