<<<<<<< HEAD
"use server"


import Image from "next/image";

import Header from "@/components/web/Header"

import {TextFeed} from "@/components/web/TextForm"

import {ImageFeed} from "@/components/web/imageCard"

import {getHomePosts} from "@/lib/docs"
=======
import Image from "next/image";

import Link from "next/link";
>>>>>>> a2eca1b9ba600b7ee75eebb35e9b2b4cbd37da43




<<<<<<< HEAD
export default async function Home() {

  const  {textDocs, imageDocs}     =  await getHomePosts()


  return (

    <div>

    <div>

    <Header/>

        
    </div>

    <div className="w-full max-w-7xl">



    <ImageFeed posts = {imageDocs} />


      </div>


      

      <div>

    <TextFeed posts = {textDocs} />


      </div>


      

      </div>
    
  );
}
=======





export default function HomePage() {




  


  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 selection:bg-indigo-500/30 selection:text-indigo-200 antialiased overflow-x-hidden">
      
      {/* Subtle Background Glow Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-indigo-500/10 to-transparent blur-[120px] pointer-events-none" />

      {/* Navigation Header */}
      <header className="border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            <span>🚀</span> NextStart
          </div>
          <nav className="flex items-center gap-4">
            <Link 
              href="/sign-in" 
              className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              Sign In
            </Link>
            <Link 
              href="/sign-up" 
              className="text-sm font-medium bg-zinc-100 hover:bg-zinc-200 text-zinc-950 px-4 py-2 rounded-lg font-medium transition-all shadow-md shadow-black/20"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full text-xs font-medium text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> 
            New Production Ready Kit Installed 
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent leading-tight sm:leading-none">
            Ship your project in hours, not days.
          </h1>
          
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            A meticulously pre-configured stack with Next.js, Better-Auth, Prisma, and PostgreSQL. Stop fighting environment setups and start coding features.
          </p>

          <div className="pt-4 flex items-center justify-center gap-4">
            <Link 
              href="/dashboard" 
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg font-medium text-sm transition-all shadow-lg shadow-indigo-600/20 flex items-center gap-2 group"
            >
              Go to Dashboard 
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </Link>
            <a 
              href="#features" 
              className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 px-6 py-3 rounded-lg font-medium text-sm transition-colors"
            >
              Explore Features
            </a>
          </div>
        </div>

        {/* Visual Application Mockup Grid */}
        <div id="features" className="mt-28 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Auth */}
          <div className="bg-zinc-900/40 border border-zinc-800/80 p-8 rounded-2xl backdrop-blur-sm relative group hover:border-zinc-700/80 transition-colors">
            <div className="text-indigo-400 text-2xl font-semibold mb-3">🔐 Better-Auth</div>
            <h3 className="text-lg font-medium text-zinc-200 mb-2">Secure Authentication</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Fully optimized credentials flow, secure session tokens, and OAuth config files prepared for lightning-fast integrations.
            </p>
          </div>

          {/* Card 2: Database */}
          <div className="bg-zinc-900/40 border border-zinc-800/80 p-8 rounded-2xl backdrop-blur-sm relative group hover:border-zinc-700/80 transition-colors">
            <div className="text-indigo-400 text-2xl font-semibold mb-3">🗄️ Database ORM</div>
            <h3 className="text-lg font-medium text-zinc-200 mb-2">Prisma & Postgres</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Includes a standard, type-safe singleton instance client layer mapping clean schemas seamlessly to local Dockerized relational nodes.
            </p>
          </div>

          {/* Card 3: UI Design */}
          <div className="bg-zinc-900/40 border border-zinc-800/80 p-8 rounded-2xl backdrop-blur-sm relative group hover:border-zinc-700/80 transition-colors">
            <div className="text-indigo-400 text-2xl font-semibold mb-3">🎨 Clean Interface</div>
            <h3 className="text-lg font-medium text-zinc-200 mb-2">Shadcn UI Theme</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Tailored default Dark Mode interface structure loaded with premium system typography scaling and fluid navigation patterns.
            </p>
          </div>

        </div>
      </main>

      {/* Simplified Micro Footer */}
      <footer className="border-t border-zinc-900 mt-20 bg-zinc-950 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-600">
          <div>&copy; {new Date().getFullYear()} NextStart Starter Kit. All rights reserved.</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-zinc-400 transition-colors">Docs</a>
            <a href="#" className="hover:text-zinc-400 transition-colors">License</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

    
  
>>>>>>> a2eca1b9ba600b7ee75eebb35e9b2b4cbd37da43
