import { NavigationContainer } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react"
import { View, Text, Button, Alert, StyleSheet, TouchableHighlight, ScrollView } from "react-native"
import places from "../../data/places";
import { reservableTypeTexts } from "../data_mgmt/reservable";
import RootStackParamList from "../root-stack-param-list/root-stack-param-list";
import { MaterialIcons } from '@expo/vector-icons';
import ReservationTileGrid from "../components/reservation-tile-grid";

type PropType = Partial<React.ComponentProps<typeof View>> & NativeStackScreenProps<RootStackParamList, 'Default'>;
interface PlaceReservationProps extends PropType {
    
}

const PlaceReservation: React.FC<PlaceReservationProps> = ({ route, navigation, ...props }) => {

    const params: any = route.params;

    const place = places.find(p => p.id == params.placeId.toString());

    const [selectedDate, setSelectedDate] = useState(new Date());

	function getDayOfWeek(date: Date): string {
		return date.getDay() === 1 ? 'Pondělí' :
			date.getDay() === 2 ? 'Úterý' :
				date.getDay() === 3 ? 'Středa' :
					date.getDay() === 4 ? 'Čtvrtek' :
						date.getDay() === 5 ? 'Pátek' :
							date.getDay() === 6 ? 'Sobota' : 'Neděle';
	}

	function getDate(date: Date): string {
		return date.getDate().toString() + '.' + (date.getMonth() + 1).toString() + '.' + date.getFullYear().toString();
	}

    return (
        <ScrollView style={styles.scrollContainer} contentContainerStyle={{flexWrap: 'wrap'}}>
            <View style={styles.wrap}>      
                <View style={styles.header}>
                    <TouchableHighlight underlayColor='#aaa' style={styles.headerButton} onPress={() => {
                        setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() - 1));
                    }}>
                        <MaterialIcons name="chevron-left" size={32} color="black" />
                    </TouchableHighlight>
                    <View style={styles.headerTextWrap}>
                        <Text style={styles.headerText1}>{getDayOfWeek(selectedDate)}</Text>
                        <Text style={styles.headerText2}>{getDate(selectedDate)}</Text>
                    </View>
                    <TouchableHighlight underlayColor='#aaa' style={styles.headerButton} onPress={() => {
                        setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() + 1));
                    }}>
                        <MaterialIcons name="chevron-right" size={32} color="black" />
                    </TouchableHighlight>
                </View>
                {
                    place?.reservables.map((r, i) => <View style={styles.reservableWrap} key={i}>
                        <Text style={styles.reservableTitle}>{reservableTypeTexts[r.type]} {r.howMany}x</Text>
                        <View style={styles.reserveTilesWrap}>
                            <View style={styles.reserveTileContent}>
                                <ReservationTileGrid reservable={r} place={place} date={selectedDate} />
                            </View>
                        </View>
                    </View>)
                }
                <Button title="Reserve my place" onPress={() => {
                    Alert.alert(
                        "Reservation complete",
                        "Thank your for your reservation. Look at it in app or email.",
                        [{
                            onPress: () => {
                                navigation.navigate("PlaceList");
                            }
                        }]
                    );
                }} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1
    },
    wrap: {
        flex: 1,
        width: '100%'
    },
    reservableWrap: {

    },
    reserveTileContent: {
        marginHorizontal: 12
    },
    dateWrap: {
        flexDirection: 'row'
    },
    reserveTilesWrap: {
        width: '100%'
    },
    reservableTitle: {
        marginLeft: 28,
        marginTop: 14,
        marginBottom: 10,
        fontSize: 20,
        fontWeight: 'bold'
    },
    header: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		height: 72,
		borderBottomWidth: 1,
		borderBottomColor: '#ddd',
		width: '100%'
	},
	headerTextWrap: {
		justifyContent: 'space-evenly',
		alignItems: 'center',
		marginLeft: 60,
		marginRight: 60
	},
	headerText1: {
		fontSize: 18,
		marginBottom: 8
	},
	headerText2: {
		fontSize: 16
	},
	headerButton: {
		borderRadius: 20,
		height: 40,
		width: 40,
		justifyContent: 'center',
		alignItems: 'center'
	},
})

export default PlaceReservation;