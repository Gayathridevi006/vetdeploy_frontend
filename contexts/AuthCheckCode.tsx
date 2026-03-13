

"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";

import api from "../lib/api";

/* ================= TYPES ================= */

export interface User {
    id: string;
    name: string;
    email: string;
}

// Fixed ts(2353): Explicitly allow 'message' in the return type
export interface AuthResponse {
    success: boolean;
    message?: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<AuthResponse>;
    register: (
        name: string,
        email: string,
        phone: string,
        password: string,
        role: string
    ) => Promise<AuthResponse>;
    logout: () => void;
}

/* ================= CONTEXT ================= */

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* ================= HOOK ================= */

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }

    return context;
};

/* ================= PROVIDER ================= */

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true); // Start as true to check storage first

    useEffect(() => {
        // Sync state with storage on mount
      
        const savedUser = localStorage.getItem('user');

        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (err) {
                console.error("Session restoration failed:", err);
              
                localStorage.removeItem('user');
            }
        }
        setLoading(false);
    }, []);

    const login = async (
        email: string,
        password: string
    ): Promise<AuthResponse> => {
        try {
            const response = await api.post('/signin', { email, password });
            const { user } = response.data;

            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);

            return { success: true };
        } catch (error: any) {
            // Fix: Return message property that matches AuthResponse type
            return { 
                success: false,
                message: error.response?.data?.message || "Invalid email or password"
            }; 
        }
    };






    const register = async (
        name: string,
        email: string,
        phone: string,
        password: string,
        
        role: string // Added 'role' to match interface definition
    ): Promise<AuthResponse> => {
        try {
            const response = await api.post('/signup', { name, email, phone, password, role });
            const { user } = response.data;


            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);

            return { success: true };
        } catch (error: any) {
            return {
                success: false,
                message: error.response?.data?.message || "Registration failed"
            };
        }
    };

    const logout = (): void => {
        // Clear everything so the interceptor/useEffect doesn't log them back in
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    const value: AuthContextType = {
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

