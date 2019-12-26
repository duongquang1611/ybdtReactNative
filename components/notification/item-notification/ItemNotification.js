import React, { Component } from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
// import { Feather, Ionicons, AntDesign, FontAwesome, MaterialIcons, MaterialCommunityIcons } from 'react-native-vector-icons'; // 6.2.2
import moment from "moment";
export default class ItemNotification extends Component {
    constructor(props) {
        require("moment/locale/vi");
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
        // console.log(item);

        let { isSelected } = this.state;
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this._onPressItem}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "column",
                                alignItems: "center",
                                marginLeft: wp("2.5%"),
                            }}
                        >
                            <View style={{ padding: 10 }}>
                                <View style={styles.itemRow}>
                                    {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <FontAwesome name="calendar-o" color='dodgerblue' size={14} />
                    <Text style={{ color: 'black', marginLeft: 7, fontSize: 12 }}>
                      {moment(item.time, "YYYYMMDD").fromNow()}
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name="ios-clock" size={14} color='dodgerblue' />
                  <Text style={{ color: 'black', marginLeft: 7, fontSize: 12 }}>
                  {moment(item.time).format('HH:mm')}
                  </Text>
                </View> */}
                                    <Text
                                        style={{
                                            ...styles.title,
                                            color: isSelected
                                                ? "gray"
                                                : "dodgerblue",
                                        }}
                                    >
                                        {item.title}
                                    </Text>
                                    <Text
                                        style={{
                                            ...styles.fromNow,
                                            color: isSelected
                                                ? "gray"
                                                : "black",
                                        }}
                                    >
                                        {moment(
                                            item.time,
                                            "YYYYMMDD"
                                        ).fromNow()}
                                    </Text>
                                </View>
                                <View style={styles.viewContent}>
                                    <Text
                                        style={{
                                            color: isSelected
                                                ? "gray"
                                                : "black",
                                            fontSize: 14,
                                        }}
                                    >
                                        {item.body}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        flexDirection: "column",
        backgroundColor: "white",
        borderRadius: 10,
        borderColor: "#F4F4F4",
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 5,
    },
    title: {
        fontWeight: "bold",
        fontSize: 15,
    },
    fromNow: {
        marginLeft: 7,
        fontStyle: "italic",
        fontSize: 12,
    },
    viewContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5,
        alignItems: "center",
    },
    itemRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: wp("85%"),
    },
});
