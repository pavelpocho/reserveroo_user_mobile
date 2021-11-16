import { NavigationContainer } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react"
import { View, Text, Button, Alert } from "react-native"
import RootStackParamList from "../root-stack-param-list/root-stack-param-list";

type PropType = Partial<React.ComponentProps<typeof View>> & NativeStackScreenProps<RootStackParamList, 'Default'>;
interface PlaceReservationProps extends PropType {
    
}

const PlaceReservation: React.FC<PlaceReservationProps> = ({ navigation, ...props }) => {
    return (
        <View>
            <Text>Place reservation</Text>
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
    )
}

export default PlaceReservation;