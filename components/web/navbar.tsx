<<<<<<< HEAD
"use client"

import React from 'react'

import Link from "next/link"

import { Button } from "../ui/button"

import {useSession, signOut}  from "@/lib/auth-client"
=======

import {Button}  from "@/components/ui/button"
import Link   from "next/link"


>>>>>>> a2eca1b9ba600b7ee75eebb35e9b2b4cbd37da43









const Navbar = () => {


<<<<<<< HEAD
    const {data : session}  = useSession()
=======
>>>>>>> a2eca1b9ba600b7ee75eebb35e9b2b4cbd37da43







  return (


<<<<<<< HEAD
    <div className =  "flex justify-between w-full max-w-7xl px-4">

    <div className = "">

    <Link href = "/"><h2>Home</h2></Link>


    </div>


    <div>

    <Link href= "/create">Create File</Link>




    </div>





    <div className = "">

    <div className = "flex gap-2">


    {session? <Button onClick = {()=>signOut()}>Logout</Button>  
    
    
    :

    <div className = " flex gap-4">

    <Link href= "/sign-in">Sign-in</Link>
    <Link href= "/sign-up">Sign-up</Link>  

    </div>
    
    
    
    
    }

        


    </div>  



    </div>
=======
    <div className = "flex justify-between p-4">

    <div>

    <Link href = "/">

    Home

    </Link>

    </div>

    


    <div>

    <Link href = "/sign-in">
    
    <Button>
      
      
      SignIn

        
    </Button>

    </Link>


    <Link href = "/sign-up">
    
    <Button>
      
      
      SignUp

        
    </Button>

    </Link>


    </div>

    
        
        
        
    
>>>>>>> a2eca1b9ba600b7ee75eebb35e9b2b4cbd37da43
    
    
    
    
    
    </div>
  )
}

export default Navbar