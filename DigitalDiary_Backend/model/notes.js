const mongoose = require("mongoose");
const joi = require("joi");

const Notes = mongoose.model(
  "notes",
  new mongoose.Schema({
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    },
    notesName: {
      type: String,
      maxlength: 50
    },
    notesCategory: {
      type: String,
      default: "general"
    },
    notesTitle: {
      type: String,
      maxlength: 50
    },
    notesDescription: {
      type: String,
      maxlength: 500
    },
    isBookMarked: {
      type: Boolean,
      default: false
    }
  })
);

module.exports.Notes = Notes;
