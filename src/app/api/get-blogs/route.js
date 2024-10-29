//get the blogs from the database
import Blog from "@/models/blog";
import connectToDatabase from "@/database";
import { NextResponse } from "next/server";

export async function GET(request) {
    try{
        await connectToDatabase();
        const blogs = await Blog.find({});
        if(!blogs){
            return NextResponse.json({ success: false, message: "No blogs found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: blogs }, { status: 200 });
    }catch(error){
        console.log(error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }       
}