import type { ReactNode } from "react";
import { createContext, useState, useEffect, useContext } from "react";

import type { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext<{ user: User | null }>({ user: null });

interface Props {
    children: ReactNode;
}

export default function AuthProvider({ children }: Props) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    );
}

export const useAuthCtx = () => useContext(AuthContext);
