import React, { Component } from "react";
import { TouchableWithoutFeedback, Text, View, StyleSheet } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
// import { Feather, Ionicons, FontAwesome, AntDesign, MaterialIcons, MaterialCommunityIcons } from 'react-native-vector-icons'; // 6.2.2
import { Ionicons, Entypo, FontAwesome, AntDesign } from "@expo/vector-icons"; // 6.2.2
import moment from "moment";
export default class ItemAppointment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSelected: false,
        };
    }

    _onPressItem = () => {
        this.setState((prevState, prevPros) => ({
            isSelected: !prevState.isSelected,
        }));
    };

    render() {
        let { item } = this.props;
        let { isSelected } = this.state;
        // return <View><Text>Không có thông tin lịch hẹn</Text></View>

        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={this._onPressItem}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <View
                            style={{
                                alignItems: "center",
                                marginLeft: wp("2.5%"),
                            }}
                        >
                            <View style={{ padding: 10 }}>
                                <View style={styles.viewDateAndTime}>
                                    <View style={styles.iconAndTextDate}>
                                        <FontAwesome
                                            name="calendar-o"
                                            color={
                                                isSelected
                                                    ? "#17B890"
                                                    : "#01C89E"
                                            }
                                            size={14}
                                        />
                                        <Text
                                            style={{
                                                color: isSelected
                                                    ? "gray"
                                                    : "black",
                                                ...styles.dateText,
                                            }}
                                        >
                                            {moment(item.start).format(
                                                "DD/MM/YYYY"
                                            )}
                                        </Text>
                                    </View>

                                    <View style={styles.iconAndTextDate}>
                                        <Ionicons
                                            name="md-alarm"
                                            size={14}
                                            color={
                                                isSelected
                                                    ? "#17B890"
                                                    : "#01C89E"
                                            }
                                        />
                                        <Text
                                            style={{
                                                color: isSelected
                                                    ? "gray"
                                                    : "black",
                                                ...styles.hourText,
                                            }}
                                        >
                                            {moment(
                                                Date.parse(
                                                    new Date(item.start)
                                                ) -
                                                    7 * 60 * 60 * 1000
                                            ).format("HH:mm")}
                                        </Text>
                                    </View>
                                </View>

                                <View style={{ marginLeft: 20 }}>
                                    <View style={styles.roomWrapper}>
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                            }}
                                        >
                                            <View style={styles.iconWrapper}>
                                                <Entypo
                                                    name="location"
                                                    color={
                                                        isSelected
                                                            ? "#17B890"
                                                            : "#01C89E"
                                                    }
                                                    size={14}
                                                />
                                            </View>
                                            <Text
                                                style={{
                                                    color: isSelected
                                                        ? "gray"
                                                        : "black",
                                                    ...styles.roomText,
                                                }}
                                            >
                                                {item.meta.roomName
                                                    ? item.meta.roomName
                                                    : "Chưa có phòng khám"}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.noteWrapper}>
                                        <View style={styles.iconAndTextNote}>
                                            <View style={styles.iconWrapper}>
                                                <Ionicons
                                                    name="md-create"
                                                    color={
                                                        isSelected
                                                            ? "#17B890"
                                                            : "#01C89E"
                                                    }
                                                    size={14}
                                                />
                                            </View>
                                            <Text
                                                style={{
                                                    color: isSelected
                                                        ? "gray"
                                                        : "black",
                                                    ...styles.noteText,
                                                }}
                                            >
                                                {item.meta.note.trim() == ""
                                                    ? "Không có ghi chú"
                                                    : item.meta.note.trim()}
                                            </Text>
                                        </View>
                                        {/* <View style={{ width: wp('10%') }}><AntDesign name={isSelected ? 'star' : 'staro'} size={14} color={isSelected ? 'powderblue' : 'dodgerblue'} /></View> */}
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        backgroundColor: "white",
        borderRadius: 10,
        borderColor: "#F4F4F4",
        marginTop: 5,
        marginBottom: 3,
        marginLeft: 10,
        marginRight: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
    roomText: {
        fontWeight: "bold",
        marginLeft: 7,
        fontSize: 14,
    },
    noteText: {
        fontStyle: "italic",
        marginLeft: 8,
        fontSize: 13,
    },
    noteWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 4,
        alignItems: "center",
    },
    roomWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 4,
        width: wp("82%"),
    },
    hourText: {
        marginLeft: 7,
        fontSize: 12,
        fontStyle: "italic",
    },
    dateText: {
        fontWeight: "bold",
        marginLeft: 8,
        fontSize: 12,
    },
    viewDateAndTime: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: wp("82%"),
    },
    iconAndTextDate: {
        flexDirection: "row",
        alignItems: "center",
    },
    iconAndTextNote: {
        flexDirection: "row",
        width: wp("70%"),
        alignItems: "center",
    },
    iconWrapper: {
        height: 15,
        width: 15,
        alignItems: "center",
        justifyContent: "center",
    },
});
