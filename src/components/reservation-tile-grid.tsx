import React, { useState } from "react"
import { View, StyleSheet, ScrollView, Text, TouchableHighlight } from "react-native"
import { useReservationContext } from "../contexts/reservation-context";
import Place from "../data_mgmt/place";
import Reservable, { reservableTypeTexts } from "../data_mgmt/reservable";
import Reservation from "../data_mgmt/reservation";


type PropType = Partial<React.ComponentProps<typeof View>>;
interface ReservationTileGridProps extends PropType {
    reservable: Reservable,
    place: Place,
    date: Date
}

const ReservationTileGrid: React.FC<ReservationTileGridProps> = ({ reservable, place, date }) => {
    
    const r = reservable;

    const range = (start: number, end: number, increment: number): number[] => {
        if (start > end) return [];
        if (start === end) return [start];
        return [start, ...range(start + increment, end, increment)];
    }

    const updateReservationTimes = (sectionTapped: number, row: number) => {
        if (setReservation) setReservation((prevR) => {
            if (prevR.row !== row) {
                prevR.startSection = undefined;
                prevR.endSection = undefined;
            }
            if (prevR.startSection === sectionTapped || prevR.endSection === sectionTapped) {
                return { 
                    startSection: sectionTapped,
                    endSection: sectionTapped,
                    date: date,
                    row: row,
                    placeId: place.id,
                    reservableId: reservable.id
                }
            }
            if (prevR.startSection === undefined && prevR.endSection === undefined) {
                return { 
                    startSection: sectionTapped, 
                    endSection: sectionTapped,
                    date: date,
                    row: row,
                    placeId: place.id,
                    reservableId: reservable.id
                }
            }
            if (prevR.startSection !== undefined && sectionTapped < prevR.startSection) {
                return { 
                    startSection: sectionTapped, 
                    endSection: prevR.startSection,
                    date: date,
                    row: row,
                    placeId: place.id,
                    reservableId: reservable.id
                }
            }
            if (prevR.startSection !== undefined && sectionTapped > prevR.startSection) {
                return { 
                    startSection: prevR.startSection,
                    endSection: sectionTapped, 
                    date: date,
                    row: row,
                    placeId: place.id,
                    reservableId: reservable.id
                }
            }
            let r: Reservation = {
                startSection: sectionTapped,
                endSection: sectionTapped,
                date: date,
                row,
                placeId: place.id,
                reservableId: reservable.id
            }
            return r;
        })
    }

    const getTimes = (startHour: number, endHour: number, timeStepInHours: number): Date[] => {
        return range(startHour, endHour, timeStepInHours).map(v => {
            const m = (v * 60) % 60;
            const h = Math.floor(v);
            let date = new Date();
            date.setMilliseconds(0);
            date.setSeconds(0);
            date.setMinutes(m);
            date.setHours(v);
            return date;
        })
    }

    const context = useReservationContext();
    const reservation = context?.reservation;
    const setReservation = context?.setReservation;

    return <ScrollView style={ styles.scrollContainer } contentContainerStyle={{ flexWrap: 'wrap' }} horizontal={true} >
        <View style={styles.wrap}>
            <View style={styles.timeWrap}>
                <Text style={styles.timeTitle}>Čas</Text>
                {getTimes(r.openHour, r.closeHour - r.timeStepInHours, r.timeStepInHours).map(d => <Text style={styles.time} key={d.getTime()}>{d.getHours() + ':' + (d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes())}</Text>)}
            </View>
            {Array.from(Array(r.howMany).keys()).map(n => <View style={styles.rowWrap} key={n}>
                <Text style={styles.title}>{reservableTypeTexts[r.type]} #{n + 1}</Text>
                {Array.from(Array((r.closeHour - r.openHour) / r.timeStepInHours).keys()).map(t => <View style={styles.tileWrap} key={t}>
                    <TouchableHighlight style={styles.tileButton} underlayColor='#aaa' onPress={() => {
                        updateReservationTimes(t, n);
                    }}>
                        {reservation?.placeId == place.id && reservation?.reservableId == reservable.id && reservation?.row === n && reservation?.date?.getTime() == date.getTime() ? <View style={
                            (t > (reservation?.startSection ?? 10000) && t < (reservation?.endSection ?? -10000)) ? (
                                styles.highlight
                            ) : (t === reservation?.startSection && t === reservation?.endSection) ? (
                                styles.onlyHighlight
                            ) : (t === reservation?.startSection) ? (
                                styles.startHighlight
                            ) : (t === reservation?.endSection) ? (
                                styles.endHighlight
                            ) : {}
                        }></View> : <View></View>}
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
        // alignItems: 'center'
    },
    title: {
        width: 70
    },
    timeTitle: {
        width: 45,
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
        width: '100%',
        backgroundColor: 'blue'
    },
    startHighlight: {
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        height: 20,
        width: 35,
        backgroundColor: 'blue',
        alignSelf: 'flex-end'
    },
    endHighlight: {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        height: 20,
        width: 35,
        backgroundColor: 'blue',
        alignSelf: 'flex-start'
    },
    onlyHighlight: {
        borderRadius: 10,
        height: 20,
        width: 20,
        backgroundColor: 'blue',
        alignSelf: 'center'
    }
})

export default ReservationTileGrid;