var express = require("express");
var router = express.Router();
var Url = require("../../Models/Url");
var Link = require("../../Models/Link");
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
    var url = await Url.find({}).populate("author links");
    url.forEach(url => {
      (converter = new showdown.Converter()),
        (text = url.body),
        (html = converter.makeHtml(text));
      url.body = html;
      url.links.forEach(link => {
        (converter = new showdown.Converter()),
          (text = link.body),
          (html = converter.makeHtml(text));
        link.body = html;
      });
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

//update url

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

//delete url

router.delete("/:id", auth.verifyToken, auth.isMentor, async (req, res) => {
  try {
    var url = await Url.findByIdAndRemove(req.params.id, req.body);
    res.json({ success: true, url });
  } catch (err) {
    res.json({ success: false, err });
  }
});

//create link

router.post("/:id/links", auth.verifyToken, auth.isMentor, async (req, res) => {
  let id = req.params.id;
  req.body.url = id;
  try {
    var link = await Link.create(req.body);
    await Url.findByIdAndUpdate(id, { $push: { links: link._id } });
    res.json({ success: true, link });
  } catch (err) {
    res.json({ success: false, err });
  }
});

//delete link

router.delete(
  "/:id/links/:linkId",
  auth.verifyToken,
  auth.isMentor,
  async (req, res) => {
    let id = req.params.id;
    let linkId = req.params.linkId;
    try {
      var link = await Link.findByIdAndDelete(linkId);
      await Url.findByIdAndUpdate(
        id,
        { $pull: { links: linkId } },
        { new: true }
      );
      res.json({ success: true, link });
    } catch (err) {
      res.json({ success: false, err });
    }
  }
);
module.exports = router;
