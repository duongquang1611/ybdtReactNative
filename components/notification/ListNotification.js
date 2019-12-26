import React, { Component } from "react";
import {
    ActivityIndicator,
    RefreshControl,
    View,
    Text,
    FlatList,
    StyleSheet,
    AsyncStorage,
} from "react-native";
import ItemNotification from "./item-notification/ItemNotification";
// import dataNotification from "./data-notification";
import firebaseConfig from "../../share/firebase/firebaseConfig";
import * as firebase from "firebase";

export default class ListNotification extends Component {
    static navigationOptions = {
        title: "Danh sách thông báo",
    };
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            refreshing: false,
            dataList: [],
        };
    }

    async componentDidMount() {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        let token = await AsyncStorage.getItem("token");
        let username = JSON.parse(token).username;
        this.setState({
            username: username,
        });

        // load data from firebase
        this.loadData();
    }
    loadData = async () => {
        let data = [];
        let hospital = await AsyncStorage.getItem("hospital");
        let hospitalName = JSON.parse(hospital).domain;
        this._isMounted = true;
        firebase
            .database()
            .ref("notifications")
            .child(hospitalName)
            .child(this.state.username)
            .on("child_added", snapshot => {
                if (snapshot.val() != null) data.push(snapshot.val());
                if (this._isMounted)
                    this.setState({
                        dataList: data,
                        isLoading: false,
                        refreshing: false,
                    });
            });
    };

    componentWillUnmount() {
        this._isMounted = false;
    }
    onRefresh() {
        this.setState({ refreshing: true }, () => {
            this.loadData();
        });
    }

    render() {
        console.log(this.state.dataList);

        if (this.state.isLoading) {
            return (
                <View style={styles.containerLoading}>
                    <ActivityIndicator
                        style={{ color: "red", size: "large" }}
                    />
                </View>
            );
        } else {
            return this.state.dataList.length == 0 ? (
                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Text
                        style={{
                            color: "gray",
                            fontSize: 15,
                            fontWeight: "bold",
                        }}
                    >
                        Bạn chưa có thông báo
                    </Text>
                </View>
            ) : (
                <View style={{ backgroundColor: "#EAEAEA", flex: 1 }}>
                    {/* <StatusBar backgroundColor="#BCF6DA" barStyle="light-content" /> */}
                    <FlatList
                        data={this.state.dataList}
                        renderItem={({ item }) => {
                            return <ItemNotification item={item} />;
                        }}
                        keyExtractor={(item, index) => index.toString()}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this.onRefresh.bind(this)}
                            />
                        }
                    />
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    containerLoading: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
});
