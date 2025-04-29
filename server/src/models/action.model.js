import mongoose from "mongoose";

const actionSchema = new mongoose.Schema({
  name: { type: String},
  pageId: { type:String},
  code: { type: String  },
  order: { type: Number, default: 1 },
}); 

// Export the Role model
const Actions = mongoose.model("Actions", actionSchema);
export default Actions;
