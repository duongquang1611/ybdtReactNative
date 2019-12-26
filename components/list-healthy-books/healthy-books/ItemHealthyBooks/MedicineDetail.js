
import React from 'react'

import { Text, View, StyleSheet } from 'react-native'


const MedicneDetail = ({ item, index }) => (
    <View>
        <View style={styles.row}>
            <View style={styles.text}>
                <Text style={[styles.name]}>{index}</Text>
            </View>
            <View style={styles.text1}>
                <Text style={[styles.name]}>{item.Ten} .{item.LieuDung}</Text>
            </View>
            <View style={styles.text2}>
                <Text style={[styles.name]}>{item.SoLuong}</Text>
            </View>
            <View style={styles.text3}>
                <Text style={[styles.name]}>{item.DonVi}</Text>
            </View>
        </View>
    </View>
)



const primaryTextColor = '#2f4f4f'


const styles = StyleSheet.create({

    name: {
        color: primaryTextColor,
        fontSize: 14,
        textAlign: 'left',
        justifyContent: 'center',
    },


    name1: {
        textAlign: 'center',
        color: 'dodgerblue',
        fontWeight: 'bold',
        fontSize: 16
    },



    row: {

        flexDirection: 'row',
    },

    text: {
        flex: 1,
        padding: 5,
        justifyContent: 'center',
    },

    text1: {
        flex: 6,
        padding: 5,
        justifyContent: 'center',
    },

    text2: {
        flex: 1,
        padding: 5,
        justifyContent: 'center',
    },

    text3: {
        flex: 2,
        padding: 5,
        justifyContent: 'center',
    },

});

export default MedicneDetail;