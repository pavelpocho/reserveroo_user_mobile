import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react"
import { View, Text, Button, ScrollView, TextInput, Keyboard, StyleSheet, Alert } from "react-native"
import places from "../../data/places";
import { ReservationContext, useReservationContext } from "../contexts/reservation-context";
import Place from "../data_mgmt/place";
import Reservable from "../data_mgmt/reservable";
import RootStackParamList from "../root-stack-param-list/root-stack-param-list";

type PropType = Partial<React.ComponentProps<typeof View>> & NativeStackScreenProps<RootStackParamList, 'Default'>;
interface ReservationSummaryProps extends PropType {
    
}


const ReservationSummary: React.FC<ReservationSummaryProps> = ({ navigation, route, ...props }) => {

    const reservationContext = useReservationContext();
    const reservation = reservationContext?.reservation;
    const setReservation = reservationContext?.setReservation;
    const person = reservationContext?.person;
    const setPerson = reservationContext?.setPerson;

    const alertComplete = () => {
        Alert.alert(
            "Rezervace dokončena.",
            "Děkujeme za rezervaci, detaily se zobrazí v aplikace nebo Vám přijde email.",
            [{
                onPress: () => {
                    console.log("Created reservation:");
                    console.log(reservation);
                    console.log("for person:");
                    console.log(person);
                    if (setReservation) setReservation(() => {
                        return {}
                    });                
                    navigation.navigate("PlaceList");
                }
            }]
        );
    }

    const place = places.find((p: Place) => p.id == reservation?.placeId);
    const reservable = place?.reservables.find((r: Reservable) => r.id == reservation?.reservableId);
    const startDate = new Date(
        reservation?.date?.getFullYear() ?? 0, reservation?.date?.getMonth() ?? 0, reservation?.date?.getDate() ?? 0,
        Math.floor((reservable?.openHour ?? 0) + (reservation?.startSection ?? 0) * (reservable?.timeStepInHours ?? 0)),
        ((reservable?.openHour ?? 0) + (reservation?.startSection ?? 0) * (reservable?.timeStepInHours ?? 0) * 60) % 60
    );
    const durationHours = Math.floor((reservation?.endSection ?? 0 - (reservation?.startSection ?? 0)) * (reservable?.timeStepInHours ?? 0));
    const durationMins = (((reservation?.endSection ?? 0 - (reservation?.startSection ?? 0)) * (reservable?.timeStepInHours ?? 0)) * 60) % 60;
    // TODO: Put into a separate data logic

    return (
        <ScrollView style={styles.scrollContainer} contentContainerStyle={{flexWrap: 'wrap'}}>
            <View style={styles.wrap}>
                <View style={styles.header}>
                    <Text>Vaše rezervace</Text>
                </View>
                <View style={styles.body}>
                    <Text>Datum</Text>
                    <Text>{startDate.getDate() + '.' + (startDate.getMonth() + 1) + '.' + startDate.getFullYear()}</Text>
                    <Text>Čas</Text>
                    <Text>{startDate.getHours() + ':' + startDate.getMinutes()}</Text>
                    <Text>Délka</Text>
                    {durationHours > 0 && <Text>
                        {durationHours} hodin
                    </Text>}
                    {durationMins > 0 && <Text>
                        {durationMins} minut
                    </Text>}
                </View>
                <Button title="Rezervovat" onPress={alertComplete} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        width: '100%'
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
    scrollContainer: {
        backgroundColor: '#f1f1f1',
        flex: 1
    },
    container: {
        width: '100%',
        padding: 20
    },
    body: {
        
    }
});

const textInputStyles = StyleSheet.create({
    basic: {
        padding: 12,
        borderWidth: 1,
        borderRadius: 12
    }
})

export default ReservationSummary;