

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
    role: string;
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

    const [options, setOptions] = useState<string[]>([]);

    // In login(), save options from response
    const login = async (email: string, password: string) => {
        try {
            const response = await api.post('/signin', { email, password });
            const { user, options } = response.data;

            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('options', JSON.stringify(options));
            setUser(user);
            setOptions(options);

            return { success: true };
        } catch (error: any) {
            return {
                success: false,
                message: error.response?.data?.detail || "Invalid email or password"
            };
        }
    };

    const register = async (
        name: string,
        email: string,
        phone: string,
        password: string,
        role: string
        ): Promise<AuthResponse> => {

        const cleanPhone = phone.replace(/\D/g, "");

        try {
            const response = await api.post('/signup', {
            name,
            email,
            phone: cleanPhone,
            password,
            role: role.toLowerCase()
            });

            const { user, options } = response.data;

            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('options', JSON.stringify(options));

            setUser(user);
            setOptions(options);

            return { success: true };

        } catch (error: any) {
            return {
            success: false,
            message: error.response?.data?.detail || "Registration failed"
            };
        }
        };

    // In useEffect, restore options from storage
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        const savedOptions = localStorage.getItem('options');

        if (savedUser) {
            try { setUser(JSON.parse(savedUser)); }
            catch { localStorage.removeItem('user'); }
        }
        if (savedOptions) {
            try { setOptions(JSON.parse(savedOptions)); }
            catch { localStorage.removeItem('options'); }
        }
        setLoading(false);
    }, []);


    // In logout(), clear options too
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('options');
        setUser(null);
        setOptions([]);
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

