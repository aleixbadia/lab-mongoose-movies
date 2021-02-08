const mongoose = require("mongoose");
const Celebrity = require("./../models/celebrity");
require("dotenv").config();

// DATA
const celebrities = [
  {
    name: "Brad Pitt",
    ocupation: "actor",
    catchPhrase: "I'm handsome",
  },
  {
    name: "Isabel Pantoja",
    ocupation: "singer",
    catchPhrase: "Mi hijo es tonto",
  },
  {
    name: "Julian",
    ocupation: "show-man",
    catchPhrase: "I want to be in RuPaul",
  },
];

// MONGOOSE CONNECTION
// 1. CONNECT TO DB
mongoose
  .connect("mongodb://localhost/starter-code", { useNewUrlParser: true })
  .then((db) => {
    // 2. DROP THE DATABASE TO CLEAR IT
    console.log("Connected to the DB");
    const pr = db.connection.dropDatabase();
    return pr;
  })
  .then(() => {
    // INSERT THE DATA TO DB (RUN THE SEED)
    // 3. CREATE THE BOOK DOCUMENTS
    const pr = Celebrity.create(celebrities);
    return pr;
  })
  .then((createdCelebrities) => {
    console.log(`Created ${createdCelebrities.length} celebrities.`);
    mongoose.connection.close();
  })
  .catch((err) => console.log("Error connection to the DB", err));
