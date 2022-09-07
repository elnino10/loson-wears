import express from "express";
import User from "../models/userModel";
import { getToken } from "../utils";

const router = express.Router();

router.post("/register", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  })
  const newUser = await user.save();
  res.send(newUser)
  if (newUser) {
    res.send({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: getToken(newUser),
    });
  } else {
    res.status(401).send({ msg: "Failed to create an account" });
  }
})

router.post("/signin", async (req, res) => {
  const userSignin = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  })
  if(userSignin){
    res.send({
      _id: userSignin.id,
      name: userSignin.name,
      email: userSignin.email,
      isAdmin: userSignin.isAdmin,
      token: getToken(userSignin),
    });
  }else{
    res.status(401).send({msg: "Invalid email or password"})
  }
})

router.get("/createadmin", async (req, res) => {
  try {
    const user = new User({
      name: "Joe",
      email: "joeegboka@gmail.com",
      password: "12345",
      isAdmin: true,
    });
    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

export default router;
