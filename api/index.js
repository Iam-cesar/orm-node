const express = require('express');
const dotenv = require('dotenv');
dotenv.config()
const app = express();
const PORT = process.env.PORT;
const routes = require('./routes')
const Database = require('./infrastructure/Database')
const connection = require('./infrastructure/connection')

app.use(express.json())

connection.connect((err) => {
  if (err) {
    console.log(err)
  } else {

    Database.init(connection)

    routes(app)

    app.listen(PORT, () => console.log(`Server listen on port ${PORT}`));
  }
})


module.exports = app
