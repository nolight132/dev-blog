import { CalendarIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { getAllPosts, mdToPlainText } from "../lib/mdx";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="w-full">
      <h2 className="font-bold text-4xl md:text-5xl">Latest Posts</h2>
      <div className="w-1/2 h-[2px] bg-muted mt-4 mb-6" />
      <ul className="space-y-4">
        {posts.map((post) => {
          const plainText = mdToPlainText(post.content);
          return (
            <li key={post.slug} className="pb-4">
              <Link className="group" href={`/${post.slug}`}>
                <h2 className="text-2xl py-2 font-semibold group-hover:text-accent-foreground transition">
                  {post.meta.title}
                </h2>
                <p className="text-lg truncate">{plainText}</p>
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="size-4" />
                  <p className="text-muted-foreground">{post.meta.date}</p>
                  <div className="space-x-2">
                    {post.meta.tags?.map((tag: string) => (
                      <span
                        key={tag}
                        className="text-foreground bg-muted px-2 py-1 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
