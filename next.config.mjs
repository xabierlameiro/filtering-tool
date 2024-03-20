/** @type {import('next').NextConfig} */
import MDX from "@next/mdx";

const withMDX = MDX({});

const nextConfig = withMDX({
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/a/**",
      },
    ],
  },
});

export default nextConfig;
