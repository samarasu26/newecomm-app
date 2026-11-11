import type { NextConfig } from "next";

const nextConfig: NextConfig = {


<<<<<<< HEAD
  serverExternalPackages: ['@prisma/client'],

  

  experimental: {
    turbo: {
=======
  outputFileTracingIncludes: {
      '/api/**/*': ['./node_modules/.prisma/client/**/*'],
    },
  

  turbopack : {
>>>>>>> a2eca1b9ba600b7ee75eebb35e9b2b4cbd37da43
      // 2. Map the internal missing module path directly to node_modules
      resolveAlias: {
        '.prisma/client/default': './node_modules/.prisma/client/default.js',
      },
<<<<<<< HEAD
    }
  },
  typeRoutes : true,
    serverActions: {
      bodySizeLimit: '10mb', // Acceptable formats: '500kb', '10mb', 2000 (bytes)
    },


  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "media.istockphoto.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },

      
    ],
    formats: ['image/avif', 'image/webp'],
  }
=======
    },

  

  /* config options here */
>>>>>>> a2eca1b9ba600b7ee75eebb35e9b2b4cbd37da43
};

export default nextConfig;
