"use server"

import prisma from "@/lib/prisma"
import Image from "next/image"
import PostEditor from "@/components/web/PostEditor"
import { notFound } from "next/navigation"
import { Post } from "@/src/generated/prisma/client"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link  from "next/link"


const ImageCard = async({params}: {params  : Promise <{id : "Number", MediaType : "IMAGE" | "VIDEO"}>}) => {

  


 
  const {id, MediaType} =  await params

  const Id = parseInt(id)

  const post  = await prisma.post.findUnique({
    where : {
      id : Id,
      mediaType : MediaType
    },
    select: {
      id: true,
      title: true,
      content: true,
      userId: true,
      mediaType: true,
      imageUrl: true,
      createdAt: true,
      updatedAt: true,
    },
  })

  if(!post){
    notFound()
  }


  




  return (


    <div className="group-relative flex flex-col mx-12 h-screen-100 w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6 ">

      <div className="flex gap-2 items-center ">
        <ArrowLeft size =  "16" className = "mt-2"/>

      <Link href = "/">
      <h2 className="mt-2 font-bold text-[12px] text-indigo-500">BACK TO LESSONS</h2>
      </Link>

      

      </div>

      
      <div className="mt-12">

        <div className="flex gap-2 mt-4 ">

        <Button variant = "default" className = "text-[10px] ">IELTS</Button>
        <Button className = "text-[10px] bg-white text-black font-bold hover:text-white">ADVANCED LEVEL</Button>

        
        </div>

        
        
      <h1 className=" text-[36px] font-bold font-family:sans-serif tracking-tight tracking-wider mt-6 ">{post.title
        
        }</h1>

        <p className="mt-6 text-[12px] font-bold">Isabella Roy, IELTS examiner and Educator</p>
        <p className="text-[12px] text-muted-foreground">2026-08-01 - 8min read</p>
      

      </div>

      

      <div className="relative rounded-xl overflow-hidden aspect-video bg-slate-50 border border-slate-100">

      
        
            

      <Image src={post.imageUrl}  alt= {post.title} className="object-cover transition-transform duration-300 group-hover:scale-105 mb-10" fill />  

      
        
      
      
      </div>

      <div>

    






      </div>

      

      <div className="prose prose-slate text-slate-700 leading-relaxed text-sm sm:text-base space-y-4 whitespace-pre-wrap" key={post.id}>

      <p className="text-3xl line-clamp-8 text-[18px] leading-loose">

        <a href="/readmore" className="">
          
          
          {post.content}
          
          
          </a>
      

      </p>


      

      </div>

      <div className="">


      <PostEditor post={post as unknown as Post & {id: string}} key={post.id}/>





      

        


    </div>      

    </div>
      
    
  
  )
}

export default ImageCard


