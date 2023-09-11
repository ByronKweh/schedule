import mongoose from "mongoose";

// Define the Blog Schema
const blogSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

// Create the Blog model
const Blog = mongoose.model("Blog", blogSchema);

// Export the Blog model
export default Blog;
