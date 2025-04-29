import mongoose from "mongoose";

// Schema for role claims
const pageSchema = new mongoose.Schema({
  name: { type: String },
  order: { type: String },
});

// Export the Role model
const Pages = mongoose.model("Pages", pageSchema);
export default Pages;
