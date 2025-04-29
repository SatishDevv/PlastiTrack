
import Actions from "../models/action.model.js";

export const createActions = async (req, res) => {
    const { tenantId, name, pageId, code, order } = req.body;

  try {
    // Create a new action entry
    const newAction = new Actions({
      tenantId,
      name,
      pageId,
      code,
      order,
    });

    // Save the action to the database
    const savedAction = await newAction.save();
    res.status(201).json(savedAction);
  } catch (error) {
    res.status(500).json({ message: "Failed to create action", error: error.message });
  }
};
