var Student = require('../Models/Student');
var Mentor = require('../Models/Mentor')
var auth = require('../auth/auth')

module.exports = {
  login: async(req,res) => {
    try{
    var student = await Student.findOne({username:req.body.username});
    if(!student) {
      var mentor = await Mentor.findOne({username:req.body.username});
      if(!mentor){
        return res.json({success:false, msg:'invalid credentials'})
      }
      var validate = await mentor.verifyPassword(req.body.password)

      if(!validate){
        return res.json({success:false, msg:'invalid credentials'})
      }
      var token = await auth.generateJWT(mentor)  
      res.json({success:true,token})
     }
     else{
      var validate = await student.verifyPassword(req.body.password)
      if(!validate){
        return res.json({success:false, msg:'invalid credentials'})
      }
      var token = await auth.generateJWT(student)
      res.json({success:true,token})
     }
    }catch(error){
      res.status(400).json({success:false,error})
    }
  }
}