const mongoose = require('mongoose')
const dbconnect = require('../db')
const bcrypt = require('bcryptjs');

//Call the db to connect the mongo db
dbconnect()

// User Schema
const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    email:  {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.registerUser = function (newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
                console.log(err);
            }
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.getUserByUsername = function(username, callback){
    const query = {username: username}
    User.findOne(query, callback);
}
  
module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
}

module.exports.getEngineer = function(callback){
    const query = {role: "jeng"}
    User.find(query, callback);
}



// Assuming this code is in a file named user.js

// ... (previous code)

// module.exports.addAdmin = function(newAdmin, callback) {
//     newAdmin.role = "admin"; // Set the role to "admin"
//     module.exports.registerUser(newAdmin, callback);
// }

// Example usage:
//  const User = require('./user'); // Import the user module
// const newAdmin = {
//     name: "Admin Name",
//     username: "admin_username",
//     email: "admin@example.com",
//     password: "admin_password"
// };
// User.addAdmin(newAdmin, (err, user) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Admin added successfully:", user);
//     }
// });
