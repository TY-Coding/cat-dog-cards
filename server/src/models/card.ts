import mongoose from "mongoose";
const AutoIncrement = require('mongoose-sequence')(mongoose);

const CardSchema = new mongoose.Schema({
  _id: Number,
  imageName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  }
}, { collection: 'Card', _id: false });

CardSchema.plugin(AutoIncrement);

CardSchema.methods = {
  toJSON() {
    return {
      imageName: this.imageName,
      description: this.description,
    }
  }
};

export const CardModel = mongoose.model('Card', CardSchema);