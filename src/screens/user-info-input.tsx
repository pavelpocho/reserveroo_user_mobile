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
    const person = reservationContext?.person;
    const setPerson = reservationContext?.setPerson;

    return (
        <ScrollView style={styles.scrollContainer} contentContainerStyle={{flexWrap: 'wrap'}}>
            <View style={styles.wrap}>
                <View style={styles.header}>
                    <Text>Vyplňte kontaktní údaje</Text>
                </View>
                <View style={styles.body}>
                    <Text>Jméno</Text>
                    <TextInput key={1} value={person?.firstName ?? ''} style={textInputStyles.basic} onChangeText={t => {
                        if (setPerson) setPerson({
                            ...person,
                            firstName: t
                        })
                    }} />
                    <Text>Příjmení</Text>
                    <TextInput key={2} value={person?.familyName} style={textInputStyles.basic} onChangeText={t => {
                        if (setPerson) setPerson({
                            ...person,
                            familyName: t,                            
                        })
                    }} />
                    <Text>Email</Text>
                    <TextInput key={3} value={person?.email} style={textInputStyles.basic} onChangeText={t => {
                        if (setPerson) setPerson({
                            ...person,
                            email: t                            
                        })
                    }} />
                    <Text>Telefon</Text>
                    <TextInput key={4} value={person?.phone} style={textInputStyles.basic} onChangeText={t => {
                        if (setPerson) setPerson({
                            ...person,
                            phone: t
                        })
                    }} />
                    <Button title="Pokračovat ke shrnutí" onPress={() => {
                        navigation.navigate("ReservationSummary");
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