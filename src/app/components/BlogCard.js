import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function BlogCard({ blog, onEdit, onDelete }) {
    return (
        <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle>{blog.title}</CardTitle>
                    <div className="space-x-2">
                        <Button
                            onClick={() => onEdit(blog)}
                            variant="default"
                            size="sm"
                        >
                            Edit
                        </Button>
                        <Button
                            onClick={() => onDelete(blog._id)}
                            variant="destructive"
                            size="sm"
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground line-clamp-3">{blog.content}</p>
            </CardContent>
        </Card>
    );
} 