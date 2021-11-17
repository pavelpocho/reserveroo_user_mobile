import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react"
import { View, Text, Button, StyleSheet, ScrollView } from "react-native"
import places from "../../data/places";
import { reservableTypeTexts } from "../data_mgmt/reservable";
import RootStackParamList from "../root-stack-param-list/root-stack-param-list";

type PropType = Partial<React.ComponentProps<typeof View>> & NativeStackScreenProps<RootStackParamList, 'Default'>;
interface PlaceDetailProps extends PropType {
    
}

const PlaceDetail: React.FC<PlaceDetailProps> = ({ route, navigation, ...props }) => {

    const params: any = route.params;

    const place = places.find(p => p.id == params.placeId.toString());

    React.useLayoutEffect(() => {
		navigation.setOptions({
            headerTitle: place?.name ?? 'NoName'
		});
	}, [navigation]);

    return (
        <ScrollView style={styles.scrollContainer} contentContainerStyle={{flexWrap: 'wrap'}}>
            <View style={styles.container}>
                <View style={styles.photoWrap}>
                    <Text style={{
                        fontSize: 24,
                        color: '#999',
                        fontWeight: 'bold'
                    }}>Fotka nebo něco</Text>
                </View>
                <Text style={styles.description}>{place?.description ?? 'NoDesc'}</Text>
                <Text style={styles.reservableTitle}>Prostory:</Text>
                {
                    place?.reservables.map((r, i) => <View style={styles.reservableWrap}>
                        <Text style={styles.reservableText}>{reservableTypeTexts[r.type]}: {r.howMany}x</Text>
                    </View>)
                }
                <Button title="Vytvořit rezervaci" onPress={() => {
                    navigation.navigate("PlaceReservation")
                }} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1
    },
    container: {
        padding: 20,
        width: '100%'
    },
    photoWrap: {
        height: 180,
        width: '100%',
        backgroundColor: '#e1e1e1',
        justifyContent: 'center',
        alignItems: 'center'
    },
    description: {
        paddingVertical: 20
    },
    reservableTitle: {
        fontWeight: 'bold',
        paddingVertical: 4
    },
    reservableWrap: {

    },
    reservableText: {
        paddingVertical: 4
    }
})

export default PlaceDetail;