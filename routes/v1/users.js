var express = require('express');
var router = express.Router();
var passport = require('passport')
var auth = require('../../auth/auth')
var Student = require('../../Models/Student')
var Mentor = require('../../Models/Mentor')
var users = require('../../controllers/users')


router.post('/login', users.login)

router.get('/auth/github',
  passport.authenticate('github'));

router.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/api/v1/users/login', session:false }),
  async function(req, res) {
    var token = await auth.generateJWT(req.user)
    res.json({success:true,token})
    // res.send('success');
  });


  router.get('/check',auth.verifyToken,auth.isMentor,(req,res) => {
    res.send('helloworld')
  })

module.exports = router