import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getPostSlugs, mdToPlainText } from "../../lib/mdx";
import type { Metadata } from "next";
import rehypeHighlight from "rehype-highlight";
import "@/app/styles/highlight-js/rose-pine.css";

export async function generateStaticParams() {
	const posts = getPostSlugs();
	return posts.map((post) => ({
		slug: post.replace(/\.mdx$/, ""),
	}));
}

const options = {
	mdxOptions: {
		remarkPlugins: [],
		rehypePlugins: [rehypeHighlight],
	},
};

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const { meta, content } = getPostBySlug(slug);

	return {
		title: `${meta.title} - nolight's Zone` || "Article",
		description: mdToPlainText(content).slice(0, 50) || "nolight's article",
	};
}

const Post = async ({ params }: { params: Promise<{ slug: string }> }) => {
	const { slug } = await params;
	const { meta, content } = getPostBySlug(slug);

	return (
		<article className="prose dark:prose-invert md:prose-lg lg:prose-xl w-full py-16">
			<p className="text-gray-400">{meta.date}</p>
			<MDXRemote source={content} options={options} />
		</article>
	);
};

export default Post;
