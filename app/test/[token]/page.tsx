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
    theme: {
      dark: "github-dark-dimmed",
      light: "github-light",
    },
    keepBackground: true,
    grid: true,
  };

  const { content, frontmatter } = await compileMDX<{
    title: string;
    answers: { value: string }[];
  }>({
    source: markdownFile,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [[rehypeCode as any, rehypeCodeOptions]],
      },
    },
  });

  const Answers = frontmatter.answers.map((answer) => {
    return (
      <div key={answer.value}>
        <p>{answer.value}</p>
      </div>
    );
  });

  return (
    <>
      {content}
      {Answers}
    </>
  );
}

export const runtime = "nodejs";
