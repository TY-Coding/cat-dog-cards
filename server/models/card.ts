import mongoose from "mongoose";
const AutoIncrement = require('mongoose-sequence')(mongoose);

const CardSchema = new mongoose.Schema({
  _id: Number,
  imageUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
}, { collection: 'Card', _id: false });

CardSchema.plugin(AutoIncrement);

CardSchema.methods = {
  toJson() {
    return {
      imageUrl: this.imageUrl,
      description: this.description,
    }
  }
};

export const CardModel = mongoose.model('Card', CardSchema);