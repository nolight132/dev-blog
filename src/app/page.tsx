import Link from "next/link";
import { getAllPosts, mdToPlainText } from "../lib/mdx";
import { CalendarIcon } from "@heroicons/react/24/outline";

export default function Home() {
	const posts = getAllPosts();

	return (
		<div className="w-full">
			<h2 className="font-bold text-4xl mb-6">Latest Posts</h2>
			<ul className="space-y-4">
				{posts.map((post) => {
					// Convert MDX content to plain text
					const plainText = mdToPlainText(post.content);

					return (
						<li key={post.slug} className="pb-4">
							<Link href={`/${post.slug}`}>
								<h2 className="text-xl font-semibold hover:text-blue-300">
									{post.meta.title}
								</h2>
								<p>{plainText.slice(0, 100)}...</p>
								<div className="flex items-center space-x-2">
									<CalendarIcon className="size-4" />
									<p className="text-gray-500">{post.meta.date}</p>
								</div>
							</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
