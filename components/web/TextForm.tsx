"use client"

import { useSession } from "@/lib/auth-client";
import { DocItem } from "@/lib/docs";
import {ProductItem} from "@/lib/products";
import Link  from "next/link";
import { Input } from "../ui/input";
import Image from "next/image"
import { Button } from "../ui/button";
import {redirect}  from "next/navigation"

import {useFormStatus}  from "react-dom"






interface Props {

  
  posts : PostItem[]
  
  

}

 









 export function TextFeed({ posts}: Props) {



  const {data: session}  = useSession()  


  

  function formatCurrency(
  price : any,
  currency: string = 'USD'
): string {

  const numericValue =  typeof price ==="string"? parseFloat(price)  : price


  
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(numericValue/100);


}







  if (!posts.length)
    
    return <p className="text-muted-foreground">No text files
    
    
     yet.</p>;

  return (

    <>

    <div className="flex justify-between mx-12">

    

    <div className="flex flex-col"><h2 className="text-black font-bold  text-2xl">Premium Library Highlights</h2>
    
    <p className="text-muted-foreground text-[12px]   ">Model essay responses, business structures, and formal writing checklists</p>

    </div>

    <div className="text-[12px] mt-4">View Entire Library→



    </div>

    </div>

    

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 py-4  h-screen-160 mb-6 w-full max-w-9xl" >

    
      

      

      {posts.map((post) => (


        
        
        


 
      
        
        <div key={post.id}
          className=" overflow-hidden mx-auto mt-2 mb-4 flex flex-col justify-center items-center "
        >

       

         
          <Link href= {`/textCard/${post.id}`} >

          <div className="relative h-42 w-80 ">             

                     

             <Image src =  {post.url} alt= "blog-pic" 

             
             className = "object-cover"

             fill
            
            /> 



            </div>            

            
          </Link>    

          

           <p className="text-black font-bold text-xl mx-12 text-bold mt-4 mb-2 ">
              {post.title}
            </p>


           


          {session?.user ? <Link href = {`/checkout/${post.id}`}>

          <Button variant = "default" className = "bg-green-500 w-[300px] text-white " >


          <span className = "text-white">{formatCurrency(post.price)}</span>


          </Button>

          </Link> :

          <Link href= "/sign-in">

          <Button>SignIn to Buy</Button>

          </Link>

                     
          }            

          </div>                 
      
      ))}          

      
    </div>
    </>   
    

  

    
  );
}



{/* <>
    
    <div className="flex justify-between mx-12">

    <div className="flex flex-col">

      <h1 className="font-bold text-2xl text-black">Premium Library Highlights</h1>

      
      <p className="text-muted-foreground text-[12px]">Model essay responses, business structures, and formal writing checklists</p>
      </div>

      <div className="">
        <p className="font-bold text-[12px] text-black">View Entire Library</p>
      </div>
      
      




    </div>


    


    <div className="grid grid-cols-1 md:grid-cols-2 lg: grid-cols-3 gap-2 py-4  h-screen-160 mb-6 ">

      {posts.map((post) => (

        <div
          key={post.id}
          className="overflow-hidden mx-4 mt-6 mb-4 flex flex-col items-center justify-center "
        >

          <Link href= {`/textDash/${post.id}`} className="block relative group">

          
          




        {session?.user.email &&


         <div className="relative w-80 h-42">

                     

          <Image src = "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600"  alt= "blog" fill className = "mb-4 (max-width: 768px)100%vw, 33%vw object-cover"/>

          </div>

        }

        </Link>

          


          <div className="flex flex-col">

          <p className="text-black font-bold text-xl text-bold mt-4 mb-2 ">
              {post.title}
          </p>

          <p className="text-black w-full max-w-[300px] line-clamp-3 text-[15px] text-muted-foreground ">
              {post.content}
            </p>
            <Button className = "bg-blue-500 w-[325px] ">Download</Button>




          </div>
            
            
            
        
          
          
        </div>
      ))}
      
    </div>

    
    
  

    </> */}

    