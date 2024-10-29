//update the blog in the database
import Blog from "@/models/blog";
import connectToDatabase from "@/database";
import { NextResponse } from "next/server";
import Joi from 'joi';

// Add schema definition at the top of the file
const blogUpdateSchema = Joi.object({
    title: Joi.string().required().trim().min(1).max(200),
    content: Joi.string().required().trim().min(1)
}).unknown(true);

export async function PUT(request, { params }) {
    // Extract id from params and blog data from request body
    const { id } = params;
    const body = await request.json();

    // Add logging to see what data we're receiving
    console.log('Request body:', body);

    // Validate id parameter
    if (!id) {
        return NextResponse.json(
            { success: false, message: "Blog ID is required" }, 
            { status: 400 }
        );
    }

    // Validate request body using Joi
    const { error, value } = blogUpdateSchema.validate(body, { abortEarly: false });
    
    if (error) {
        // Add detailed error logging
        console.log('Validation error:', error.details);
        return NextResponse.json(
            { 
                success: false, 
                message: "Validation error", 
                errors: error.details.map(err => err.message)
            }, 
            { status: 400 }
        );
    }

    try {
        // Connect to database
        await connectToDatabase();

        // Find blog by ID and validate existence
        const blog = await Blog.findById(id);
        if (!blog) {
            return NextResponse.json(
                { success: false, message: "Blog not found" }, 
                { status: 404 }
            );
        }

        // Update blog fields
        blog.title = value.title;
        blog.content = value.content;
        
        // Save changes to database
        await blog.save();

        return NextResponse.json(
            { success: true, message: "Blog updated successfully" }, 
            { status: 200 }
        );
    } catch (error) {
        console.error('Error updating blog:', error);
        
        // Handle specific MongoDB errors
        if (error.name === 'ValidationError') {
            return NextResponse.json(
                { success: false, message: "Invalid blog data" }, 
                { status: 400 }
            );
        }

        return NextResponse.json(
            { success: false, message: "Failed to update blog" }, 
            { status: 500 }
        );
    }   
}   
    