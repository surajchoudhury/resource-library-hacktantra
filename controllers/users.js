var Student = require("../Models/Student");
var Mentor = require("../Models/Mentor");
var auth = require("../auth/auth");
var bcrypt = require("bcryptjs");

module.exports = {
  login: async (req, res) => {
    try {
      var student = await Student.findOne({ username: req.body.username });
      if (!student) {
        var mentor = await Mentor.findOne({ username: req.body.username });
        if (!mentor) {
          return res.json({ success: false, msg: "invalid credentials" });
        }
        var validate = await mentor.verifyPassword(req.body.password);

        if (!validate) {
          return res.json({ success: false, msg: "invalid credentials" });
        }
        var token = await auth.generateJWT(mentor);
        res.json({ success: true, token });
      } else {
        var validate = await student.verifyPassword(req.body.password);
        if (!validate) {
          return res.json({ success: false, msg: "invalid credentials" });
        }
        var token = await auth.generateJWT(student);
        res.json({ success: true, token });
      }
    } catch (error) {
      res.status(400).json({ success: false, error });
    }
  },
  signup: async (req, res) => {
    try {
      let mentors = [
        "itzsunny",
        "chaharshivam",
        "ravi11o",
        "prank7",
        "nnnkit",
        "suraj122",
        "puneettiwari61",
        "reettik97"
      ];
      if (mentors.includes(req.body.username)) {
        let user = await Mentor.create(req.body);
        res.json({ success: true, user });
      } else {
        // let user = await Student.create(req.body);
        let user = await new Student(req.body).save();
        res.json({ success: true, user });
      }
    } catch (error) {
      res.status(200).json(error);
    }
  },
  updateProfile: async (req, res) => {
    try {
      if (req.user.isMentor) {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        let user = await Mentor.findByIdAndUpdate(req.user.userID, req.body, {
          new: true
        });
        res.json({ success: true, user });
      } else {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        let user = await Student.findByIdAndUpdate(req.user.userID, req.body, {
          new: true
        });
        res.json({ success: true, user });
      }
    } catch (error) {
      res.status(400).json(error);
    }
  }
};
