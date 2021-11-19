interface Reservation {
    date?: Date,
    startSection?: number,
    endSection?: number,
    row?: number,
    placeId?: string,
    reservableId?: string
}

export default Reservation