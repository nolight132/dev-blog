import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Peak nolight Zone",
	description: "nolight's blog about software development and other things.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<div className="flex flex-col items-center">
					<div className="flex flex-col w-1/2 justify-center items-center">
						<nav className="flex items-center w-full h-16">
							<Link className="link" href="/">
								nolight
							</Link>
						</nav>
						{children}
					</div>
				</div>
			</body>
		</html>
	);
}
