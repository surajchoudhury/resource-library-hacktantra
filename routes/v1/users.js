var express = require("express");
var router = express.Router();
var passport = require("passport");
var auth = require("../../auth/auth");
var Student = require("../../Models/Student");
var Mentor = require("../../Models/Mentor");
var users = require("../../controllers/users");

router.get("/", auth.verifyToken, async (req, res) => {
  const { userID } = req.user;
  try {
    let user = await Mentor.findById(userID);
    if (!user) {
      let user = await Student.findById(userID);
      res.json({ success: true, user });
    }
    res.json({ success: true, user });
  } catch (err) {
    return res.json({ success: false, message: "Unexpected err!", err });
  }
});

router.post("/signup", users.signup);

router.post("/login", users.login);

router.post('/updateProfile',auth.verifyToken,users.updateProfile)

router.get("/auth/github", passport.authenticate("github"));

router.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api/v1/users/login",
    session: false
  }),
  async function(req, res) {
    var token = await auth.generateJWT(req.user);
    res.redirect(`http://localhost:3000/oauth/?t=${token}`);
    // res.redirect(`/oauth/?t=${token}`);
    // res.send('success');
  }
);

module.exports = router;
