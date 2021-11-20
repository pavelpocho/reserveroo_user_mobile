import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import RootStackParamList from "../root-stack-param-list/root-stack-param-list";

type MyProps = Partial<React.ComponentProps<typeof View>> & NativeStackScreenProps<RootStackParamList, 'Default'>;
interface MyReservationsProps extends MyProps {

}

const MyReservations: React.FC<MyReservationsProps> = ({ route, navigation }) => {

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: 'Moje rezervace'
        })
    })

    return <ScrollView style={styles.scrollContainer} contentContainerStyle={{flexWrap: 'wrap'}}>
        <View>
            <Text>Moje rezervace</Text>
            <Text>Tohle asi pujde ale jenom s uctem, jinak bude potreba nejaky kod nebo email zadat or whatever</Text>
        </View>
    </ScrollView>
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        width: '100%'
    }
})

export default MyReservations