import { NavigationContainer } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react"
import { View, Text, Button, Alert, StyleSheet, TouchableHighlight } from "react-native"
import places from "../../data/places";
import { reservableTypeTexts } from "../data_mgmt/reservable";
import RootStackParamList from "../root-stack-param-list/root-stack-param-list";
import { MaterialIcons } from '@expo/vector-icons';

type PropType = Partial<React.ComponentProps<typeof View>> & NativeStackScreenProps<RootStackParamList, 'Default'>;
interface PlaceReservationProps extends PropType {
    
}

const PlaceReservation: React.FC<PlaceReservationProps> = ({ route, navigation, ...props }) => {

    const params: any = route.params;

    const place = places.find(p => p.id == params.placeId.toString());

    return (
        <View>            
            <View style={styles.dateWrap}>
                <TouchableHighlight>
                    <MaterialIcons name="chevron-left" size={32} color="black" />
                </TouchableHighlight>
                <Text>Today</Text>
                <TouchableHighlight>
                    <MaterialIcons name="chevron-right" size={32} color="black" />
                </TouchableHighlight>
            </View>
            {
                place?.reservables.map((r, i) => <View style={styles.reservableWrap} key={i}>
                    <Text>{reservableTypeTexts[r.type]} {r.howMany}x</Text>
                    <View style={styles.reserveTilesWrap}>
                        {/* Reservation tiles here for each hour or whatever when it's open and for each table or place*/}
                    </View>
                </View>)
            }
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

const styles = StyleSheet.create({
    reservableWrap: {

    },
    dateWrap: {
        flexDirection: 'row'
    },
    reserveTilesWrap: {

    }
})

export default PlaceReservation;