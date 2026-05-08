import { createContext, useContext, useState, useEffect  } from "react";
import { apiService } from "../services/apiService";
import type { User } from "../types/user";



type UserContextType = {
    user: User | null;
    setUser: (user: User | null) => void;
    refreshUser: () => Promise<void>;
};


export const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);


    async function refreshUser() {
        const { data, error } = await apiService.get<string>("/Api/Users/Auth");
        if (!error && data) {
            const username = data.split(": ")[1] ?? "Ukendt";
            setUser({ username, FullName: "", balance: 0 });
        } else {
            setUser(null);
        }
    }

    useEffect(() => {
        refreshUser();

    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, refreshUser }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => {
    const ctx = useContext(UserContext);
    if (!ctx) throw new Error("useUser must be used within UserProvider");
    return ctx;
};

