const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    name: {
      type:      String,
      required:  [true, 'Name is required'],
      trim:      true,
      maxlength: 100,
    },
    email: {
      type:      String,
      required:  [true, 'Email is required'],
      lowercase: true,
      trim:      true,
    },
    subject: {
      type:      String,
      default:   'No subject',
      trim:      true,
      maxlength: 200,
    },
    message: {
      type:      String,
      required:  [true, 'Message is required'],
      maxlength: 3000,
    },
    read: {
      type:    Boolean,
      default: false,
    },
    ip: {
      type:    String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Message', messageSchema);
