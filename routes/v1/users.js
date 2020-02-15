var express = require('express');
var router = express.Router();
var passport = require('passport')

router.get('/login', async(req,res) => {
    res.send('please login')
})

router.get('/auth/github',
  passport.authenticate('github'));

router.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/api/v1/users/login', session:false }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.send('successful');
  });



module.exports = router