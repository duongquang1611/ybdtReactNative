import React, { Component } from 'react'
import { Text, StyleSheet, View, Dimensions } from 'react-native'
export default class ItemMedicine extends Component {
    render() {
        let { item } = this.props;
        let { stt } = this.props;
        return (
            <View style={styles.itemRow}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={{ textAlign: "center" }}>{stt}</Text>
                </View>
                <View style={{ flex: 7 }}>
                    <Text style={styles.tenThuoc}>{item.Ten}</Text>
                    <Text>Liều dùng: {item.LieuDung}</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={{ textAlign: "center" }}>{item.SoLuong}</Text>
                </View>
                <View style={{ flex: 1.5, justifyContent: 'center' }}>
                    <Text style={{ textAlign: "center" }}>{item.DonVi}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    itemRow: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: 6,
        borderBottomColor: 'black',
        borderBottomWidth: 0.5,
        paddingVertical: 6
    },
    tenThuoc: {
        fontWeight: 'bold',
    }
})
