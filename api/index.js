const express = require('express');
const dotenv = require('dotenv');
dotenv.config()
const app = express();
const PORT = process.env.PORT;
const routes = require('./routes')

app.use(express.json())

routes(app)

app.listen(PORT, () => console.log(`Server listen on port ${PORT}`));

module.exports = app
