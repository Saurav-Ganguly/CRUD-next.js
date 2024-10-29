"use client";

import { useState, useEffect } from "react";
import AddNewBlog from "./add-new-blog";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createBlog, updateBlog, deleteBlog } from "@/app/lib/blogOperations";
import BlogCard from "./BlogCard";
import { toast } from "sonner";

export default function BlogOverview({ blogs }) {
    const [open, setOpen] = useState(false);
    const [blogFormData, setBlogFormData] = useState({
        title: "",
        content: "",
    });
    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();
    useEffect(() => {
        router.refresh();
    }, []);

    const resetFormData = () => {
        setBlogFormData({
            title: "",
            content: "",
            id: null,
        });
        setIsEditing(false);
    };

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if (isEditing) {
                await handleUpdate();
            } else {
                await handleCreate();
            }
            toast.success(isEditing ? "Blog updated successfully" : "Blog created successfully");
        } catch (error) {
            toast.error(error.message);
        }
    }

    async function handleCreate() {
        await createBlog(blogFormData);
        setOpen(false);
        resetFormData();
        router.refresh();
    }

    async function handleUpdate() {
        await updateBlog(blogFormData.id, blogFormData);
        setOpen(false);
        resetFormData();
        router.refresh();
    }

    const handleEdit = (blog) => {
        setBlogFormData({
            title: blog.title,
            content: blog.content,
            id: blog._id,
        });
        setIsEditing(true);
        setOpen(true);
    };

    const handleDelete = async (blogId) => {
        if (window.confirm("Are you sure you want to delete this blog post?")) {
            try {
                await deleteBlog(blogId);
                toast.success("Blog deleted successfully");
                router.refresh();
            } catch (error) {
                toast.error(error.message);
            }
        }
    };

    return (
        <div className="p-8">
            <AddNewBlog
                open={open}
                setOpen={setOpen}
                handleSubmit={handleSubmit}
                blogFormData={blogFormData}
                setBlogFormData={setBlogFormData}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
            />

            {blogs.length > 0 ? (
                <section className="space-y-6">
                    <h2 className="text-3xl font-bold">Blog Posts</h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {blogs.map((blog) => (
                            <BlogCard
                                key={blog._id}
                                blog={blog}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                </section>
            ) : (
                <div className="flex justify-center items-center h-full">
                    <h2 className="text-2xl font-bold">No blogs found</h2>
                </div>
            )}
        </div>
    );
}
