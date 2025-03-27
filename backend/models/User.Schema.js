import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";
const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  //   console.log("Before Hashing:", this.password);
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
  //   console.log("After Hashing:", this.password);
  next();
});

userSchema.methods.comparePasswords = async function (userPassword) {
  return await bcryptjs.compare(userPassword, this.password);
};

const User = model("User", userSchema);

export default User;
