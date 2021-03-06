// import node modules
const mongoose = require('mongoose');


// define a schema
const GroupModelSchema = new mongoose.Schema({
    name: String,
    code: String,
    members: [String],
    color: String
});

// compile model from schema
module.exports = mongoose.model('GroupModel', GroupModelSchema);
