import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react"
import { View, Text, Button, ScrollView } from "react-native"
import PlaceOverview from "../components/place-overview";
import RootStackParamList from "../root-stack-param-list/root-stack-param-list";

type PropType = Partial<React.ComponentProps<typeof View>> & NativeStackScreenProps<RootStackParamList, 'Default'>;
interface PlaceListProps extends PropType {
    
}


const PlaceList: React.FC<PlaceListProps> = ({ navigation, route, ...props }) => {

    React.useLayoutEffect(() => {
		navigation.setOptions({
            header: () => (
                <View style={{ flexDirection: 'row', marginTop: 28, height: 40 }}>
                    <View style={{ flex: 1, height: 24, backgroundColor: "black" }}>
                        <Text style={{ color: 'white' }}>Search bar here</Text>
                    </View>
                    <Button title="Profile" onPress={() => {}} />
                </View>
            )
            // headerLeft: () => {
            //     return (
            //         <View>
            //             <Button title="Profile" onPress={() => {}} />
            //         </View>
            //     )
            // },
			// headerTitle: () => {
            //     return (
            //         <View style={{ flex: 1, height: 24, backgroundColor: "black" }}></View>
            //     )
            // },
            // headerRight: () => {
            //     return (
            //         <View>
            //             <Button title="Profile" onPress={() => {}} />
            //         </View>
            //     )
            // }
		});
	}, [navigation]);

    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{flexWrap: 'wrap'}}>
            <View style={{ flex: 1 }}>
                <PlaceOverview navigation={navigation} route={route} placeId={"Biliard"} />
                <PlaceOverview navigation={navigation} route={route} placeId={"Restaurace"} />
                <PlaceOverview navigation={navigation} route={route} placeId={"Tenis"} />
            </View>
        </ScrollView>
    )
}

export default PlaceList;