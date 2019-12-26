import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList
} from 'react-native';

export default class DetailMedicine extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }



    renderItemMedicine = (item, index) => {
        return (
            <View style={styles.containerItemMedicine}>
                <View style={styles.stt}><Text>{index}</Text></View>
                <View style={{ flex: 10 }}>
                    <View style={styles.row1DetailMedicine}>
                        <Text style={{ flex: 7 }}>{item.Ten}</Text>
                        <Text style={{ flex: 1, marginLeft: 5 }}>{item.SoLuong}</Text>
                        <Text style={{ flex: 2 }}>{item.DonVi}</Text>
                    </View>
                    <View style={{ marginHorizontal: 10, paddingLeft: 10, flex: 8 }}>
                        <Text>Liều dùng: {item.LieuDung}</Text>
                    </View>
                </View>
            </View>
        );
    }

    render() {
        let { medicine } = this.props;
        return (
            ((medicine == null) ? <View style={styles.nonMedicineView}>
                <Text style={styles.nonMedicineText}>Chưa có đơn thuốc</Text>
            </View> : (
                    <View style={styles.containerDetail}>
                        <FlatList
                            data={medicine}
                            renderItem={({ item, index }) => this.renderItemMedicine(item, index + 1)}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                ))
        )
    }
}

const styles = StyleSheet.create({
    containerItemMedicine: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
    },
    stt: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    row1DetailMedicine: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 10,
        paddingLeft: 10,
        justifyContent: 'space-between'
    },
    hr: {
        marginTop: 5,
        height: 0.25,
        elevation: 1,
        shadowRadius: 5,
        shadowOpacity: 0.2,
        backgroundColor: 'lightgray'
    },
    containerDetail: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
        backgroundColor: 'white',
        marginHorizontal: 10,
        paddingTop: 5
    },
    nonMedicineText: {
        fontSize: 14,
        color: "gray",
        fontWeight: "bold"
    },
    nonMedicineView: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
        backgroundColor: 'white',
        marginHorizontal: 10,
        paddingTop: 5,
        padding: 10,
        alignItems: 'center'
    }
})