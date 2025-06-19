"use client";

import { CheckIcon, ClipboardIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import React, {
	type ReactNode,
	isValidElement,
	type ReactElement,
} from "react";

const CodeBlock = ({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) => {
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		// Extract the text content from the children (code block)
		const extractText = (node: ReactNode): string => {
			if (typeof node === "string" || typeof node === "number") {
				return node.toString();
			}
			if (Array.isArray(node)) {
				return node.map(extractText).join("");
			}
			if (isValidElement(node)) {
				const element = node as ReactElement<{ children?: ReactNode }>;
				if (element.props.children) {
					return extractText(element.props.children);
				}
			}
			return "";
		};

		const textToCopy = extractText(children);

		// Copy the text to the clipboard
		navigator.clipboard
			.writeText(textToCopy)
			.then(() => {
				setCopied(true); // Show the checkmark icon
				setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
			})
			.catch((err) => {
				console.error("Failed to copy text: ", err);
			});
	};

	return (
		<div className="relative rounded-xl overflow-x-auto group">
			<div className="absolute top-2 right-2 flex items-center gap-2">
				<button
					type="button"
					onClick={handleCopy}
					className="p-2 rounded bg-zinc-800 hover:bg-zinc-700 transition"
					aria-label="Copy code"
				>
					{copied ? (
						<CheckIcon className="size-6" />
					) : (
						<ClipboardIcon className="size-6" />
					)}
				</button>
			</div>
			<pre className={`hljs ${className || ""}`}>{children}</pre>
		</div>
	);
};

export default CodeBlock;
