var express = require("express");
var router = express.Router();
var Mentor = require("../../Models/Mentor");
var Url = require('../../Models/Url')
var auth = require('../../auth/auth')


router.post('/',auth.verifyToken, auth.isMentor, async (req,res) => {
  try {
    console.log(req.body)
    req.body.author = req.user.userID
    var url = await Url.create(req.body)
    res.json({success:true, url})
  } catch(err){
    res.json({success:false, err})
  }
})


router.get('/', auth.verifyToken, async (req,res) => {
  try {
    var url = await Url.find({})
    res.json({success:true, url})
  } catch(err){
    res.json({success:false, err})
  }
})

router.put('/:id',auth.verifyToken, auth.isMentor, async(req,res) => {
  try{
    var url = await Url.findByIdAndUpdate(req.params.id,req.body, {new:true})
    res.json({success:true, url})
  } catch(err){
    res.json({success:false, err})
  }
})

router.delete('/:id',auth.verifyToken, auth.isMentor, async(req,res) => {
  try{
    var url = await Url.findByIdAndRemove(req.params.id,req.body)
    res.json({success:true, url})
  } catch(err){
    res.json({success:false, err})
  }
})




module.exports = router