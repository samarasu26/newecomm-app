// lib/prisma.ts
import { PrismaClient } from "@/src/generated/prisma/client";
<<<<<<< HEAD
=======

>>>>>>> a2eca1b9ba600b7ee75eebb35e9b2b4cbd37da43
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

<<<<<<< HEAD
const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
=======
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient({adapter})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma;
>>>>>>> a2eca1b9ba600b7ee75eebb35e9b2b4cbd37da43
