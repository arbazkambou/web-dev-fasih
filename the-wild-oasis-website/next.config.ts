import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL(
        "https://pseekejagvsvwhimvvzx.supabase.co/storage/v1/object/public/images/**"
      ),
      new URL(
        "https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/**"
      ),
    ],
  },
};

export default nextConfig;