const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Instrument+Serif:ital@0;1&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .editor-shell {
    --bg:        #0d0d0f;
    --surface:   #16161a;
    --border:    #2a2a32;
    --accent:    #c8f135;
    --accent-dim:#8aab1f;
    --danger:    #ff4d4d;
    --danger-dim:#c43b3b;
    --text:      #e8e8ec;
    --muted:     #6b6b7a;
    --radius:    10px;

    font-family: 'Syne', sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
    padding: 48px 24px 80px;
    max-width: 760px;
    margin: 0 auto;
  }

  /* Header */
  .editor-header { margin-bottom: 36px; }

  .editor-eyebrow {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 10px;
  }

  .pill {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: .1em;
    text-transform: uppercase;
    background: var(--accent);
    color: #0d0d0f;
    padding: 3px 10px;
    border-radius: 999px;
  }

  .post-id {
    font-size: 12px;
    color: var(--muted);
    font-family: monospace;
  }

  .editor-title {
    font-size: clamp(28px, 5vw, 44px);
    font-weight: 800;
    letter-spacing: -.02em;
    line-height: 1;
    color: var(--text);
  }

  /* Banner */
  .banner {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 18px;
    border-radius: var(--radius);
    margin-bottom: 28px;
    font-size: 14px;
    font-weight: 600;
    border: 1px solid transparent;
    animation: slideIn .25s ease;
  }
  .banner-success {
    background: rgba(200,241,53,.1);
    border-color: rgba(200,241,53,.3);
    color: var(--accent);
  }
  .banner-error {
    background: rgba(255,77,77,.1);
    border-color: rgba(255,77,77,.3);
    color: var(--danger);
  }
  .banner-icon { font-size: 16px; }

  @keyframes slideIn {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Form */
  .editor-form { display: flex; flex-direction: column; gap: 28px; }

  .field { display: flex; flex-direction: column; gap: 8px; }

  .field--row {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background: var(--surface);
    border: 1px solid var(--border);
    padding: 16px 20px;
    border-radius: var(--radius);
  }

  .field-label {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: .08em;
    text-transform: uppercase;
    color: var(--muted);
  }

  .field-input,
  .field-textarea {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    color: var(--text);
    font-family: 'Instrument Serif', serif;
    font-size: 17px;
    padding: 14px 16px;
    outline: none;
    transition: border-color .2s, box-shadow .2s;
    resize: vertical;
  }

  .field-input:focus,
  .field-textarea:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(200,241,53,.12);
  }

  .field-input--error { border-color: var(--danger) !important; }

  .field-error {
    font-size: 12px;
    color: var(--danger);
    font-weight: 600;
  }

  /* Toggle */
  .toggle-label {
    display: flex;
    flex-direction: column;
    gap: 3px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
  }
  .toggle-hint { font-size: 12px; font-weight: 400; color: var(--muted); }

  .toggle-switch { position: relative; display: flex; align-items: center; }

  .toggle-input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  .toggle-track {
    display: block;
    width: 48px;
    height: 26px;
    background: var(--border);
    border-radius: 999px;
    cursor: pointer;
    transition: background .2s;
    position: relative;
  }
  .toggle-track::after {
    content: '';
    position: absolute;
    top: 3px;
    left: 3px;
    width: 20px;
    height: 20px;
    background: #fff;
    border-radius: 50%;
    transition: transform .2s;
  }
  .toggle-input:checked ~ .toggle-track { background: var(--accent); }
  .toggle-input:checked ~ .toggle-track::after { transform: translateX(22px); }

  /* Actions row */
  .editor-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding-top: 8px;
    flex-wrap: wrap;
  }

  /* Buttons */
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 22px;
    border-radius: var(--radius);
    font-family: 'Syne', sans-serif;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: .03em;
    border: none;
    cursor: pointer;
    transition: transform .15s, opacity .15s, box-shadow .15s;
  }
  .btn:active { transform: scale(.97); }
  .btn:disabled { opacity: .5; cursor: not-allowed; }

  .btn-primary {
    background: var(--accent);
    color: #0d0d0f;
    box-shadow: 0 4px 20px rgba(200,241,53,.25);
  }
  .btn-primary:hover:not(:disabled) {
    box-shadow: 0 6px 28px rgba(200,241,53,.4);
  }

  .btn-danger {
    background: transparent;
    color: var(--danger);
    border: 1px solid rgba(255,77,77,.35);
  }
  .btn-danger:hover { background: rgba(255,77,77,.1); }

  .btn-ghost {
    background: transparent;
    color: var(--muted);
    border: 1px solid var(--border);
  }
  .btn-ghost:hover { color: var(--text); border-color: var(--text); }

  .btn-icon { font-size: 13px; }

  /* Confirm row */
  .confirm-row {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    animation: slideIn .2s ease;
  }
  .confirm-label { font-size: 13px; font-weight: 700; color: var(--danger); }

  /* Delete wrapper */
  .delete-wrapper { display: flex; flex-direction: column; gap: 6px; }

  /* Spinner */
  .spinner {
    width: 14px;
    height: 14px;
    border: 2px solid rgba(0,0,0,.2);
    border-top-color: #0d0d0f;
    border-radius: 50%;
    animation: spin .6s linear infinite;
    display: inline-block;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
`;