const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { User, validateUser } = require("../model/user");
const auth = require("../middleware/auth");

/******************************************************/

router.post("/", async (req, res) => {
console.log(req.body)

  try {
    const  error  = validateUser(req.body);

    if (error) {
      return res
        .status(400)
        .json({ status: 1, message: error.details[0].message });
    }

    let tempUser = await User.findOne({ email: req.body.email });

    if (tempUser) {
      return res
        .status(400)
        .json({ status: 1, message: "email already exists" });
    }

    const user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      city: req.body.city
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    const user1 = await user.save();

    res.status(200).json({ status: 0, message: "user added", user: user1 });
    // res.redirect('https://google.com');
  } catch (error) {
    console.log(`users - ${error.message}`);
  }
});

// following route has no use, but to test authorization
router.get("/", auth, async (req, res) => {
  const users = await User.find();
  res.status(200).json({ status: 0, message: "all users found", users: users });
});

// router.put("/:id", auth, async (req, res) => {
//   // let userID=req.user.id;

//   try {
//     let foundUser = await User.findById(req.params.id);
//     foundUser.firstname = req.body.firstname;
//     foundUser.lastname = req.body.lastname;
//     foundUser.email = req.body.email;
//     foundUser.country = req.body.country;
//     foundUser.city = req.body.city;

//     foundUser.save();
//     res.send("User Updated");
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Server Error");
//   }
// });

module.exports = router;
