"use client";

import React, { useState } from "react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  // Mock state for user data form visualization
  const [name, setName] = useState("Alex Developer");
  const [email] = useState("alex@example.com"); // Kept stable for placeholder display

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 p-6 md:p-10 w-full mx-auto space-y-8">
      
      {/* Top Heading */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Settings</h1>
        <p className="text-sm text-zinc-400">Manage your account credentials, security configurations, and application preferences.</p>
      </div>

      {/* Settings Navigation Tabs Layout */}
      <div className="flex border-b border-zinc-800 gap-6 text-sm">
        <button 
          onClick={() => setActiveTab("profile")}
          className={`pb-3 font-medium transition-colors ${activeTab === "profile" ? "border-b-2 border-indigo-500 text-zinc-100" : "text-zinc-500 hover:text-zinc-300"}`}
        >
          👤 Profile Account
        </button>
        <button 
          onClick={() => setActiveTab("security")}
          className={`pb-3 font-medium transition-colors ${activeTab === "security" ? "border-b-2 border-indigo-500 text-zinc-100" : "text-zinc-500 hover:text-zinc-300"}`}
        >
          🔐 Security & Access
        </button>
      </div>

      {/* Content Rendering Switch Matrix */}
      <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-2xl p-6 md:p-8">
        
        {/* Tab 1: Profile Management */}
        {activeTab === "profile" && (
          <div className="space-y-6 max-w-xl">
            <h3 className="text-lg font-medium text-zinc-200">Account Particulars</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">Display Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">Email Address</label>
                <input 
                  type="email" 
                  value={email} 
                  disabled 
                  className="w-full bg-zinc-900/50 border border-zinc-800/60 rounded-lg px-4 py-2.5 text-sm text-zinc-500 cursor-not-allowed select-none"
                />
                <span className="text-[11px] text-zinc-500 mt-1 block">Contact support to modify primary registration routing parameters.</span>
              </div>
            </div>

            <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm px-5 py-2.5 rounded-lg transition-colors shadow-lg shadow-indigo-600/10">
              Save Changes
            </button>
          </div>
        )}

        {/* Tab 2: Security & Authentication Actions */}
        {activeTab === "security" && (
          <div className="space-y-8">
            
            {/* Identity Upgrades */}
            <div className="space-y-4 max-w-xl">
              <h3 className="text-lg font-medium text-zinc-200">Update Password</h3>
              <div className="space-y-3">
                <input 
                  type="password" 
                  placeholder="Current Password" 
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500 transition-colors"
                />
                <input 
                  type="password" 
                  placeholder="New Secure Password" 
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
              <button className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                Modify Password
              </button>
            </div>

            <hr className="border-zinc-800/80" />

            {/* Danger Termination Module */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-red-400">Danger Zone</h3>
                <p className="text-xs text-zinc-500 mt-0.5">Irreversible administrative operations affecting active database structures.</p>
              </div>
              <div className="bg-red-950/10 border border-red-900/30 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-medium text-zinc-200">Deactivate Current Instance</h4>
                  <p className="text-xs text-zinc-500">Purges associated row identities within relational user tables completely.</p>
                </div>
                <button className="bg-red-950 hover:bg-red-900 text-red-200 text-xs font-semibold px-4 py-2.5 rounded-lg border border-red-800/60 transition-colors whitespace-nowrap">
                  Delete Account
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
