"use client"
import { PostItem } from "@/lib/posts";
import Link  from "next/link";
import Image from "next/image"
import { Button } from "../ui/button";
import { FileIcon } from "lucide-react";
import { Input } from "../ui/input";



interface Props {
  posts: PostItem[];
}

export function ImageFeed({ posts }: Props) {

  if (!posts.length)
    return <p className="text-muted-foreground">No photos yet.</p>;
  

  return (

    <>

    <div className="flex justify-between mx-12">

    <div className="flex flex-col"><h2 className="text-black font-bold  text-2xl">Featured Lessons</h2>
    
    <p className="text-muted-foreground text-[12px]   ">Handpicked premium language insight from senior educators</p>

    </div>

    <div className="text-[12px] mt-4">See All Lessons</div>

    </div>

    

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 py-4  h-screen-160 mb-6 w-full max-w-9xl" >

    
      

      

      {posts.map((post) => (
      

        <div
          key={post.id}
          className=" overflow-hidden mx-auto mt-2 mb-4 flex flex-col justify-center items-center "
        >

         
          <Link href= {`/imageCard/${post.id}`} >

          <div className="relative h-42 w-80 ">             

                     

             <Image src ={post.imageUrl} alt= "blog" fill className = "mb-4 (max-width: 768px)100%vw, 33%vw object-cover"  
            
            /> 



            </div>

            
          </Link>    

          <div className="flex flex-col mx-12">

           <p className="text-black font-bold text-xl text-bold mt-4 mb-2 ">
              {post.title}
            </p>


          <p className="text-black max-w-[300px] line-clamp-3 text-[15px] text-muted-foreground ">{post.content}</p>

          <Link href= {`/imageCard/${post.id}`}>

          <p className="font-bold text-[12px] mt-8 text-right">Read Lesson</p>

          </Link>

          </div> 


          


         

          </div>   
          
           
      
      ))}

      

      
    </div>

    </>

    
  );
}