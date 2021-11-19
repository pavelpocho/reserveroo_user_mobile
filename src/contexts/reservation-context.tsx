import React, { createContext, useContext, useMemo, useState } from "react";
import Reservation from "../data_mgmt/reservation";


export interface ReservationContext {
    reservation: Reservation,
    setReservation: React.Dispatch<React.SetStateAction<Reservation>>
}

export const ReservationContext = createContext<ReservationContext | undefined>(undefined);

export const useReservationContext = () => {
    return useContext(ReservationContext);
}

interface ReservationContextProviderProps extends Partial<React.PropsWithChildren<React.ReactHTMLElement<HTMLDivElement>>> {

}

export const ReservationContextProvider: React.FC<ReservationContextProviderProps> = ({ children }) => {
    const [ reservation, setReservation ] = useState<Reservation>({});

    const value = useMemo(() => ({ reservation, setReservation }), [reservation, setReservation]);

    return <ReservationContext.Provider value={value}>
        { children }
    </ReservationContext.Provider>
}