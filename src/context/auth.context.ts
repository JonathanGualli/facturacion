import { createContext, useContext } from "react";
import type { User } from "../models/user.model";
import type { Company } from "../models/company.model";

interface AuthContextProps {
    user: User | null;
    companies: Company[];
    signIn: (email: string, password: string, companyId?: number) => void;
    signUp: (name: string, email: string, password: string) => void;
    logOut: () => void;
    isAuthenticated: boolean;
    errors: string[];
    isLoading: boolean;
}


export const AuthContext = createContext<AuthContextProps | null>(
    /* {
        user: null,
        signIn: () => { },
        logOut: () => { },
        isAuthenticated: false,
        errors: [],
        isLoading: false
    } */
    null
);

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("AuthContext must be used with an AuthProvider")
    }

    return context;
}