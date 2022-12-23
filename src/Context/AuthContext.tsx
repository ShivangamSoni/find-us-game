import type { ReactNode } from "react";
import { createContext, useState, useEffect, useContext } from "react";

import type { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext<{ isAuth: User | null }>({ isAuth: null });

interface Props {
    children: ReactNode;
}

export default function AuthProvider({ children }: Props) {
    const [isAuth, setIsAuth] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsAuth(user);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthCtx = () => useContext(AuthContext);
