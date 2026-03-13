"use client";

import { useAuth } from '@/contexts/AuthContext';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { LogOut, User as UserIcon, ArrowRight, ChevronRight } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const ROLES = [
    { value: "transition", label: "Start Your Transition" },
    { value: "hiring", label: "Hire Leader" },
];

const DashboardPage = () => {
    const { user, logout, loading } = useAuth();
    const [mounted, setMounted] = useState(false);
    const [role, setRole] = useState("");
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleLogout = () => {
        logout();
        toast.success("Signed out successfully");
        router.push('/login');
    };

      if (!mounted) return null;


    

    return (
        <section className='flex items-center justify-center w-full h-screen p-2 md:p-0'>
            <div className='md:w-6xl md:mx-auto w-full bg-white shadow-xl rounded-xl overflow-hidden border border-slate-200'>
                {/* Navbar */}
                <nav className="bg-slate-900 p-6 flex justify-between items-center text-white">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                            <UserIcon className="text-white w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold leading-tight uppercase tracking-tighter">VETDEPLOY</h1>
                            <p className="text-[10px] text-emerald-400 tracking-[0.2em] uppercase font-mono">Channel: Secure</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="text-right border-r border-slate-700 pr-6 hidden sm:block">
                            <p className="text-[10px] text-slate-500 uppercase tracking-widest">Authenticated As</p>
                            <p className="font-bold text-sm text-white">{user?.name}</p>
                        </div>
                        <button onClick={handleLogout} className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-red-400">
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </nav>

                <div className="md:p-10 p-5">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-900">Welcome, Officer</h2>
                        <p className="text-slate-500 text-sm">{user?.email}</p>
                    </div>
                    
                    <div className="w-full">
                        <div className="p-3 bg-slate-50 w-full rounded-xl border border-slate-200 shadow-inner">
                            <h3 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-emerald-500" /> 
                                Assignment Selection
                            </h3>
                            
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="role" className="text-[10px] font-black tracking-[0.2em] uppercase text-slate-400">
                                        Select Mission Path
                                    </Label>
                                    <div className='flex items-center gap-4'>
                                        <Button>
                                        <a href="/dashboard/transition">Start your Transition</a>
                                    </Button>
                                     <Button>
                                        <a href="/dashboard/hiring">Hire Leader</a>
                                    </Button>
                                    </div>
                                </div>

                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Simple icon component helper
const ShieldCheck = ({className}: {className: string}) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
)

export default DashboardPage;