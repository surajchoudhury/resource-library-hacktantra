var passport = require("passport");
var GitHubStrategy = require("passport-github").Strategy;
var Student = require("../Models/Student");
var Mentor = require("../Models/Mentor");
var auth = require("../auth/auth");
var jwt = require("jsonwebtoken");

passport.use(
  new GitHubStrategy(
    {
      clientID: "90f3685d9788c63b98ef",
      clientSecret: "e5defdef491e4b712de81e5d56736a60bdd645ee",
      callbackURL: "/api/v1/users/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
      // console.log(profile);
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
                if (err) return next(err);
                return cb(error, mentor);
              }
            );
          } else {
            return cb(error, mentor);
          }
        });
      } else {
        Student.findOne({ username: profile.username }, (err, student) => {
          // console.log(err, student, "inside student clause")
          if (!student) {
            Student.create(
              {
                username: profile.username,
                email: profile._json.email,
                password: "password"
              },
              (error, student) => {
                // console.log('student create', err, student);
                if (err) return next(err);
                return cb(error, student);
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
