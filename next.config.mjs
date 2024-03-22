/** @type {import('next').NextConfig} */
import MDX from "@next/mdx";
import { remarkCodeHike } from "@code-hike/mdx";

const withMDX = MDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      [
        remarkCodeHike,
        {
          theme: "material-darker",
          lineNumbers: true,
          staticMediaQuery: "not screen, (max-width: 768px)",
          autoImport: true,
          autoLink: false,
        },
      ],
    ],
  },
});

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
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: true,
      },
    ];
  },
});

export default nextConfig;
