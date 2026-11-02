import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Site estático: `npm run build` gera a pasta /out, pronta para qualquer hospedagem.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
