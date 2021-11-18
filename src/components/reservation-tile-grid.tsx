import React, { useState } from "react"
import { View, StyleSheet, ScrollView, Text, TouchableHighlight } from "react-native"
import Reservable, { reservableTypeTexts } from "../data_mgmt/reservable";
import Reservation from "../data_mgmt/reservation";


type PropType = Partial<React.ComponentProps<typeof View>>;
interface ReservationTileGridProps extends PropType {
    reservable: Reservable
}

const ReservationTileGrid: React.FC<ReservationTileGridProps> = ({ reservable }) => {
    
    const r = reservable;

    const range = (start: number, end: number): number[] => {
        if(start === end) return [start];
        return [start, ...range(start + 1, end)];
    }

    const updateReservationTimes = (sectionTapped: number, row: number) => {
        setReservation((prevR) => {
            prevR.row = row;
            prevR.date = new Date();
            if (prevR.startSection === sectionTapped) {
                return { 
                    startSection: sectionTapped,
                    endSection: sectionTapped,
                    date: new Date(),
                    row: row
                }
            }
            if (prevR.startSection === undefined && prevR.endSection === undefined) {
                return { 
                    startSection: sectionTapped, 
                    endSection: sectionTapped,
                    date: new Date(),
                    row: row
                }
            }
            if (prevR.startSection !== undefined && sectionTapped < prevR.startSection) {
                return { 
                    startSection: sectionTapped, 
                    endSection: prevR.startSection,
                    date: new Date(),
                    row: row
                }
            }
            console.log(prevR.startSection);
            console.log(sectionTapped);            
            if (prevR.startSection !== undefined && sectionTapped > prevR.startSection) {
                return { 
                    endSection: sectionTapped, 
                    date: new Date(),
                    row: row
                }
            }
            let r: Reservation = {
                date: new Date(),
                startSection: sectionTapped,
                endSection: sectionTapped,
                row
            }
            console.log("Fallback");
            console.log(r);
            return r;
        })
    }

    const [ reservation, setReservation ] = useState<Reservation>({});

    return <ScrollView style={ styles.scrollContainer } contentContainerStyle={{ flexWrap: 'wrap' }} horizontal={true} >
        <View style={styles.wrap}>
            <View style={styles.timeWrap}>
                <Text style={styles.timeTitle}>Čas</Text>
                {range(r.openHour, r.closeHour).map(h => <Text style={styles.time} key={h}>{h}</Text>)}
            </View>
            {Array.from(Array(r.howMany).keys()).map(n => <View style={styles.rowWrap} key={n}>
                <Text style={styles.title}>{reservableTypeTexts[r.type]} #{n + 1}</Text>
                {Array.from(Array(r.closeHour - r.openHour + 1).keys()).map(t => <View style={styles.tileWrap} key={t}>
                    <TouchableHighlight style={styles.tileButton} underlayColor='#aaa' onPress={() => {
                        updateReservationTimes(t, n);
                    }}>
                        <View style={t >= (reservation.startSection ?? 10000) && t <= (reservation.endSection ?? -10000) && reservation.row == n ? styles.highlight : {}}></View>
                    </TouchableHighlight>
                </View>)}
            </View>)}
        </View>
   </ScrollView>
}

const styles = StyleSheet.create({
    scrollContainer: {

    },
    wrap: {
        flex: 1,
        marginVertical: 12,
        borderRadius: 16,
        padding: 16,
        backgroundColor: 'white'
    },
    rowWrap: {
        flexDirection: 'row',
        height: 41,
        flex: 1,
        borderTopWidth: 1,
        borderTopColor: '#777',
        alignItems: 'center'
    },
    tileWrap: {
        marginVertical: 4,        
        height: 32,
        width: 50,        
        borderLeftWidth: 1,
        borderLeftColor: '#888'
    },
    tileButton: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        width: 70
    },
    timeTitle: {
        width: 70,
    },
    timeWrap: {
        height: 32,
        marginVertical: 4,
        paddingVertical: 4,
        flexDirection: 'row',
        alignItems: 'center',
    },
    time: {
        width: 50,
        textAlign: 'center'
    },
    highlight: {
        borderRadius: 10,
        height: 20,
        width: 20,
        backgroundColor: 'blue'
    }
})

export default ReservationTileGrid;