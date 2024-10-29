// define the schema
import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: String,
    content: String,
});

const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

export default Blog;