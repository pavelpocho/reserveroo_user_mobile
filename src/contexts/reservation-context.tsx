import React, { createContext, useContext, useMemo, useState } from "react";
import Reservation from "../data_mgmt/reservation";
import User from "../data_mgmt/user";


export interface ReservationContext {
    reservation: Reservation,
    person: User,
    setReservation: React.Dispatch<React.SetStateAction<Reservation>>,
    setPerson: React.Dispatch<React.SetStateAction<User>>
}

export const ReservationContext = createContext<ReservationContext | undefined>(undefined);

export const useReservationContext = () => {
    return useContext(ReservationContext);
}

interface ReservationContextProviderProps extends Partial<React.PropsWithChildren<React.ReactHTMLElement<HTMLDivElement>>> {

}

export const ReservationContextProvider: React.FC<ReservationContextProviderProps> = ({ children }) => {
    const [ reservation, setReservation ] = useState<Reservation>({});
    const [ person, setPerson ] = useState<User>({});

    const value = useMemo(() => ({ reservation, setReservation, person, setPerson }), [reservation, setReservation, person, setPerson]);

    return <ReservationContext.Provider value={value}>
        { children }
    </ReservationContext.Provider>
}