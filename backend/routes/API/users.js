const express = require("express");
const router = express.Router();
const User = require("../../models/user");

//Getting all

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message }); // 500 = error on server/database
  }
});

/*
//Getting one
router.get("/:id", getUser, (req, res) => {
  res.send(res.user);
});

*/

router.get('/fbUserID/:id',async (req,res) => {
  try {
      let userByFBID = await User.find({fbUserId: req.params.id});
      if (userByFBID == null) return res.status(404).json({message: 'Cannot find User.'}) // 404 = could not find something, Farm
      res.json(userByFBID);
  } catch (err) {
      return res.status(500).json({message: err.message})
  }
})

//Creating one
router.post("/", async (req, res) => {
  const user = new User({
    username: req.body.username,
    fbUserId: req.body.fbUserId
  });
  //check if user already in database
  const userExist = await User.findOne({fbUserId: req.body.fbUserId});
  if (!userExist) {
    try {
        const newUser = await user.save(); //save in database
        res.json(newUser);
      } catch (err) {
        res.status(400).json({ message: err.message }); // 400 = users input misstake
      }
  }
});

/*
async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null)
      return res.status(404).json({ message: "Cannot find User." }); // 404 = could not find something, Article
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
}

*/

module.exports = router; //fix errors
