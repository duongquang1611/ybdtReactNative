import React, { Component } from "react";
import { StyleSheet, View, AsyncStorage, Text } from "react-native";
import {
    createAppContainer,
    createStackNavigator,
    createSwitchNavigator,
} from "react-navigation";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import SelectHospital from "./components/select-hospital/SelectHospital";
import { Env } from "./environment";
import axios from "axios";

// import Medicine from './share/modal-healthy-book/medicine/Medicine'
import ChangePassword from "./components/profile/change-password/ChangePassword";
class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.loadInitialData();
    }

    render() {
        return (
            <View style={styles.container} />
            // <Medicine />
            // <ChangePassword></ChangePassword>
        );
    }

    loadInitialData = async () => {
        let hospital = JSON.parse(await AsyncStorage.getItem("hospital"));
        if (!hospital) {
            this.props.navigation.navigate("SelectHospital");
        } else {
            Env.setAppUrl(hospital.appUrl);
            Env.setAuth(hospital.oAuthUrl);
            Env.setDomain(hospital.domain);
            axios.defaults.headers.common["domain"] = hospital.domain;
            let tokenS = await AsyncStorage.getItem("token");
            const tokenO = await JSON.parse(tokenS);
            // console.log(new Date(tokenO[".expires"]))
            var tomorow = new Date();
            tomorow.setDate(tomorow.getDate() + 1);
            if (tokenO != null && tomorow < new Date(tokenO[".expires"])) {
                let times = await AsyncStorage.getItem("times");
                await AsyncStorage.setItem("times", `${parseInt(times) + 1}`);
                this.props.navigation.navigate("Dashboard");
            } else {
                this.props.navigation.navigate("Login");
            }
            this.props.navigation.navigate(
                tokenO !== null && tomorow < new Date(tokenO[".expires"])
                    ? "Dashboard"
                    : "Login"
            );
        }
    };
}

// const LoginStack = createStackNavigator(
//   {
//     Login: {
//       screen: Login,
//       navigationOptions: {
//         header: null
//       }
//     }
//   }
// )

// const DashboardStack = createStackNavigator(
//   {
//     Dashboard: {
//       screen: Dashboard,
//       navigationOptions: {
//         header: null
//       }
//     }
//   }
// )

export default createAppContainer(
    createSwitchNavigator(
        {
            AuthLoading: { screen: App },
            Dashboard: { screen: Dashboard },
            Login: { screen: Login },
            SelectHospital: { screen: SelectHospital },
        },
        {
            initialRouteName: "AuthLoading",
            headerMode: "none",
        }
    )
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
