const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { parseExcelFile } = require('../utils/excelParser');
const ExcelFile = require('../models/ExcelFile');
const auth = require('../middleware/auth');
const path = require('path');

// @route   POST api/files/upload
// @desc    Upload an Excel file
// @access  Private
router.post('/upload', auth, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }

    // Parse the Excel file
    const sheets = parseExcelFile(req.file.path);

    // Create a new ExcelFile document
    const excelFile = new ExcelFile({
      name: req.file.filename,
      originalName: req.file.originalname,
      path: req.file.path,
      size: req.file.size,
      mimeType: req.file.mimetype,
      uploadedBy: req.user.id,
      sheets: sheets
    });

    // Save the document to MongoDB
    await excelFile.save();

    res.json({
      msg: 'File uploaded successfully',
      file: {
        id: excelFile._id,
        name: excelFile.originalName,
        sheets: excelFile.sheets.map(sheet => ({
          name: sheet.name,
          headers: sheet.headers,
          rowCount: sheet.rowCount,
          columnCount: sheet.columnCount
        }))
      }
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   GET api/files
// @desc    Get all files uploaded by the user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const files = await ExcelFile.find({ uploadedBy: req.user.id })
      .select('name originalName size sheets createdAt')
      .sort({ createdAt: -1 });

    res.json(files);
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   GET api/files/:id
// @desc    Get a specific file by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const file = await ExcelFile.findById(req.params.id);

    if (!file) {
      return res.status(404).json({ msg: 'File not found' });
    }

    // Check if the user is authorized to access this file
    if (file.uploadedBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    res.json(file);
  } catch (error) {
    console.error('Error fetching file:', error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   DELETE api/files/:id
// @desc    Delete a file
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const file = await ExcelFile.findById(req.params.id);

    if (!file) {
      return res.status(404).json({ msg: 'File not found' });
    }

    // Check if the user is authorized to delete this file
    if (file.uploadedBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Delete the file from the filesystem
    const fs = require('fs');
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    // Delete the file from MongoDB
    await file.remove();

    res.json({ msg: 'File deleted' });
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router; 