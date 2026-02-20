import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blogs = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/archives/blogs" }),
	schema: z.object({
		title: z.string(),
		pubDate: z.date(),
		description: z.string(),
		author: z.string(),
		image: z
			.object({
				url: z.string(),
				alt: z.string(),
			})
			.optional(),
		tags: z.array(z.string()),
	}),
});

export const collections = { blogs };
