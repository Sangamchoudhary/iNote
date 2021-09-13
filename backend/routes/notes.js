const express = require("express");
const router = express.Router();
const fetchuser = require("../middleWare/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// 🚀 Route 1: Get all the notes --> using: GET "/api/notes/fetchallnotes" --> Login required <--
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("some error occured");
  }
});

// 🚀 Route 2: Add your notes --> using: POST "/api/notes/addnotes" --> Login required <--
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "description must be at least 6 Characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      // If there are errors return Bad request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("some error occured");
    }
  }
);

// 🚀 Route 3: Update an existing note --> using: PUT "/api/notes/updatenote" --> Login required <--
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    //Destructuring to get what we need to update
    const { title, description, tag } = req.body;

    //Create a new node object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //Find the note to be updated and update it
    let note = await Notes.findById(req.params.id); // Checking note exist or not
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      //Which user want to update the note
      return res.status(404).send("Not Allowed");
    }

    //If the note and user are genuine then we move forward to update it
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("some error occured");
  }
});

// 🚀 Route 4: Delete an existing note --> using: DELETE "/api/notes/deletenote" --> Login required <--
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    //Find the note to be delete and then delete it
    let note = await Notes.findById(req.params.id); // Checking note exist or not
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      //checking user is genuine or not
      return res.status(404).send("Deletion Not Allowed");
    }

    //If the note and user are genuine then we move forward to update it
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted" , note:note});
  } catch (error) {
    console.log(error.message);
    res.status(500).send("some error occured");
  }
});

module.exports = router;
