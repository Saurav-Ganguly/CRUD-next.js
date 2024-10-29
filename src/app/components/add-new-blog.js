"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";


export default function AddNewBlog({ open, setOpen, handleSubmit, blogFormData, setBlogFormData, isEditing, setIsEditing }) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleTitleChange = (e) => {
        setBlogFormData({ 
            ...blogFormData, 
            title: e.target.value 
        });
    };

    const handleContentChange = (e) => {
        setBlogFormData({ 
            ...blogFormData, 
            content: e.target.value 
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await handleSubmit(e);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
         <section className="mb-8">
         <Dialog open={open} onOpenChange={(open) => {
            setOpen(open);
            setIsEditing(false);
            setBlogFormData({
                title: "",
                content: "",
                id: null,
            });
         }}>
             <DialogTrigger asChild>
                 <Button>Add New Blog</Button>
             </DialogTrigger>``
             <DialogContent>
                 <DialogHeader>
                     <DialogTitle>{isEditing ? "Edit Blog Post" : "Create New Blog Post"}</DialogTitle>
                 </DialogHeader>
                 <form  className="space-y-4">
                     <div className="space-y-2">
                         <Label htmlFor="title">Title</Label>
                         <Input 
                             id="title"
                             placeholder="Enter blog title"
                             value={blogFormData.title}
                             onChange={handleTitleChange}
                         />
                     </div>
                     <div className="space-y-2">
                         <Label htmlFor="content">Content</Label>
                         <Textarea
                             id="content"
                             placeholder="Write your blog content here"
                             className="min-h-[200px]"
                             value={blogFormData.content}
                             onChange={handleContentChange}
                         />
                     </div>
                     <Button 
                         onClick={onSubmit} 
                         disabled={isSubmitting}
                     >
                         {isSubmitting ? "Submitting..." : "Submit"}
                     </Button>
                 </form>
             </DialogContent>
         </Dialog>
     </section>
    );
}
