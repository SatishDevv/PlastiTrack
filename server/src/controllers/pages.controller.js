import Pages from "../models/pages.model.js";

  
  // Create a new page
  export const createPage = async (req, res) => {
    const pages = req.body;
  
    // Validate request body
    if (!Array.isArray(pages) || pages.length === 0) {
      return res.status(400).json({ message: 'An array of pages with name and order fields is required' });
    }
  
    try {
      const newPages = await Pages.insertMany(pages); // Bulk insert array of pages
      res.status(201).json(newPages);
    } catch (error) {
      res.status(500).json({ message: 'Error creating pages', error });
    }
  };
  