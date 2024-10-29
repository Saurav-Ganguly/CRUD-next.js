import Image from "next/image";
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl md:text-6xl font-bold text-white text-center">
        Browse our blog collection
      </h1>
      <Link href="/blogs">
        <Button size="lg" variant="secondary" className="text-lg">
          View All Blogs
        </Button>
      </Link>
    </div>
  );
}
