import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { getPostBySlug, getPostSlugs, mdToPlainText } from "../../lib/mdx";
import "@/app/styles/highlight-js/rose-pine.css";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import type { Pluggable } from "unified";
import CodeBlock from "../components/CodeBlock";

export async function generateStaticParams() {
	const posts = getPostSlugs();
	return posts.map((post) => ({
		slug: post.replace(/\.mdx$/, ""),
	}));
}

const options = {
	mdxOptions: {
		format: "mdx" as const,
		remarkPlugins: [remarkGfm],
		rehypePlugins: [
			rehypeHighlight as Pluggable,
			rehypeSlug as Pluggable,
			[
				rehypeAutolinkHeadings,
				{
					behavior: "append",
					content: {
						type: "element",
						tagName: "span",
						properties: { className: "anchor" },
					},
				},
			] as Pluggable,
		],
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
		title: `${meta.title} - nolight's zone` || "Article",
		description: mdToPlainText(content).slice(0, 50) || "nolight's article",
	};
}

const Post = async ({ params }: { params: Promise<{ slug: string }> }) => {
	const { slug } = await params;
	const { meta, content } = getPostBySlug(slug);

	return (
		<article className="prose dark:prose-invert md:prose-lg lg:prose-xl w-full">
			<div className="space-x-2">
				{meta.tags?.map((tag: string) => (
					<span
						key={tag}
						className="text-foreground bg-muted px-2 py-1 rounded-md"
					>
						{tag}
					</span>
				))}
			</div>
			<p className="text-muted-foreground font-mono">{meta.date}</p>
			<MDXRemote
				source={content}
				options={options}
				components={{
					pre: CodeBlock,
				}}
			/>
		</article>
	);
};

export default Post;
