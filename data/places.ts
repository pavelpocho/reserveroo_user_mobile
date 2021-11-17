import Place from "../src/data_mgmt/place";
import { ReservableType } from "../src/data_mgmt/reservable";

const places: Place[] = [
    {
        id: '0',
        name: 'Biliard',
        description: 'Stoly na hrani / drahy na bowling nebo co, sipky a tak',
        reservables: [
            {
                id: '0',
                type: ReservableType.billiard,
                howMany: 1
            },
            {
                id: '1',
                type: ReservableType.bowling,
                howMany: 3
            }
        ]
    },
    {
        id: '1',
        name: 'Restaurace asi',
        description: 'Stoly na rezervaci k sezeni',
        reservables: [
            {
                id: '1',
                type: ReservableType.table,
                howMany: 12
            }
        ]
    },
    {
        id: '2',
        name: 'Tenis',
        description: 'A badminton nebo co, proste kurty ruzne atd',
        reservables: [
            {
                id: '0',
                type: ReservableType.tennis,
                howMany: 3
            },
            {
                id: '0',
                type: ReservableType.badminton,
                howMany: 5
            }
        ]
    }
]

export default places;