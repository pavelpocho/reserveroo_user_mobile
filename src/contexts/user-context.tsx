import React, { createContext, useContext, useMemo, useState } from "react";
import User from "../data_mgmt/user";


export interface UserContext {
    user: User,
    setUser: React.Dispatch<React.SetStateAction<User>>
}

export const UserContext = createContext<UserContext | undefined>(undefined);

export const useUserContext = () => {
    return useContext(UserContext);
}

interface UserContextProviderProps extends Partial<React.PropsWithChildren<React.ReactHTMLElement<HTMLDivElement>>> {

}

export const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {
    const [ user, setUser ] = useState<User>({});

    const value = useMemo(() => ({ user, setUser }), [user, setUser]);

    return <UserContext.Provider value={value}>
        { children }
    </UserContext.Provider>
}