import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react"
import { StyleSheet, View, Text, Button } from "react-native"
import places from "../../data/places";
import RootStackParamList from "../root-stack-param-list/root-stack-param-list";

type PropType = Partial<React.ComponentProps<typeof View>> & NativeStackScreenProps<RootStackParamList, 'Default'>;
interface PlaceDetailProps extends PropType {
    placeId: string
}

const PlaceOverview: React.FC<PlaceDetailProps> = ({ navigation, placeId, ...props }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{places.find(p => p.id == placeId.toString())?.name ?? 'NoName'}</Text>
            <Text style={styles.desc}>{places.find(p => p.id == placeId.toString())?.description ?? 'NoDesc'}</Text>
            <View style={styles.buttonWrap}>
                <Button title="Detail místa" onPress={() => {
                    navigation.navigate("PlaceDetail", { placeId })
                }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        backgroundColor: 'white',
        width: '100%',
        marginBottom: 24
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        padding: 20
    },
    desc: {
        paddingHorizontal: 20
    },
    buttonWrap: {
        margin: 20
    }
})

export default PlaceOverview;