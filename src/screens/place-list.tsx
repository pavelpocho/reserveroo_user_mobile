import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react"
import { View, Text, Button } from "react-native"
import RootStackParamList from "../root-stack-param-list/root-stack-param-list";

type PropType = Partial<React.ComponentProps<typeof View>> & NativeStackScreenProps<RootStackParamList, 'Default'>;
interface PlaceListProps extends PropType {
    
}


const PlaceList: React.FC<PlaceListProps> = ({ navigation, ...props }) => {
    return (
        <View>
            <Text>Place list</Text>
            <Button title="See details of place" onPress={() => {
                navigation.navigate("PlaceDetail")
            }} />
        </View>
    )
}

export default PlaceList;