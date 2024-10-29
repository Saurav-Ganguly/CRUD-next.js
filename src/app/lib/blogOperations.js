/**
 * Handles all blog-related API operations
 */

// Create a new blog post
export async function createBlog(blogData) {
    try {
        const response = await fetch("/api/add-blog", {
            method: "POST",
            body: JSON.stringify(blogData),
        });
        
        if (!response.ok) {
            throw new Error(`Failed to create blog: ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        throw new Error(`Error creating blog: ${error.message}`);
    }
}

// Update an existing blog post
export async function updateBlog(blogId, blogData) {
    try {
        const response = await fetch(`/api/update-blog/${blogId}`, {
            method: "PUT",
            body: JSON.stringify(blogData),
        });
        
        if (!response.ok) {
            throw new Error(`Failed to update blog: ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        throw new Error(`Error updating blog: ${error.message}`);
    }
}

// Delete a blog post
export async function deleteBlog(blogId) {
    try {
        const response = await fetch(`/api/delete-blog/${blogId}`, {
            method: "DELETE",
        });
        
        if (!response.ok) {
            throw new Error(`Failed to delete blog: ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        throw new Error(`Error deleting blog: ${error.message}`);
    }
} 