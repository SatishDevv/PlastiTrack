import mongoose from "mongoose";

// Schema for role claims
const roleClaimSchema = new mongoose.Schema({
    actionId: { type: String}, // Unique ID for the action
    claimType: { type: String }, // Type of the claim (e.g., 'READ', 'WRITE')
    claimValue: { type: String }, // Value associated with the claim (e.g., 'TENANTS_VIEW')
    roleId: { type: String }, // Value associated with the claim (e.g., 'TENANTS_VIEW')
  });

const roleSchema = new mongoose.Schema({
    
    roleName: { type: String, required: true },
    claims: [roleClaimSchema], // Array of claims associated with the role


}, { timestamps: true });

const roleModel = mongoose.model("Role", roleSchema);

export default roleModel;
