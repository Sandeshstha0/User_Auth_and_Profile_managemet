const mongoose = require("mongoose");
const usersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      require: [true, "password is required"],
    },
    reset_code: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);
const usersModel = mongoose.model("users", usersSchema);


module.exports = usersModel;
