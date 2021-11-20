import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useRef } from "react"
import { View, Text, Button, ScrollView, TextInput, Keyboard, StyleSheet, TouchableHighlight, Animated } from "react-native"
import places from "../../data/places";
import PlaceOverview from "../components/place-overview";
import RootStackParamList from "../root-stack-param-list/root-stack-param-list";
import { Picker } from '@react-native-picker/picker';

interface FadeInViewProps extends Partial<React.ComponentProps<typeof View>> {
    style: object   
}

type PropType = Partial<React.ComponentProps<typeof View>> & NativeStackScreenProps<RootStackParamList, 'Default'>;
interface PlaceListProps extends PropType {
    
}

const SlideUpView: React.FC<FadeInViewProps> = ({ children, style }) => {

    const pickerAnim = useRef(new Animated.Value(300)).current;

    React.useEffect(() => {
        Animated.timing(
            pickerAnim,
            {
                toValue: 0,
                duration: 350,
                useNativeDriver: false
            }
        ).start();
    }, [pickerAnim])

    return (
        <Animated.View
          style={{
            ...style,
            transform: [{ translateY: pickerAnim }]
          }}
        >
          {children}
        </Animated.View>
      );
}

const PlaceList: React.FC<PlaceListProps> = ({ navigation, route, ...props }) => {

    const [ picker, setPicker ] = React.useState<boolean>(false);
    const [ category, setCategory ] = React.useState<string>('Všechny kategorie');

    return (
        <View style={styles.absoluteWrap}>
            <ScrollView style={styles.scrollContainer} contentContainerStyle={{flexWrap: 'wrap'}}>
                <View style={styles.container}>
                    <View style={styles.searchFilterContainer}>
                        <View style={styles.searchBar}>
                            <MaterialIcons name='search' size={24} color='#777' />
                            <TextInput style={styles.searchInput} placeholder='Hledat' />
                        </View>
                        <View style={styles.categorySelect}>
                            <TouchableHighlight style={styles.categorySelectHighlight} underlayColor='#ddd' onPress={() => {
                                setPicker(!picker);
                            }}>
                                <View style={styles.categorySelectInner}>
                                    <Text>Kategorie: {category}</Text>
                                    <MaterialIcons name='arrow-drop-down' size={18} />
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>
                    {places.map(p => <PlaceOverview navigation={navigation} route={route} placeId={p.id} key={p.id} />)}
                </View>
            </ScrollView>
            {picker && <SlideUpView style={[styles.pickerWrap, ]}>
                <TouchableHighlight underlayColor='transparent' onPress={() => {
                    setPicker(!picker);
                }} style={styles.pickerClose}>
                    <View></View>
                </TouchableHighlight>
                <View style={styles.pickerTightWrap}>
                    <Picker
                        selectedValue={category}
                        onValueChange={(itemValue, itemIndex) =>
                            setCategory(itemValue)
                        }>
                        <Picker.Item label="Všechny kategorie" value="Všechny kategorie" />
                        <Picker.Item label="Sport" value="Sport" />
                        <Picker.Item label="Restaurace" value="Restaurace" />
                        <Picker.Item label="Zábava" value="Zábava" />
                        <Picker.Item label="Ostatní" value="Ostatní" />
                    </Picker>
                </View>
            </SlideUpView>}
        </View>
    )
}

const styles = StyleSheet.create({
    absoluteWrap: {
        width: '100%',
        height: '100%'
    },
    scrollContainer: {
        backgroundColor: '#f1f1f1',
        flex: 1
    },
    container: {
        width: '100%',
        padding: 20
    },
    searchFilterContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 20,
        marginBottom: 24
    },
    searchBar: {
        flexDirection: 'row',
        backgroundColor: '#f1f1f1',
        padding: 8,
        borderRadius: 8,
        alignItems: 'center'
    },
    searchInput: {
        height: '100%',
        flex: 1,
        paddingLeft: 12
    },
    pickerTightWrap: {
        width: '100%',
        backgroundColor: 'white',
        borderTopWidth: 1,        
        borderTopColor: '#dddd'
    },
    pickerWrap: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        alignItems: 'flex-end',
        zIndex: 1,
        bottom: 0
    },
    pickerClose: {
        flex: 1,
        width: '100%'
    },
    categorySelect: {
        marginTop: 12
    },
    categorySelectInner: {
        flexDirection: 'row'
    },
    categorySelectHighlight: {
        padding: 12,
        borderRadius: 8
    }
});

export default PlaceList;