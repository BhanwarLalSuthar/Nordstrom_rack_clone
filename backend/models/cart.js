const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, default: 1 }
}, { timestamps: true, versionKey: false });

// Ensure that each user-product combination is unique
CartSchema.index({ user: 1, product: 1 }, { unique: true });

module.exports = mongoose.model('Cart', CartSchema);
