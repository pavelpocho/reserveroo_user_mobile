import { Category } from "./category_names";
import Reservable from "./reservable";

interface Place {
    id: string,
    name: string,
    description: string,
    reservables: Reservable[],
    categories: Category[]
}

export default Place;