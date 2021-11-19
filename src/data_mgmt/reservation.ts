import User from "./user";

interface Reservation {
    date?: Date,
    startSection?: number,
    endSection?: number,
    row?: number,
    placeId?: string,
    reservableId?: string,
    person?: User
}

export default Reservation