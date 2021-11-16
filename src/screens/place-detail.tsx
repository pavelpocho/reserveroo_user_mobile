import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react"
import { View, Text, Button } from "react-native"
import RootStackParamList from "../root-stack-param-list/root-stack-param-list";

type PropType = Partial<React.ComponentProps<typeof View>> & NativeStackScreenProps<RootStackParamList, 'Default'>;
interface PlaceDetailProps extends PropType {
    
}

const PlaceDetail: React.FC<PlaceDetailProps> = ({ navigation, ...props }) => {
    return (
        <View>
            <Text>Place detail</Text>
            <Button title="Reserve place" onPress={() => {
                navigation.navigate("PlaceReservation")
            }} />
        </View>
    )
}

export default PlaceDetail;