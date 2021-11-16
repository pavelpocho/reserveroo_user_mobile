import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react"
import { View, Text, Button } from "react-native"
import PlaceOverview from "../components/place-overview";
import RootStackParamList from "../root-stack-param-list/root-stack-param-list";

type PropType = Partial<React.ComponentProps<typeof View>> & NativeStackScreenProps<RootStackParamList, 'Default'>;
interface PlaceListProps extends PropType {
    
}


const PlaceList: React.FC<PlaceListProps> = ({ navigation, route, ...props }) => {
    return (
        <View>
            <PlaceOverview navigation={navigation} route={route} placeId={"Biliard"} />
            <PlaceOverview navigation={navigation} route={route} placeId={"Restaurace"} />
            <PlaceOverview navigation={navigation} route={route} placeId={"Tenis"} />
        </View>
    )
}

export default PlaceList;