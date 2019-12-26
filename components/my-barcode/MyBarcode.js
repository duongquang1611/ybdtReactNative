import React, { Component } from "react";
import { Text, View, AsyncStorage, StyleSheet, Dimensions } from "react-native";
import Barcode from "react-native-barcode-builder";
export class MyBarcode extends Component {
    static navigationOptions = {
        title: "Mã vạch",
    };
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            isLoading: true,
        };
    }
    async componentDidMount() {
        let token = await AsyncStorage.getItem("token");
        let username = JSON.parse(token).username;
        this.setState({
            username: username,
            isLoading: false,
        });
    }
    render() {
        return this.state.isLoading ? (
            <View />
        ) : (
            <View style={styles.container}>
                <Barcode
                    height={120}
                    value={this.state.username}
                    format="CODE128"
                    width={3}
                />
                <Text style={{ fontStyle: "italic", marginTop: 10 }}>
                    Quét mã để hiển thị mã y tế của bạn
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
});
export default MyBarcode;
