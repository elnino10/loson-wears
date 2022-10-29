import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required"], lowercase: true },
  email: {
    type: String,
    required: [true, "Please provide email address"],
    unique: true,
    dropDups: true,
    validate: [validator.isEmail, "Provide a valid email address"],
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  password: { type: String, required: [true, "Password is required"], select: false },
  passwordConfirm: {
    type: String,
    required: [true, "Confirm password is required"],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "Password don't match",
    },
  },
  passwordChanged: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  }, 
  passwordResetToken: String,
  passwordResetExpires: Date
}); 

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 500;
  next();
});

userSchema.pre(/^find/, function(next){
  this.find({active: {$ne: false}})
  next() 
})

userSchema.methods.checkPassword = async function (
  enteredPassword,
  savedPassword
) {
  return await bcrypt.compare(enteredPassword, savedPassword);
};

userSchema.methods.changedPassword = function(jwtTimeStamp) {
  if(this.passwordChanged){
    const changeTime = parseInt(this.passwordChanged.getTime() / 1000, 10)
    return jwtTimeStamp < changeTime
  }
  return false
}

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex'); 

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model("User", userSchema);

export default User;
