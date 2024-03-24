import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeCode, { Options as CodeOptions } from "rehype-pretty-code";
import RadioButtonGroup from "./_components/radioButtons";

const rehypeCodeOptions: CodeOptions = {
  theme: {
    dark: "github-dark-dimmed",
    light: "github-light",
  },
  keepBackground: true,
  grid: true,
};

export default async function Post() {
  // Read all mdx files in "app/_docs" directory
  const mdxFileNames = fs.readdirSync(path.join(process.cwd(), "app/_docs"));

  // Read all mdx files in "app/_docs" directory
  const mdxFiles = mdxFileNames.map((fileName) => {
    return fs.readFileSync(
      path.join(process.cwd(), "app/_docs/", fileName),
      "utf-8",
    );
  });

  const { content, frontmatter } = await compileMDX<{
    title: string;
    answers: { value: string }[];
  }>({
    source: mdxFiles[1],
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [[rehypeCode as any, rehypeCodeOptions]],
      },
    },
  });

  return (
    <>
      {content}
      <RadioButtonGroup options={frontmatter.answers} />
    </>
  );
}

export const runtime = "nodejs";
