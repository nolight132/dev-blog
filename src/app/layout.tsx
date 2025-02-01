import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { LightBulbIcon, CodeBracketIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
	title: "Peak nolight Zone",
	description: "nolight's blog about software development and other things.",
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const websiteSourceURL = "https://github.com/nolight132/dev-blog";
	return (
		<html lang="en" className="antialiased">
			<body>
				<div className="flex flex-col items-center p-6">
					<div className="flex flex-col min-h-screen w-full lg:w-1/2 items-center">
						<nav className="flex justify-between items-center w-full h-16 text-accent-foreground">
							<div className="h-full flex items-center">
								<Link className="nav-link text-xl font-bold" href="/">
									<LightBulbIcon className="size-8" />
									<p>nolight Zone</p>
								</Link>
							</div>
							<div className="h-full flex items-center text-muted-foreground hover:text-foreground transition">
								<Link className="nav-link" href={websiteSourceURL}>
									<CodeBracketIcon className="size-6" />
									<p>Source</p>
								</Link>
							</div>
						</nav>
						<div className="w-full py-16 flex justify-center">{children}</div>
					</div>
					<footer>
						<p className="text-muted-foreground">
							&copy; {new Date().getFullYear()} nolight. All rights reserved.
						</p>
					</footer>
				</div>
			</body>
		</html>
	);
}
