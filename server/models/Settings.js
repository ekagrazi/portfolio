const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema(
  {
    resumeDriveLink: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Settings', settingsSchema);
