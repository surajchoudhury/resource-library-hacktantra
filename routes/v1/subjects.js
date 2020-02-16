var express = require("express");
var router = express.Router();
var Subject = require('../../Models/Subject')
var Mentor = require('../../Models/Mentor')
var auth = require('../../auth/auth')
var subjects = require('../../controllers/subjects')
// var modulesRouter = require('./modules')
var Module = require('../../Models/Module')



//get subjects
router.get("/", auth.verifyToken, subjects.getAllSubjects);

//create subjects
router.post("/", auth.verifyToken, auth.isMentor, subjects.createSubject);

//update subjects
router.put("/:id", auth.verifyToken, auth.isMentor, subjects.updateSubject);

//delete subjects
router.delete("/:id", auth.verifyToken, auth.isMentor, subjects.updateSubject);

//get all modules
router.get('/:subjectid/modules',auth.verifyToken, async (req,res) =>{
  try {
    var modules = await Module.find({})
    res.json({success:true, module: modules})
  } catch(error){
    res.status(400).json(error)
  }
})

//create module
router.post('/:subjectid/modules', auth.verifyToken, auth.isMentor, async (req,res) => {
  try {
    req.body.author = req.user.userID
    req.body.subject = req.params.subjectid
    var newModule = await Module.create(req.body)
    var subjectUpdate = await Subject.findByIdAndUpdate(req.params.subjectid,{$push: {"modules": newModule._id}})
    res.json({success:true, newModule})
  } catch(error){
    res.status(400).json(error)
  }
})

//update article
router.put('/:subjectid/modules/:moduleid', auth.verifyToken, auth.isMentor, async(req,res) => {
  try {
    var updatedModule = await Module.findByIdAndUpdate(req.params.moduleid,req.body,{new:true})
    res.json({success:true, module:updatedModule})
  }catch(error){
    res.status(400).json(error)
  }
})

//delete module 
router.delete('/:subjectid/modules/:moduleid',auth.verifyToken, auth.isMentor, async(req,res) => {
  try{
    var deletedModule = await Module.findByIdAndRemove(req.params.moduleid)
    var subjectUpdate = await Subject.findByIdAndUpdate(req.params.subjectid,{$pull: {"modules": req.params.moduleid}})
    res.json({success:true, msg:`successfully deleted ${deletedModule.title}`})
  } catch(error){
    res.status(400).json(error)
  }
})

module.exports = router
