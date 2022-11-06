const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", messageSchema);