const Mongoose = require("mongoose")

// db name is role_auth
const localDB = `mongodb://localhost:27017/role_auth`

const connectDB = async () => {
  await Mongoose.connect(localDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  console.log("MongoDB Connected")
}
module.exports = connectDB