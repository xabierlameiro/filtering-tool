import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeCode, { Options as CodeOptions } from "rehype-pretty-code";

export default async function Post() {
  const markdownFile = fs.readFileSync(
    path.join(process.cwd(), "app/_docs/git.mdx"),
    "utf-8",
  );

  const rehypeCodeOptions: CodeOptions = {
    theme: "dracula",
    keepBackground: true,
  };

  const { content, frontmatter } = await compileMDX({
    source: markdownFile,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [[rehypeCode as any, rehypeCodeOptions]],
      },
    },
  });
  console.log(frontmatter);

  return <>{content}</>;
}

export const runtime = "nodejs";
