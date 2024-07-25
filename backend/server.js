const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const app = express();


mongoose.connect(
    "mongodb+srv://benedictuyioghosa:benedictuyioghosa@cluster1.fnc85hx.mongodb.net/ems_db"
  );
  
  app.use(cors());

  app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
  }))
  app.use(express.static("public"));
  app.use(express.json());

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App is listen on port ${PORT}`);
});
