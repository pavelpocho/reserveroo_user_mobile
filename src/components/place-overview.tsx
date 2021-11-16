import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react"
import { View, Text, Button } from "react-native"
import RootStackParamList from "../root-stack-param-list/root-stack-param-list";

type PropType = Partial<React.ComponentProps<typeof View>> & NativeStackScreenProps<RootStackParamList, 'Default'>;
interface PlaceDetailProps extends PropType {
    placeId: string
}

const PlaceOverview: React.FC<PlaceDetailProps> = ({ navigation, placeId, ...props }) => {
    return (
        <View>
            <Text>Place overview</Text>
            <Text>{placeId}</Text>
            <Button title="See details" onPress={() => {
                navigation.navigate("PlaceDetail", { placeId })
            }} />
        </View>
    )
}

export default PlaceOverview;