var express = require("express");
var router = express.Router();
var Mentor = require("../../Models/Mentor");
var Url = require("../../Models/Url");
var auth = require("../../auth/auth");
var showdown = require("showdown");

router.post("/", auth.verifyToken, auth.isMentor, async (req, res) => {
  try {
    req.body.author = req.user.userID;
    var url = await Url.create(req.body);
    res.json({ success: true, url });
  } catch (err) {
    res.json({ success: false, err });
  }
});

//get all

router.get("/", auth.verifyToken, async (req, res) => {
  try {
    var url = await Url.find({}).populate("author");
    url.forEach(url => {
      (converter = new showdown.Converter()),
        (text = url.body),
        (html = converter.makeHtml(text));
      url.body = html;
    });
    res.json({ success: true, url });
  } catch (err) {
    res.json({ success: false, err });
  }
});

// getbyid

router.get("/:id", auth.verifyToken, async (req, res) => {
  try {
    var MDurl = await Url.findById(req.params.id).populate("author");
    var url = await Url.findById(req.params.id);
    if (!MDurl) return res.json({ success: false, message: "Invalid url id" });
    var html;
    (converter = new showdown.Converter()),
      (text = MDurl.body),
      (html = await converter.makeHtml(text));
    MDurl.body = html;
    res.json({ success: true, MDurl, url });
  } catch (err) {
    res.json({ success: false, err });
  }
});

router.put("/:id", auth.verifyToken, auth.isMentor, async (req, res) => {
  try {
    var url = await Url.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.json({ success: true, url });
  } catch (err) {
    res.json({ success: false, err });
  }
});

router.delete("/:id", auth.verifyToken, auth.isMentor, async (req, res) => {
  try {
    var url = await Url.findByIdAndRemove(req.params.id, req.body);
    res.json({ success: true, url });
  } catch (err) {
    res.json({ success: false, err });
  }
});

module.exports = router;
