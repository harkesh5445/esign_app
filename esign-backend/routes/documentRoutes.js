const express = require("express");
const multer = require("multer");
const Document = require("../models/Document");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); 
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const fileName =
      path.basename(file.originalname, ext) + "-" + Date.now() + ext; 
    cb(null, fileName);
  },
});

const upload = multer({ storage });

router.post("/upload", protect, upload.single("file"), async (req, res) => {
  try {
    const document = new Document({
      user: req.user.id,
      filename: req.file.filename,
      fileUrl: `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`,
    });
    await document.save();
    res.status(201).json({ message: "Document uploaded", document });
  } catch (error) {
    console.error("Error uploading document:", error);
    res.status(500).json({ message: "Error uploading document" });
  }
});


router.post("/sign/:id", protect, async (req, res) => {
  const { signature } = req.body;
  if (!signature) {
    return res.status(400).json({ message: "Signature is required" });
  }

  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    document.signed = true;
    document.signature = signature;
    await document.save();
    res.status(200).json({ message: "Document signed successfully" });
  } catch (error) {
    console.error("Error signing document:", error);
    res.status(500).json({ message: "Error signing document" });
  }
});

router.get("/preview/:id", protect, async (req, res) => {
  const { signature } = req.body;
  try {
    const document = await Document.findById(req.params.id);
    res.status(200).json({ data: document, message: "Document found" });
  } catch (error) {
    return res.status(404).json({ message: "Document not found" });
  }
});

router.get("/all-docs", protect, async (req, res) => {
  try {
    const document = await Document.find();
    res.status(200).json({ data: document });
  } catch (error) {
    return res.status(404).json({ message: "Documents not found" });
  }
});

module.exports = router;
