import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react"
import { View, Text, Button, ScrollView, TextInput, Keyboard, StyleSheet } from "react-native"
import places from "../../data/places";
import PlaceOverview from "../components/place-overview";
import RootStackParamList from "../root-stack-param-list/root-stack-param-list";

type PropType = Partial<React.ComponentProps<typeof View>> & NativeStackScreenProps<RootStackParamList, 'Default'>;
interface PlaceListProps extends PropType {
    
}


const PlaceList: React.FC<PlaceListProps> = ({ navigation, route, ...props }) => {

    // const [searching, setSearching] = React.useState(false);

    // const getSideButton = () => {
    //     return !searching ? <Button title="Profile" onPress={() => {}} key='profile-button' /> : <Button title="Cancel" onPress={() => {Keyboard.dismiss()}} key={'cancel-button'} />
    // }

    // This is very broken, because a state change does not trigger a new call of the useLayoutEffect

    // React.useLayoutEffect(() => {
	// 	navigation.setOptions({
    //         header: () => (
    //             <View style={{ flexDirection: 'row', marginTop: 28, height: 40 }}>
    //                 <View style={{ flex: 1, height: 24, backgroundColor: "black" }}>
    //                     <TextInput style={{ color: 'white' }} onFocus={() => {
    //                         console.log("Setting searching true");
    //                         setSearching(true);
    //                     }} onBlur={() => {
    //                         console.log("Setting searching false");
    //                         setSearching(false);
    //                     }}/>
    //                 </View>
    //                 {getSideButton()}
    //             </View>
    //         )
    //         // headerLeft: () => {
    //         //     return (
    //         //         <View>
    //         //             <Button title="Profile" onPress={() => {}} />
    //         //         </View>
    //         //     )
    //         // },
	// 		// headerTitle: () => {
    //         //     return (
    //         //         <View style={{ flex: 1, height: 24, backgroundColor: "black" }}></View>
    //         //     )
    //         // },
    //         // headerRight: () => {
    //         //     return (
    //         //         <View>
    //         //             <Button title="Profile" onPress={() => {}} />
    //         //         </View>
    //         //     )
    //         // }
	// 	});
	// }, [navigation]);

    return (
        <ScrollView style={styles.scrollContainer} contentContainerStyle={{flexWrap: 'wrap'}}>
            <View style={styles.container}>
                {places.map(p => <PlaceOverview navigation={navigation} route={route} placeId={p.id} key={p.id} />)}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        backgroundColor: '#f1f1f1',
        flex: 1
    },
    container: {
        width: '100%',
        padding: 20
    }
});

export default PlaceList;