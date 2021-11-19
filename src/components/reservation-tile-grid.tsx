import React, { useState } from "react"
import { View, StyleSheet, ScrollView, Text, TouchableHighlight } from "react-native"
import { useReservationContext } from "../contexts/reservation-context";
import Reservable, { reservableTypeTexts } from "../data_mgmt/reservable";
import Reservation from "../data_mgmt/reservation";


type PropType = Partial<React.ComponentProps<typeof View>>;
interface ReservationTileGridProps extends PropType {
    reservable: Reservable
}

const ReservationTileGrid: React.FC<ReservationTileGridProps> = ({ reservable }) => {
    
    const r = reservable;

    const range = (start: number, end: number): number[] => {
        if (start > end) throw new Error("Start in range more than in end!");
        if (start === end) return [start];
        return [start, ...range(start + 1, end)];
    }

    const updateReservationTimes = (sectionTapped: number, row: number) => {
        if (setReservation) setReservation((prevR) => {
            prevR.row = row;
            prevR.date = new Date();
            if (prevR.startSection === sectionTapped || prevR.endSection === sectionTapped) {
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
            if (prevR.startSection !== undefined && sectionTapped > prevR.startSection) {
                return { 
                    startSection: prevR.startSection,
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

    const context = useReservationContext();
    const reservation = context?.reservation;
    const setReservation = context?.setReservation;
    // This will eventually be a context so only one selection will be possible

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
                        <View style={
                            (t > (reservation?.startSection ?? 10000) && t < (reservation?.endSection ?? -10000) && reservation?.row === n) ? (
                                styles.highlight
                            ) : (t === reservation?.startSection && t === reservation?.endSection && reservation?.row === n) ? (
                                styles.onlyHighlight
                            ) : (t === reservation?.startSection && reservation.row === n) ? (
                                styles.startHighlight
                            ) : (t === reservation?.endSection && reservation.row === n) ? (
                                styles.endHighlight
                            ) : {}
                        }></View>
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
        height: 20,
        width: 20,
        backgroundColor: 'blue'
    },
    startHighlight: {
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        height: 20,
        width: 20,
        backgroundColor: 'blue'
    },
    endHighlight: {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        height: 20,
        width: 20,
        backgroundColor: 'blue'
    },
    onlyHighlight: {
        borderRadius: 10,
        height: 20,
        width: 20,
        backgroundColor: 'blue'
    }
})

export default ReservationTileGrid;