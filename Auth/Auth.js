const User = require("../model/User")
const bcrypt = require("bcryptjs")

// Register a User
exports.register = async (req, res, next) => {
    const { username, password } = req.body

    // simple validation of password length
    if (password.length < 6) {
      return res.status(400).json({ message: "Password less than 6 characters" })
    }
    try {
        // note: explain hashing with salt
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds).then(
            async (hash) => {
                await User.create({
                username,
                password: hash,
              }).then(user =>
                res.status(200).json({
                  message: "User successfully created",
                  user,
                })
              )
                }
        ); 
    } catch (err) {
      res.status(401).json({
        message: "User not successful created",
        error: error.mesage,
      })
    }
  }

//   Login for users
exports.login = async (req, res, next) => {
    const { username, password } = req.body
    //simple validation to check if username & password is not empty
    if (!username || !password) {
      return res.status(400).json({
        message: "Please provide both username and password",
      })
    }

    try {
        // find user in db
        const user = await User.findOne({ username })
        if (!user) {
          res.status(401).json({
            message: "Login not successful",
            error: "User not found",
          })
        } else {
            bcrypt.compare(password, user.password).then(function (result) {
                result
                  ? res.status(200).json({
                      message: "Login successful",
                      user,
                    })
                  : res.status(400).json({ message: "Login not succesful" })
              })
            }
      } catch (error) {
        res.status(400).json({
          message: "An error occurred",
          error: error.message,
        })
      }
  }

//Update user role from basic to admin
exports.update = async (req, res, next) => {
    const { role, id } = req.body
    
    // simple validation to ensure role and id not empty
    if (role && id) {
      // Verifying if the value of role is admin
      if (role === "admin") {
        await User.findById(id).then((user) => {
            // check if found user does not already have role of admin
            if (user.role !== "admin") {
              user.role = role;
              user.save((err) => {
                //executes if there is a mongo db error
                if (err) {
                  res
                    .status("400")
                    .json({ message: "An error occurred", error: err.message });
                  process.exit(1);
                }
                res.status("201").json({ message: "Update successful", user });
              });
            } else {
              res.status(400).json({ message: "User is already an Admin" });
            }
          })
          .catch((error) => {
            res
              .status(400)
              .json({ message: "An error occurred", error: error.message });
          });
      } else {
        res.status(400).json({
          message: "Role is not admin",
        })
      }
    } else {
      res.status(400).json({ message: "Role or Id not present" })
    }
}

// delete a user
exports.deleteUser = async (req, res, next) => {
    const { id } = req.body

    // simple validation id
    if (!id) {
        return res.status(400).json({ message: "provide an id" })
        }

    await User.findById(id)
      .then(user => user.remove())
      .then(user =>
        res.status(201).json({ message: "User successfully deleted", user })
      )
      .catch(error =>
        res
          .status(400)
          .json({ message: "An error occurred", error: error.message })
      )
  }