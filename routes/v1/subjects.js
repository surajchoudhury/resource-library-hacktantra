var express = require("express");
var router = express.Router();
var Subject = require("../../Models/Subject");
var Mentor = require("../../Models/Mentor");
var auth = require("../../auth/auth");
var subjects = require("../../controllers/subjects");
// var modulesRouter = require('./modules')
var Chapter = require("../../Models/Chapter");
var Module = require("../../Models/Module");
var showdown = require("showdown");
//get subjects
router.get("/", auth.verifyToken, subjects.getAllSubjects);

// get single subject

router.get("/:subjectid", auth.verifyToken, async (req, res) => {
  try {
    var subject = await Subject.findById(req.params.subjectid).populate({
      path: "modules",
      populate: { path: " chapters author subject" }
    });
    res.json({ success: true, subject });
  } catch (error) {
    res.status(400).json(error);
  }
});

//create subjects
router.post("/", auth.verifyToken, auth.isMentor, subjects.createSubject);

//update subjects
router.put("/:id", auth.verifyToken, auth.isMentor, subjects.updateSubject);

//delete subjects
router.delete("/:id", auth.verifyToken, auth.isMentor, subjects.deleteSubject);

//get all modules
router.get("/:subjectid/modules", auth.verifyToken, async (req, res) => {
  try {
    var modules = await Module.find({ subject: req.params.subjectid }).populate(
      "author subject"
    );
    res.json({ success: true, module: modules });
  } catch (error) {
    res.status(400).json(error);
  }
});

// get single module

router.get(
  "/:subjectid/modules/:moduleid",
  auth.verifyToken,
  async (req, res) => {
    try {
      var getModule = await Module.findById(req.params.moduleid).populate(
        "author subject chapters"
      );
      var MDmodule = await Module.findById(req.params.moduleid).populate(
        "author subject chapters"
      );

      (converter = new showdown.Converter()),
        (text = getModule.body),
        (html = await converter.makeHtml(text));
      getModule.body = html;
      res.json({ success: true, module: getModule, MDmodule });
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

//create module

router.post(
  "/:subjectid/modules",
  auth.verifyToken,
  auth.isMentor,
  async (req, res) => {
    try {
      req.body.author = req.user.userID;
      req.body.subject = req.params.subjectid;
      var newModule = await Module.create(req.body);
      await Subject.findByIdAndUpdate(req.params.subjectid, {
        $push: { modules: newModule._id }
      });
      await Mentor.findByIdAndUpdate(req.body.author, {
        $push: { createdModules: newModule._id }
      });
      res.json({ success: true, newModule });
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

//update module

router.put(
  "/:subjectid/modules/:moduleid",
  auth.verifyToken,
  auth.isMentor,
  async (req, res) => {
    try {
      var updatedModule = await Module.findByIdAndUpdate(
        req.params.moduleid,
        req.body,
        { new: true }
      );
      res.json({ success: true, module: updatedModule });
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

//delete module

router.delete(
  "/:subjectid/modules/:moduleid",
  auth.verifyToken,
  auth.isMentor,
  async (req, res) => {
    try {
      req.body.author = req.user.userID;
      var deletedModule = await Module.findByIdAndRemove(req.params.moduleid);
      var subjectUpdate = await Subject.findByIdAndUpdate(
        req.params.subjectid,
        { $pull: { modules: req.params.moduleid } }
      );
      await Mentor.findByIdAndUpdate(req.body.author, {
        $pull: { createdModules: req.params.moduleid }
      });
      res.json({
        success: true,
        msg: `successfully deleted ${deletedModule.title}`
      });
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

//get all chapters

router.get(
  "/:subjectid/modules/:moduleid/chapters",
  auth.verifyToken,
  auth.isMentor,
  async (req, res) => {
    try {
      var chapter = await Chapter.find({});
      res.json({ success: true, chapter });
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

// get chapter

router.get(
  "/:subjectid/modules/:moduleid/chapters/:chapterid",
  auth.verifyToken,
  auth.isMentor,
  async (req, res) => {
    try {
      req.body.chapter = req.params.chapterid;
      var getChapter = await Chapter.findById(req.body.chapter).populate(
        "module"
      );
      var MDchapter = await Chapter.findById(req.body.chapter).populate(
        "module"
      );
      (converter = new showdown.Converter()),
        (text = getChapter.body),
        (html = await converter.makeHtml(text)),
        (getChapter.body = html);
      res.json({ success: true, chapter: getChapter, MDchapter });
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

//create chapter

router.post(
  "/:subjectid/modules/:moduleid/chapters",
  auth.verifyToken,
  auth.isMentor,
  async (req, res) => {
    try {
      req.body.module = req.params.moduleid;
      var newChapter = await Chapter.create(req.body);

      var module = await Module.findByIdAndUpdate(
        req.body.module,
        {
          $push: { chapters: newChapter._id }
        },
        { new: true }
      );

      await Chapter.findByIdAndUpdate();

      res.json({ success: true, module });
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

//update a chapter

router.put(
  "/:subjectid/modules/:moduleid/chapters/:chapterid",
  auth.verifyToken,
  auth.isMentor,
  async (req, res) => {
    try {
      req.body.chapter = req.params.chapterid;
      var updatedChapter = await Chapter.findByIdAndUpdate(
        req.body.chapter,
        req.body,
        { new: true }
      );
      res.json({ success: true, updatedChapter });
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

//delete a chapter

router.delete(
  "/:subjectid/modules/:moduleid/chapters/:chapterid",
  auth.verifyToken,
  auth.isMentor,
  async (req, res) => {
    try {
      var deletedChapter = await Chapter.findByIdAndRemove(
        req.params.chapterid
      );
      await Module.findByIdAndUpdate(req.params.module, {
        $pull: { chapters: req.params.chapterid }
      });

      res.json({ success: true, deletedChapter });
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

module.exports = router;
