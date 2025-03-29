const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  url: { type: String, required: true },
  domain: { type: String },
  country_code: { type: String },
  marketplace_pn: { type: String },
  other_pn: { type: String },
  upc: { type: String, default: null },
  model_number: { type: String },
  gtin_ean_pn: { type: String },
  product_name: { type: String, required: true },
  brand: { type: String },
  description: { type: String },
  manufacturer: { type: String },
  date_first_available: { type: Date, default: null },
  county_of_origin: { type: String, default: null },
  badges: { type: Schema.Types.Mixed, default: null },
  initial_price: { type: String },
  final_price: { type: String },
  discount: { type: Number },
  currency: { type: String },
  offers: { type: Schema.Types.Mixed, default: null },
  inventory: { type: Schema.Types.Mixed, default: null },
  in_stock: { type: Boolean, default: true },
  availability: { type: [String], default: [] },
  delivery: { type: Schema.Types.Mixed, default: null },
  seller_name: { type: String },
  seller_id: { type: String },
  seller_url: { type: String },
  other_sellers: { type: Schema.Types.Mixed, default: null },
  root_category: { type: String },
  category_tree: { type: Schema.Types.Mixed, default: null },
  main_image: { type: String },
  image_urls: { type: [String], default: [] },
  videos: { type: Schema.Types.Mixed, default: null },
  rating: { type: Schema.Types.Mixed, default: null },
  reviews_count: { type: Schema.Types.Mixed, default: null },
  top_reviews: { type: Schema.Types.Mixed, default: null },
  answered_questions_count: { type: Schema.Types.Mixed, default: null },
  answered_questions: { type: Schema.Types.Mixed, default: null },
  size: { type: String },
  color: { type: String },
  other_attribute: { type: String },
  features: { type: [String], default: [] },
  dimensions: { type: Schema.Types.Mixed, default: null },
  weight: { type: Schema.Types.Mixed, default: null },
  similar_products: { type: Schema.Types.Mixed, default: null },
  people_bought_together: { type: Schema.Types.Mixed, default: null },
  related_products: { type: Schema.Types.Mixed, default: null },
  sponsored_products: { type: Schema.Types.Mixed, default: null },
  timestamp: { type: Date }
}, { versionKey: false });

// Add text index for full-text search
ProductSchema.index({ product_name: 'text', description: 'text', features: 'text' });

module.exports = mongoose.model('Product', ProductSchema);
