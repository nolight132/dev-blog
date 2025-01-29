import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "src/posts");

export function getPostSlugs() {
	return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string) {
	const realSlug = slug.replace(/\.mdx$/, "");
	const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
	const fileContents = fs.readFileSync(fullPath, "utf8");
	const { data, content } = matter(fileContents);

	return { slug: realSlug, meta: data, content };
}

export function getAllPosts() {
	const slugs = getPostSlugs();
	const posts = slugs
		.map((slug) => getPostBySlug(slug))
		.sort((post1, post2) => (post1.meta.date > post2.meta.date ? -1 : 1));
	return posts;
}

export function mdToPlainText(str: string): string {
	let strFormatted = str;

	// Remove headers completely
	strFormatted = strFormatted.replace(/^#{1,6}\s*.*$/gm, "");

	// Remove bold and italic formatting
	strFormatted = strFormatted.replace(/(\*\*|__)(.*?)\1/g, "$2");
	strFormatted = strFormatted.replace(/(\*|_)(.*?)\1/g, "$2");

	// Remove links but keep text
	strFormatted = strFormatted.replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1");

	// Remove inline code
	strFormatted = strFormatted.replace(/`([^`]+)`/g, "$1");

	// Remove lists
	strFormatted = strFormatted.replace(/^[-*]\s+(.*)/gm, "$1");

	// Remove HTML tags
	strFormatted = strFormatted.replace(/<\/?.+?>/g, "");

	// Trim extra empty lines
	strFormatted = strFormatted.replace(/\n{2,}/g, "\n").trim();

	return strFormatted;
}
