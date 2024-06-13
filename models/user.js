const mongoose = require("mongoose");
const SoftDeleteModel = require("mongoose-delete");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    select: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    default: "user",
    enum: ["admin", "user"],
  },
  createUp: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.plugin(SoftDeleteModel, { overrideMethods: "all" });
module.exports = mongoose.model("User", userSchema);
