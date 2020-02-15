// var express =  require('express');
// var router = express.Router();
// var Subject = require('../../Models/Subject')
// var Mentor = require('../../Models/Mentor')
// var auth = require('../../auth/auth')
// var Module = require('../../Models/Module')

// //create module
// router.post('/', auth.verifyToken, auth.isMentor, async (req,res) => {
//   try {
//     console.log(req)
//     req.body.subject = req.params.subjectid
//     var module = await Module.create(req.body)
//     res.json({success:true, module})
//   } catch(error){
//     res.status(400).json(error)
//   }
// })



// module.exports = router