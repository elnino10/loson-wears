import express from "express";
import User from "../models/userModel";

const router = express.Router();

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
      token: getToken(user)
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
