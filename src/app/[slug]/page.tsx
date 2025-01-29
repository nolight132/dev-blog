import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getPostSlugs } from "../../lib/mdx";

export async function generateStaticParams() {
	const posts = getPostSlugs();
	return posts.map((post) => ({
		slug: post.replace(/\.mdx$/, ""),
	}));
}

export default async function Post({ params }: { params: { slug: string } }) {
	const { slug } = await params;
	const { meta, content } = getPostBySlug(slug);

	return (
		<article className="prose dark:prose-invert md:prose-lg lg:prose-xl w-full mt-16">
			<p className="text-gray-400">{meta.date}</p>
			<MDXRemote source={content} />
		</article>
	);
}
