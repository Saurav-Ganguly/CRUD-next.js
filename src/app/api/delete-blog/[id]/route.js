import Blog from "@/models/blog";
import connectToDatabase from "@/database";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
    const { id } = params;
    
    if (!id) {
        return NextResponse.json(
            { success: false, message: "Blog ID is required" },
            { status: 400 }
        );
    }

    try {
        await connectToDatabase();
        
        const blog = await Blog.findById(id);
        if (!blog) {
            return NextResponse.json(
                { success: false, message: "Blog not found" },
                { status: 404 }
            );
        }

        await Blog.findByIdAndDelete(id);
        return NextResponse.json(
            { success: true, message: "Blog deleted successfully" }
        );

    } catch (error) {
        // Handle specific MongoDB errors
        if (error.name === 'CastError') {
            return NextResponse.json(
                { success: false, message: "Invalid blog ID format" },
                { status: 400 }
            );
        }

        // Handle database connection errors
        if (error.name === 'MongooseError' || error.name === 'MongoError') {
            return NextResponse.json(
                { success: false, message: "Database error occurred" },
                { status: 503 }
            );
        }

        // Generic error handler
        console.error('Delete blog error:', error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
} 