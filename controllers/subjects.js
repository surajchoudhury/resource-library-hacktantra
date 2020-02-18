var Subject = require("../Models/Subject");
var Mentor = require("../Models/Mentor");

module.exports = {
  createSubject: async (req, res) => {
    try {
      var subject = await Subject.create(req.body);
      res.json({ succes: true, subject });
    } catch (error) {
      res.status(400).json(error);
    }
  },
  getAllSubjects: async (req, res) => {
    try {
      var subjects = await Subject.find({}).populate("modules");
      res.json({ success: true, subjects });
    } catch (error) {
      res.status(400).json(error);
    }
  },
  updateSubject: async (req, res) => {
    try {
      var subject = await Subject.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      });
      res.json({ success: true, subject });
    } catch (error) {
      res.status(400).json(error);
    }
  },

  deleteSubject: async (req, res) => {
    let id = req.params.id;
    try {
      var deletedSubject = await Subject.findByIdAndRemove(id);
      res.json({
        success: true,
        msg: `succesfully deleted ${deletedSubject.title}`
      });
    } catch (error) {
      res.status(400).json(error);
    }
  }
};
