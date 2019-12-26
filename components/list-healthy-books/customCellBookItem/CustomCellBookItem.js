import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { MaterialCommunityIcons, MaterialIcons, FontAwesome } from "react-native-vector-icons";

const CustomCellBookItem = ({ lankham, index }) => (
        <View style={styles.container}>
            <View style={styles.container_col1}>
                <View style={styles.container_row1}>
                    <View style={styles.container_title}>
                        <View style={styles.container_title_icon}>
                            <MaterialCommunityIcons name="medical-bag" size={24} color="red" />
                        </View>
                        <View style={styles.container_title_text}>
                            <Text style={styles.title_text} >Phiếu khám #{index}</Text>
                        </View>
                    </View>
                    <View style={styles.container_doctor}>
                        <View style={styles.container_doctor_icon}>
                            <MaterialCommunityIcons name="doctor" size={20} color="dodgerblue" />
                        </View>
                        <View style={styles.container_doctor_name}>
                            <Text style={styles.doctor_name}>{lankham.TenBacSi}</Text>
                        </View>

                    </View>
                </View>
                <View style={styles.container_row2}>
                    <View style={styles.container_day}>
                        <Text style={styles.day}>{lankham.Ngay}</Text>
                    </View>
                    <View style={styles.container_month}>
                        <Text style={styles.month}>{lankham.Thang}</Text>
                    </View>
                    <View style={styles.container_time}>
                        <View style={styles.container_time_icon}>
                            <MaterialIcons name="access-time" size={16} color="#17b878" />
                        </View>
                        <View style={styles.container_time_text}>
                            <Text style={styles.time_text}>"{lankham.Gio}:{lankham.Phut}"</Text>
                        </View>
                    </View>

                </View>
            </View>
            <View style={styles.container_col2}>
                <View>
                    <View style={styles.container_examination}>
                        <View style={styles.containter_examination_icon}>
                            <FontAwesome name="pencil-square-o" size={18} color="black" />
                        </View>
                        <View style={styles.containter_examination_text}>
                            <Text style={styles.examination_text}>{lankham.ChanDoan}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.container_detail}>
                    <View style={styles.container_detail_icon}>
                        <FontAwesome name="long-arrow-right" size={18} color="green" />
                    </View>
                    <View style={styles.container_detail_text}>
                        <Text style={styles.detail_text}>Xem chi tiết ...</Text>
                    </View>
                </View>
            </View>
        </View>

)

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginTop: 10,
        marginRight: 20,
        marginLeft: 20,
        padding: 10,
        // borderLeftWidth: 0.1,
        // borderLeftColor: "white",
        // borderTopWidth: 0.5,
        // borderTopColor: "gray",
        // borderRightWidth: 0.1,
        // borderRightColor: "white",
        borderLeftWidth: 2,
        borderLeftColor: "#17b817",
        shadowColor: "silver",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 2,
            width: 2
        },
        elevation: 3
    },

    container_col1: {
        flex: 6,
        flexDirection: 'row'
        // borderBottomWidth: 0.5,
        // borderBottomColor: "gray"
    },

    container_row1: {
        flex: 7,
        flexDirection: "column",
        justifyContent: "flex-start",
        borderRightWidth: 0.4,
        borderRightColor: "lightgray"

    },

    container_title: {
        flex: 7,
        flexDirection: "row"
    },

    container_title_icon: {
        flex: 2,
        justifyContent: "center",
    },

    container_title_text: {
        flex: 8,
        justifyContent: "center"
    },

    title_text: {
        fontSize: 18,
        fontWeight: "bold",
        textTransform: "uppercase",
        color: "dodgerblue"
    },

    container_doctor: {
        flex: 3,
        paddingTop: 5,
        flexDirection: "row"
    },

    container_doctor_icon: {
        flex: 2,
        justifyContent: "center"
    },

    container_doctor_name: {
        flex: 8,
        justifyContent: "center",
        alignItems: "flex-start"
    },

    doctor_name: {
        fontSize: 14,
        color: "darkgray",
        fontWeight: "bold"
    },


    container_row2: {
        flex: 3,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center"
    },

    container_day: {
        flex: 4,
        alignItems: "center"
    },

    day: {
        fontSize: 20,
        color: "#17b817",//"palevioletred",
        fontWeight: "bold"
    },

    container_month: {
        flex: 3,
        paddingTop: 5,
        alignItems: "center"
    },

    month: {
        fontSize: 14,
        color: "green"
    },

    container_time: {
        flex: 3,
        paddingTop: 5,
        flexDirection: "row",
        alignItems: "center"
    },

    container_time_icon: {
        flex: 3,
        alignItems: "flex-end",
        justifyContent: "flex-start"
    },

    container_time_text: {
        flex: 7,
        alignItems: "center",
        justifyContent: "flex-start"
    },

    time_text: {
        fontSize: 14,
        color: "darkgray",
        fontWeight: "bold"
    },

    container_col2: {
        flex: 4,
        marginTop: 20,
        flexDirection: "column"
    },

    container_examination: {
        flex: 7,
        flexDirection: "row"
    },

    containter_examination_icon: {
        flex: 2,
        justifyContent: "center"
    },

    containter_examination_text: {
        flex: 8,
        alignItems: "flex-start"
    },

    examination_text: {
        fontSize: 16,
        fontWeight: "300"
    },

    container_detail: {
        flex: 3,
        marginTop: 10,
        flexDirection: "row"
    },

    container_detail_icon: {
        flex: 2,
        justifyContent: "center"
    },

    container_detail_text: {
        flex: 8,
        justifyContent: "center",
        alignItems: "flex-start"
    },

    detail_text: {
        fontSize: 14,
        color: "darkgray",
        fontWeight: "900",
        textTransform: "uppercase"
    }








});


export default CustomCellBookItem;