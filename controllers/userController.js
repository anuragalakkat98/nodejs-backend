const User = require("../db/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Registration
const registerUser = (request, response) => {
  const { email, password, firstname, lastname, address } = request.body;
  console.log("address======", address);
  // Hash the password
  bcrypt.hash(password, 10, (error, hashedPassword) => {
    if (error) {
      response.status(500).send({
        message: "Error creating user",
        error,
      });
    } else {
      // Create a new user instance with the hashed password
      const user = new User({
        firstname,
        lastname,
        email,
        password: hashedPassword,
        address,
      });
      // Save the new user
      user
        .save()
        .then((result) => {
          response.status(201).send({
            message: "User Created Successfully",
            result,
          });
        })
        .catch((error) => {
          response.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    }
  });
};

// Login
loginUser = (request, response) => {
  // check if email exists
  User.findOne({ email: request.body.email })
    // if email exists
    .then((user) => {
      // compare the password entered and the hashed password found
      bcrypt
        .compare(request.body.password, user.password)
        .then((passwordCheck) => {
          // check if password matches
          if (!passwordCheck) {
            return response.status(400).send({
              message: "Passwords does not match",
              error,
            });
          }
          // create JWT token
          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );

          // return success response
          response.status(200).send({
            message: "Login Successful",
            email: user.email,
            token,
            user,
          });
        })
        .catch((error) => {
          console.log("Passwords does not match", error);
          response.status(400).send({
            message: "Passwords does not match",
            error,
          });
        });
    })
    .catch((e) => {
      console.log("Email not found", e);
      response.status(404).send({
        message: "Email not found",
        e,
      });
    });
};

// Get user by ID
const getUser = (request, response) => {
  const { email } = request.params;
  console.log("email>>>", email);
  // Find the user by ID
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return response.status(404).send({
          message: "User not found",
        });
      }

      // User found, send the user data
      response.status(200).send({
        message: "User retrieved successfully",
        user,
      });
    })
    .catch((error) => {
      response.status(500).send({
        message: "Error retrieving user",
        error,
      });
    });
};

const updateUserByEmail = (request, response) => {
  console.log("inside update====");
  const { email } = request.params; // Assuming the email is passed as a parameter in the URL
  const { firstname, lastname, address } = request.body;

  // Find the user by email
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return response.status(404).send({
          message: "User not found",
        });
      }

      // Update the user's information
      user.firstname = firstname;
      user.lastname = lastname;
      user.address = address;

      // Save the updated user
      user
        .save()
        .then((result) => {
          response.status(200).send({
            message: "User updated successfully",
            result,
          });
        })
        .catch((error) => {
          response.status(500).send({
            message: "Error updating user",
            error,
          });
        });
    })
    .catch((error) => {
      response.status(500).send({
        message: "Error updating user",
        error,
      });
    });
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  updateUserByEmail,
};
