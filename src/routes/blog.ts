import express, { Request, Response } from "express";
import Blog from "../../models/blog";

const router = express.Router();

// API endpoint to find blogs by search query
router.get("/api/blog/:query", async (req: Request, res: Response) => {
  try {
    const query = req.params.query; // Get the search query from the URL parameter

    // Use regular expression to perform a case-insensitive search on the title or content
    const blogs = await Blog.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
      ],
    });

    return res.status(200).json(blogs);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//TODO proper seed file and command

// API endpoint to seed blogs
router.post("/api/blog/seed", async (req: Request, res: Response) => {
  try {
    // Sample blog data to seed
    const sampleBlogs = [
      {
        author: "John Doe",
        title: "Sample Blog 1",
        content: "This is the content of sample blog 1.",
      },
      {
        author: "Jane Smith",
        title: "Sample Blog 2",
        content: "This is the content of sample blog 2.",
      },
      {
        author: "Alice Johnson",
        title: "Sample Blog 3",
        content: "This is the content of sample blog 3.",
      },
      {
        author: "Bob Williams",
        title: "Sample Blog 4",
        content: "This is the content of sample blog 4.",
      },
      {
        author: "Eva Brown",
        title: "Sample Blog 5",
        content: "This is the content of sample blog 5.",
      },
    ];

    // Clear existing blogs
    await Blog.deleteMany({});

    // Insert the sample blogs into the database
    await Blog.insertMany(sampleBlogs);

    return res.status(200).json({ message: "Blogs seeded successfully." });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export { router as blogRouter };
