var express =  require('express');
var router = express.Router();
var Subject = require('../../Models/Subject')
var Mentor = require('../../Models/Mentor')
var auth = require('../../auth/auth')
var subjects = require('../../controllers/subjects')

//get subjects
router.get('/', auth.verifyToken, subjects.getAllSubjects)

//create subjects
router.post('/',auth.verifyToken,auth.isMentor,subjects.createSubject)


//update subjects
router.put('/:id', auth.verifyToken, auth.isMentor, subjects.updateSubject)

//delete subjects
router.delete('/:id',auth.verifyToken, auth.isMentor, subjects.updateSubject)

module.exports = router