import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react"
import { View, Text, Button, ScrollView, TextInput, Keyboard, StyleSheet } from "react-native"
import { useReservationContext } from "../contexts/reservation-context";
import RootStackParamList from "../root-stack-param-list/root-stack-param-list";

type PropType = Partial<React.ComponentProps<typeof View>> & NativeStackScreenProps<RootStackParamList, 'Default'>;
interface UserInfoInputProps extends PropType {
    
}


const UserInfoInput: React.FC<UserInfoInputProps> = ({ navigation, route, ...props }) => {

    const reservationContext = useReservationContext();
    const reservation = reservationContext?.reservation;
    const setReservation = reservationContext?.setReservation;

    return (
        // this shit is just broken
        // its the same thing four times and behaves differently each time
        // react native ftw
        <ScrollView style={styles.scrollContainer} contentContainerStyle={{flexWrap: 'wrap'}}>
            <View style={styles.wrap}>
                <View style={styles.header}>
                    <Text>Vyplňte kontaktní údaje</Text>
                </View>
                <View style={styles.body}>
                    <Text>Jméno</Text>
                    <TextInput value={reservation?.person?.firstName} /*style={textInputStyles.basic}*/ onChange={e => {
                        console.log("SetR on first:");
                        console.log(setReservation);
                        if (setReservation) setReservation((r) => ({
                            person: {
                                firstName: e.nativeEvent.text,
                                familyName: r.person?.familyName,
                                email: r.person?.email,
                                phone: r.person?.phone
                            },
                            ...r
                        }))
                    }} />
                    <Text>Příjmení</Text>
                    <TextInput value={reservation?.person?.familyName} /*style={textInputStyles.basic}*/ onChange={e => {
                        console.log("SetR on family:");
                        console.log(setReservation);
                        if (setReservation) setReservation((r) => ({
                            person: {
                                firstName: r.person?.firstName,
                                familyName: e.nativeEvent.text,
                                email: r.person?.email,
                                phone: r.person?.phone
                            },
                            ...r
                        }))
                    }} />
                    <Text>Email</Text>
                    <TextInput value={reservation?.person?.email} /*style={textInputStyles.basic}*/ onChange={e => {
                        if (setReservation) setReservation((r) => ({
                            person: {
                                firstName: r.person?.firstName,
                                familyName: r.person?.familyName,
                                email: e.nativeEvent.text,
                                phone: r.person?.phone
                            },
                            ...r
                        }))
                    }} />
                    <Text>Telefon</Text>
                    <TextInput value={reservation?.person?.phone} /*style={textInputStyles.basic}*/ onChange={e => {
                        if (setReservation) setReservation((r) => ({
                            person: {
                                firstName: r.person?.firstName,
                                familyName: r.person?.familyName,
                                email: r.person?.email,
                                phone: e.nativeEvent.text
                            },
                            ...r
                        }))
                    }} />
                    <Button title="Reserve my place" onPress={() => {
                        console.log(reservation)
                    }} />
                </View>
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

export default UserInfoInput;