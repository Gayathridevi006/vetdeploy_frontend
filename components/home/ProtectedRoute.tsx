"use client"

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation'; // Correct import for Next.js
import { useEffect } from 'react';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // If loading is finished and user is not authenticated, redirect
        if (!loading && !isAuthenticated) {
            router.push('/login');
        }
    }, [loading, isAuthenticated, router]);

    // Show loading spinner while checking auth status
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    // Only render children if authenticated
    return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;