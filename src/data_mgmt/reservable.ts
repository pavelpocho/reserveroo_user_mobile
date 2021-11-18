interface Reservable {
    id: string,
    type: Type,
    howMany: number,
    openHour: number,
    closeHour: number,
    timeStepInHours: number
}

enum Type {
    billiard = 0,
    bowling,
    table,
    tennis,
    badminton
}

const typeTexts: string[] = [
    'Billiard',
    'Bowling',
    'Stůl',
    'Tenis',
    'Badminton'
]

export { Type as ReservableType, typeTexts as reservableTypeTexts };
export default Reservable;