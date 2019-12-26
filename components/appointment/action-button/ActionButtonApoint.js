import React, { Component } from "react";
import { Alert, StyleSheet } from "react-native";
import ActionButton from "react-native-action-button";
import { Ionicons } from "@expo/vector-icons"; // 6.2.2
export default class ActionButtonAppoint extends Component {
    render() {
        return (
            <ActionButton buttonColor="#01C89E">
                <ActionButton.Item
                    buttonColor="dodgerblue"
                    title="Đặt khám"
                    onPress={() => this.props.navigation.push("BookSchedule")}
                >
                    {/* <ActionButton.Item
                    buttonColor="dodgerblue"
                    title="Đặt khám"
                    onPress={() =>
                        Alert.alert(
                            "Thông báo",
                            "Chức năng sẽ được mở trong phiên bản sắp tới",
                            [{ text: "OK" }],
                            { cancelable: false }
                        )
                    }
                > */}
                    <Ionicons
                        name="md-create"
                        style={styles.actionButtonIcon}
                    />
                </ActionButton.Item>
            </ActionButton>

            // </View>
            // <View style={{ flex: 1, backgroundColor: '#f3f3f3', bottom: 2, right: 20 }}>
            //     {/* Rest of the app comes ABOVE the action button component !*/}
            //     <ActionButton buttonColor="rgba(231,76,60,1)">
            //         <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => console.log("notes tapped!")}>
            //             <Ionicons name="md-create" style={styles.actionButtonIcon} />
            //         </ActionButton.Item>
            //         <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => { }}>
            //             <Ionicons name="md-notifications-off" style={styles.actionButtonIcon} />
            //         </ActionButton.Item>
            //         <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => { }}>
            //             <Ionicons name="md-done-all" style={styles.actionButtonIcon} />
            //         </ActionButton.Item>
            //     </ActionButton>
            // </View>
        );
    }
}
const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: "white",
    },
});
