import type { MDXComponents } from "mdx/types";
import { CH } from "@code-hike/mdx/components";
import "@code-hike/mdx/dist/index.css";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    CH,
  };
}
