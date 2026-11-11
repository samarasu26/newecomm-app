
import prisma from "@/lib/prisma";









export const docSelect = {
  id: true,
  title : true,
  imageUrl: true,  
  mediaType: true,  
  userId :true,  
  url : true,  
  createdAt: true,
  updatedAt : true,  
  price : true,
  
  
  
  
} as const;

/** Two parallel queries run via Promise.all — one round-trip */
export async function getHomePosts() {
  const [imageDocs, textDocs] = await Promise.all([

    

  

    // prisma.document.findMany({

    //   where: ({ mediaType: MediaType.IMAGE } as any),
      
    //   select: docSelect,
    // }),

    prisma.document.findMany({


     where :   ({ mediaType: MediaType.TEXT } as any),
      
      
      select: docSelect,
    }),

    


  ]);



  return {textDocs, imageDocs };

}


/** Type inference from the Prisma select shape */
export type DocItem = Awaited<
  ReturnType<typeof prisma.post.findMany>>[number]

  

