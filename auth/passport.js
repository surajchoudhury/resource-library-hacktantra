var passport = require("passport");
var GitHubStrategy = require("passport-github").Strategy;
var Student = require("../Models/Student");
var Mentor = require("../Models/Mentor");
var auth = require("../auth/auth");
var jwt = require("jsonwebtoken");

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.Client_ID,
      clientSecret: process.env.Client_Secret,
      callbackURL:
        "https://resource-library-alt.herokuapp.com/api/v1/users/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
      // let mentors = [
      //   "itzsunny",
      //   "chaharshivam",
      //   "ravi11o",
      //   "prank7",
      //   "nnnkit",
      //   "suraj122"
      // ];
      if (
        profile.username == "reettik97" ||
        profile.username == "itzsunny" ||
        profile.username == "chaharshivam" ||
        profile.username == "ravi11o" ||
        profile.username == "prank7" ||
        profile.username == "nnnkit" ||
        profile.username == "puneettiwari61" ||
        profile.username == "suraj122"
      ) {
        Mentor.findOne({ username: profile.username }, (error, mentor) => {
          if (!mentor) {
            Mentor.create(
              {
                username: profile.username,
                email: profile._json.email,
                password: "password"
              },
              (error, mentor) => {
                jwt.sign(
                  {
                    userID: mentor.id,
                    email: mentor.email,
                    isMentor: mentor.isMentor
                  },
                  process.env.SECRET,
                  (err, token) => {
                    if (err) return next(err);
                    res.json({ success: true, token });
                    return cb(error, token);
                  }
                );
              }
            );
          } else {
            return cb(error, mentor);
          }
        });
      } else {
        Student.findOne({ username: profile.username }, (err, student) => {
          if (!student) {
            Student.create(
              {
                username: profile.username,
                email: profile._json.email,
                password: "password"
              },
              (error, student) => {
                jwt.sign(
                  {
                    userID: student.id,
                    email: student.email,
                    isMentor: student.isMentor
                  },
                  process.env.SECRET,
                  (err, token) => {
                    if (err) return next(err);
                    res.json({ success: true, token });
                    return cb(error, token);
                  }
                );
              }
            );
          } else {
            return cb(err, student);
          }
        });
      }
    }
  )
);
