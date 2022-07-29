const mongoose = require('mongoose');

//DEPLOY: set actual DB
mongoose.connect(process.env.DATABASE_URL, {});

const db = mongoose.connection; // shortcut to mongoose.connection object
db.on('connected', function() {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});