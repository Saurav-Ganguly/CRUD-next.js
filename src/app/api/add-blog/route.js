// add blog route
// POST API ROUTE
import Blog from "@/models/blog";
import connectToDatabase from "@/database";
import Joi from "joi";
import { NextResponse } from "next/server";

//define the schema for the blog
const AddNewBlog = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
});

export async function POST(request) {
    try{    
        //connect to database
        await connectToDatabase();
        //extract the data from the request body                            
        const { title, content } = await request.json();
        //validate the data
        const {error} = AddNewBlog.validate({ title, content });
        if(error){
            return NextResponse.json({ success: false, message: error.details[0].message }, { status: 400 });
        }
        //create the blog
        await Blog.create({ title, content });
        return NextResponse.json({ success: true, message: "Blog created successfully" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ sucess: false, message: "Blog creation failed" }, { status: 500 });
    }
}
