import BlogOverview from "@/app/components/BlogOverview";

async function getBlogs(){
    const apiUrl = "http://localhost:3000/api/get-blogs";
    const response = await fetch(apiUrl, {
        method: "GET",
        cache: "no-store",
    });
    const result = await response.json();
    return result.data;
}

export default async function Blogs() {
    const blogs = await getBlogs();
    return <BlogOverview blogs={blogs} />;
}   