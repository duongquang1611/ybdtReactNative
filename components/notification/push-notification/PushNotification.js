import React from "react";
import {
    Text,
    View,
    Button,
    Platform,
    Alert,
    TextInput,
    AsyncStorage,
    KeyboardAvoidingView,
} from "react-native";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import firebaseConfig from "../../../share/firebase/firebaseConfig";
import * as firebase from "firebase";
import moment from "moment";
import axios from "axios";
// import * as SMS from "expo-sms";

let YOUR_PUSH_TOKEN = "";

export default class PushNotification extends React.Component {
    static navigationOptions = {
        title: "Push Notification",
    };
    constructor(props) {
        super(props);
        this.state = {
            notification: {},
            message: "",
            title: "",
            username: "",
            hospitalName: "",
            phoneMessage: "",
            phone: "",
        };
    }

    registerForPushNotificationsAsync = async () => {
        if (Constants.isDevice) {
            const { status: existingStatus } = await Permissions.getAsync(
                Permissions.NOTIFICATIONS
            );
            let finalStatus = existingStatus;
            if (existingStatus !== "granted") {
                const { status } = await Permissions.askAsync(
                    Permissions.NOTIFICATIONS
                );
                finalStatus = status;
            }
            if (finalStatus !== "granted") {
                alert("Không được cấp quyền thông báo!");
                return;
            }
            let token = await Notifications.getExpoPushTokenAsync();
            YOUR_PUSH_TOKEN = token;
            console.log(token);
        } else {
            alert("Bạn cần sử dụng thiết bị thật để test thông báo");
        }
    };

    async componentDidMount() {
        if (Platform.OS === "android") {
            Notifications.createChannelAndroidAsync("appointment", {
                name: "appointment",
                sound: true,
                vibrate: [0, 250, 250, 250],
                priority: "max",
            });
        }

        // firebase
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        let token = await AsyncStorage.getItem("token");
        let hospital = await AsyncStorage.getItem("hospital");
        let hospitalName = JSON.parse(hospital).domain;
        let username = JSON.parse(token).username;
        this.setState({
            username: username,
            hospitalName: hospitalName,
        });

        await this.registerForPushNotificationsAsync();

        // Handle notifications that are received or selected while the app
        // is open. If the app was closed and then opened by tapping the
        // notification (rather than just tapping the app icon to open it),
        // this function will fire on the next tick after the app starts
        // with the notification data.
        this._notificationSubscription = Notifications.addListener(
            this._handleNotification
        );
    }

    _handleNotification = notification => {
        // console.log(notifications);
        if (Platform.Version <= 25) {
            alert(
                "Platform Version: " +
                    Platform.Version +
                    " < Android Oreo, API 25"
            );
        }
        this.setState({ notification: notification });
    };
    _handleMessage = text => {
        this.setState({ message: text });
    };
    _handleTitle = text => {
        this.setState({ title: text });
    };
    _handlePhoneMessage = text => {
        this.setState({ phoneMessage: text });
    };
    _handlePhoneInput = text => {
        this.setState({ phone: text });
    };
    sendToPhone = async () => {
        // const { result } = await SMS.sendSMSAsync(
        //     [this.state.phone || "0977399492"],
        //     this.state.phoneMessage
        // );

        // if (result == "sent") Alert.alert("gui thanh cong");
        // else if (result == "cancelled") Alert.alert("k gui");

        let result = axios.post();
    };
    // Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/dashboard/notifications
    sendPushNotification = async () => {
        let message = {
            to: YOUR_PUSH_TOKEN,
            title: "Thông báo quang",
            body: "Em yêu anh",
            sound: "default",
            subtitle: "kpop",
            _displayInForeground: true,
            android: {
                channelId: "appointment",
                priority: "high",
            },
            data: { data: "Đã nhận thông báo" },
        };
        const response = await fetch("https://exp.host/--/api/v2/push/send", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Accept-encoding": "gzip, deflate",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(message),
        });
        const data = response._bodyInit;
        // console.log(`Status & Response ID-> ${JSON.stringify(data)}`);
    };
    sendLocalNotification = async () => {
        let localNotification = {
            title: this.state.title,
            body: this.state.message,
            android: {
                channelId: "appointment",
            },
            _displayInForeground: true,
            subtitle: "kpop",
            sound: "default",
            ttl: 10,
            data: { pornhub: "data local" },
        };
        Notifications.presentLocalNotificationAsync(localNotification);

        this.sendNotiToFirebase(
            localNotification.title,
            localNotification.body,
            new Date().toISOString()
        );
    };

    sendNotiToFirebase = (title, body, time) => {
        firebase
            .database()
            .ref("notifications")
            .child(this.state.hospitalName)
            .child(this.state.username)
            .push({
                title: title,
                body: body,
                time: time,
            });
    };

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "space-around",
                }}
            >
                <View
                    style={{ alignItems: "center", justifyContent: "center" }}
                >
                    <Text>Origin: {this.state.notification.origin}</Text>
                    <Text>
                        Data: {JSON.stringify(this.state.notification.data)}
                    </Text>
                    <Text>
                        Remote (false la local):{" "}
                        {JSON.stringify(this.state.notification.remote)}
                    </Text>
                </View>
                <Button
                    title={"Send noti to server expo"}
                    onPress={() => this.sendPushNotification()}
                />
                <KeyboardAvoidingView
                    behavior="padding"
                    enabled={true}
                    keyboardVerticalOffset={150}
                >
                    <TextInput
                        value={this.state.title}
                        onChangeText={this._handleTitle}
                        placeholder="Nhập tiêu đề"
                        style={{
                            height: 50,
                            width: 300,
                            borderWidth: 1,
                            borderColor: "gray",
                            padding: 10,
                            marginBottom: 10,
                        }}
                    />
                    <TextInput
                        value={this.state.message}
                        onChangeText={this._handleMessage}
                        placeholder="Nhập nội dung thông báo"
                        style={{
                            height: 50,
                            width: 300,
                            borderWidth: 1,
                            borderColor: "gray",
                            padding: 10,
                            marginBottom: 10,
                        }}
                    />
                    <Button
                        title={"Send noti to local"}
                        onPress={() => this.sendLocalNotification()}
                    />
                    <TextInput
                        value={this.state.phoneMessage}
                        onChangeText={this._handlePhoneMessage}
                        placeholder="Nhập nội dung tin nhan"
                        style={{
                            height: 50,
                            width: 300,
                            marginTop: 10,
                            borderWidth: 1,
                            borderColor: "gray",
                            padding: 10,
                            marginBottom: 10,
                        }}
                    />
                    <TextInput
                        value={this.state.phone}
                        onChangeText={this._handlePhoneInput}
                        placeholder="Nhập sdt"
                        style={{
                            height: 50,
                            width: 300,
                            borderWidth: 1,
                            borderColor: "gray",
                            padding: 10,
                            marginBottom: 10,
                        }}
                    />
                    <Button
                        title={"Send noti to local"}
                        onPress={() => this.sendToPhone()}
                    />
                </KeyboardAvoidingView>
            </View>
        );
    }
}
