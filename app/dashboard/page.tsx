import { redirect } from "next/navigation";
import {auth}  from  "@/lib/auth"
import { headers } from "next/headers"
import Link from "next/link"


// Assuming you set up your server auth helper here

export default async function DashboardPage() {
  // 1. Fetch the server-side session from Better-Auth
 const session = await auth.api.getSession({headers: await headers()});

  // 2. Route Guard: Protect the page. If no user is logged in, redirect to login.
  if (!session) {
    redirect("/sign-in");
  }

  const { user } = session;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex">
      
      {/* Sidebar Navigation Placeholder */}
      <aside className="w-64 border-r border-zinc-800 bg-zinc-900/50 hidden md:block p-6 space-y-6">
        <div className="font-bold text-lg flex items-center gap-2">
          <span>🚀</span> NextStart
        </div>
        <div>
          <Link href = "/" className = "px-3">

          Go Back

        </Link>
            
          </div>
        <nav className="space-y-2 text-sm text-zinc-400">
          <div className="bg-zinc-800 text-zinc-100 px-3 py-2 rounded-lg font-medium">Dashboard</div>
          <div className="px-3 py-2 hover:bg-zinc-800/50 hover:text-zinc-100 rounded-lg transition-colors cursor-pointer">
          <Link href = "/dashboard/settings">
          Settings
          </Link>
          
          </div>
          <div className="px-3 py-2 hover:bg-zinc-800/50 hover:text-zinc-100 rounded-lg transition-colors cursor-pointer">
          <Link href = "/billing">
          Billing
          </Link>
          
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 space-y-8 max-w-7xl mx-auto w-full">
        
        {/* Top Navbar Layer */}
        <header className="flex items-center justify-between border-b border-zinc-800 pb-5">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Welcome back, {user.name || "Developer"}!</h1>
            <p className="text-sm text-zinc-400">Here is what is happening with your app today.</p>
          </div>

                    
          {/* Active User Avatar Dropdown Area */}
          <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-sm text-white">
              {user.name ? user.name[0].toUpperCase() : "U"}
            </div>
            <div className="text-left text-xs hidden sm:block">
              <p className="font-medium text-zinc-200">{user.email}</p>
              <p className="text-zinc-500 font-mono text-[10px]">ID: {user.id.slice(0, 8)}...</p>
            </div>
          </div>
        </header>

        {/* Section 1: Mock Application Metrics */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-zinc-900/40 border border-zinc-800/80 p-6 rounded-xl">
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Total Revenue</p>
            <p className="text-3xl font-bold mt-2">$14,245.00</p>
            <p className="text-xs text-emerald-500 mt-1">↑ +12% from last month</p>
          </div>
          <div className="bg-zinc-900/40 border border-zinc-800/80 p-6 rounded-xl">
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Active API Keys</p>
            <p className="text-3xl font-bold mt-2">7 / 10</p>
            <p className="text-xs text-zinc-500 mt-1">Standard Tier Plan</p>
          </div>
          <div className="bg-zinc-900/40 border border-zinc-800/80 p-6 rounded-xl">
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Database Status</p>
            <p className="text-3xl font-bold mt-2 text-emerald-400">Healthy</p>
            <p className="text-xs text-zinc-500 mt-1">Connected to PostgreSQL</p>
          </div>
        </section>

        {/* Section 2: Mock Table / Raw Session Log Layout */}
        <section className="bg-zinc-900/20 border border-zinc-800 rounded-xl p-6 space-y-4">
          <div>
            <h3 className="text-lg font-medium text-zinc-200">System Authentication Log</h3>
            <p className="text-xs text-zinc-500">Live dynamic debug properties passed straight from Better-Auth server state.</p>
          </div>
          
          <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 font-mono text-xs overflow-x-auto text-indigo-300">
            <pre>{JSON.stringify({ user, expiresAt: session.session.expiresAt }, null, 2)}</pre>
          </div>
        </section>

      </main>
    </div>
  );
}
