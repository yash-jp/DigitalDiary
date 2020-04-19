const express = require("express");
const router = express.Router();
const { Notes } = require("../model/notes");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    let user_id = req.user.id;
    let notes = await Notes.find({ userID: user_id });

    if (!notes) {
      res.status(200).json({ status: 0, message: "no notes found" });
    }
    res.status(200).json({ status: 0, message: "notes found", notes: notes });
  } catch (e) {
    res.status(500).json({ status: 1, message: "unexpected error occured!" });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const notes = new Notes({
      userID: req.user.id,
      notesName: req.body.notesName,
      notesCategory: req.body.notesCategory,
      notesTitle: req.body.notesTitle,
      notesDescription: req.body.notesDescription,
      isBookmarked: req.body.isBookmarked,
    });

    const notesSaved = await notes.save();

    res
      .status(200)
      .json({ status: 0, message: "Notes added successfully", notes: notes });
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: 1, message: "unepected error" });
  }
});

// Get all pinned notes
router.get("/:pinned", auth, async (req, res) => {
  let id = req.user.id;
  const pinnedUserdata = req.params.pinned;
  try {
    if (pinnedUserdata == "true") {
      let listofpinneddata = await Notes.find({
        userID: id,
        isBookmarked: true,
      });

      if (!listofpinneddata.length) {
        return res.status(200).send({ status: 0, message: "no pins found" });
      } else if (listofpinneddata) {
        return res.status(200).send({
          status: 0,
          message: "Pinned data found",
          list: listofpinneddata,
        });
      }
    } else if (pinnedUserdata == "false") {
      let listofunpinneddata = await Notes.find({
        userID: id,
        isBookmarked: false,
      });
      if (!listofunpinneddata.length) {
        res.status(200).send({ status: 0, message: "No unpinned data found" });
      } else {
        res.status(200).send({
          status: 200,
          message: "Unpinned data found",
          list: listofunpinneddata,
        });
      }
    } else {
      res
        .status(200)
        .send({ status: 1, message: "Please provide a proper parameter" });
    }
  } catch (e) {
    console.log(e);
    res.status(200).json({
      status: 1,
      message: "Internal Server Error",
    });
  }
});

// Not able to update - update count comes 1
// Update Pinned status
router.put("/", auth, async (req, res) => {
  try {
    let user_id = req.user.id;
    let notesID = req.body.notesid;
    console.log(notesID);
    let data = await Notes.findById({
      _id: req.body.notesid,
    }).select("isBookMarked");
    await Notes.update(
      { _id: notesID },
      { $set: { isBookMarked: !data.isBookMarked } },
      function (err, data) {
        if (err) {
          res.status(200).json({ status: 0, error: err });
        }
        res.status(200).json({ status: 1, data: data, notesid: notesID });
      }
    );
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: 0, message: "Error" });
  }
});

// Update Notes
router.put("/:id", auth, async (req, res) => {
  // let userid = req.user.id;

  try {
    let foundNotes = await Notes.findById({ _id: req.params.id });
    (foundNotes.notesName = req.body.notesName),
      (foundNotes.notesCategory = req.body.notesCategory),
      (foundNotes.notesTitle = req.body.notesTitle),
      (foundNotes.notesDescription = req.body.notesDescription),
      (foundNotes.isBookmarked = req.body.isBookmarked);
    let updated = foundNotes.save();

    res.send("Notes Updated");
  } catch (e) {
    console.log(e);
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", auth, async (req, res) => {
  let user_id = req.user.id;

  try {
    let notesdeleted = await Notes.findByIdAndRemove(req.params.id);
    if (!notesdeleted) {
      res.status(400).send("No notes of the ID found in the database");
    }
    let remainingnotes = await Notes.find({ userID: user_id });
    res.status(200).json({
      status: 0,
      message: "notes deleted sucessfully",
      notes: remainingnotes,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
