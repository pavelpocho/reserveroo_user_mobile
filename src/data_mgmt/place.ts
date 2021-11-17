import Reservable from "./reservable";

interface Place {
    id: string,
    name: string,
    description: string,
    reservables: Reservable[]
}

export default Place;