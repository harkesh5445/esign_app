const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  filename: { type: String, required: true },
  fileUrl: { type: String, required: true },
  signed: { type: Boolean, default: false },
  signature: { type: String },
  // New field
  dateUploaded: { type: Date, default: Date.now } // Adding a dateUploaded field
});

const Document = mongoose.model("Document", documentSchema);

module.exports = Document;
