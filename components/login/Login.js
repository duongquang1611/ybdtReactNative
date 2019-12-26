import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  BackHandler,
  KeyboardAvoidingView,
  AsyncStorage,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  TouchableWithoutFeedback
} from "react-native";
import { PropTypes } from "prop-types";
import { FontAwesome } from "@expo/vector-icons";
import InputField from "./InputField/InputField";
import { w, h, totalSize } from "./Dimensions";
import { LoginAPI } from "../../api/login-api/LoginApi";
import { NavigationEvents } from "react-navigation";

const companyLogo = require("../../assets/wc.png");
const blurbgLogin = require("../../assets/blurbglogin.jpg");

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEmailCorrect: false,
      isPasswordCorrect: false,
      isLogin: false,
      isDisplayError: false,
      hospital: {}
    };
  }

  //

  async componentDidMount() {
    this.backhandler = BackHandler.addEventListener("hardwareBackPress", () => {
      BackHandler.exitApp();
      return true;
    });
  }

  componentWillUnmount() {
    this.backhandler.remove();
  }

  reloadFromSelect = async () => {
    let hospital = await AsyncStorage.getItem("hospital");
    this.setState({ hospital: JSON.parse(hospital) });
  };

  getStarted = async () => {
    const email = this.email.getInputValue();
    const password = this.password.getInputValue();

    this.setState(
      {
        // check if whether email, password is true or not
        isEmailCorrect: email === "",
        isPasswordCorrect: password === "",
        isDisplayError: false
      },
      () => {
        if (email !== "" && password !== "") {
          this.loginTo(email, password);
        }
      }
    );
  };

  changeInputFocus = name => () => {
    if (name === "Email") {
      this.setState({ isEmailCorrect: this.email.getInputValue() === "" });
      this.password.input.focus();
    } else {
      this.setState({ isPasswordCorrect: this.password.getInputValue() === "" });
    }
  };

  loginTo = async (email, password) => {
    this.setState({ isLogin: true });
    try {
      let response = await LoginAPI.LoginTo(email, password);

      if (response.status >= 200 && response.status < 300) {
        const json = await response.json();
        // save necessary token'info
        await AsyncStorage.setItem("token", JSON.stringify(json));
        let times = await AsyncStorage.getItem("times");
        if (times) {
          await AsyncStorage.setItem("times", `${parseInt(times) + 1}`);
        } else {
          await AsyncStorage.setItem("times", "1");
        }

        this.setState({
          isLogin: false,
          isDisplayError: true
        });
        this.props.navigation.navigate({ routeName: "Dashboard" });
      } else {
        this.setState({
          isLogin: false,
          isDisplayError: true
        });
      }
    } catch (errors) {
      this.setState({
        isLogin: false,
        isDisplayError: true
      });
      console.log(errors);
    }
  };

  render() {
    // let fromDashboard = this.props.navigation.getParam('fromDashboard', false);
    
    return (
      <KeyboardAvoidingView behavior="position" KeyboardVerticalOffset={-w(30)} style={styles.container} enabled>
        <NavigationEvents onWillFocus={this.reloadFromSelect} />
        <ImageBackground source={blurbgLogin} style={styles.background} resizeMode="stretch" blurRadius={30}>
          <View style={styles.contentContainer}>
            <View
              style={{
                width: w(100),
                height: h(30),
                marginTop: h(10),
                marginBottom: h(7),
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text style={{ color: "white", fontSize: 24, fontWeight: "500" }}>SỔ Y BẠ ĐIỆN TỬ</Text>
              <Text style={{ color: "white", fontSize: 18 }}>
                {this.state.hospital.name ? this.state.hospital.name.toUpperCase() : ""}
              </Text>
              <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("SelectHospital")}>
                <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                  <Text style={{ fontSize: 13, marginTop: 5, color: "white", marginRight: 5 }}>Chọn bệnh viện</Text>
                  <View style={{ transform: [{ translateY: -3 }] }}>
                    <FontAwesome name="exchange" size={13} color="white" />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>

            <InputField
              iconName="user"
              placeholder="Email"
              keyboardType="numeric"
              style={styles.email}
              error={this.state.isEmailCorrect}
              focus={this.changeInputFocus}
              ref={ref => (this.email = ref)}
            />
            <InputField
              iconName="lock"
              placeholder="Password"
              returnKeyType="done"
              secureTextEntry={true}
              blurOnSubmit={true}
              error={this.state.isPasswordCorrect}
              ref={ref => (this.password = ref)}
              focus={this.changeInputFocus}
            />
            <GetStarted click={this.getStarted} isLogin={this.state.isLogin} />
            <View style={styles.textContainer}>
              <Text style={{ color: this.state.isDisplayError ? "yellow" : "transparent", fontSize: 16, fontWeight: "500" }}>
                Sai tên tài khoản hoặc mật khẩu
              </Text>
            </View>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

Login.defaultProps = {
  background: null
};

class GetStarted extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.click} style={styles.button} activeOpacity={0.6}>
        {this.props.isLogin ? (
          <ActivityIndicator size="large" style={styles.spinner} color="white" />
        ) : (
          <Text style={styles.text}>đăng nhập</Text>
        )}
      </TouchableOpacity>
    );
  }
}

GetStarted.propTypes = {
  click: PropTypes.func.isRequired,
  isLogin: PropTypes.bool.isRequired
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white"
  },

  background: {
    width: "100%",
    height: "100%"
  },

  contentContainer: {
    flex: 1,
    alignItems: "center"
  },

  textContainer: {
    width: w(100),
    flexDirection: "row",
    marginTop: h(5)
  },
  email: {
    marginBottom: h(4.5)
  },
  touchable: {
    flex: 1
  },
  createAccount: {
    color: "#ffffffEE",
    textAlign: "center",
    fontSize: totalSize(2),
    fontWeight: "600"
  },
  forgotPassword: {
    color: "#ffffffEE",
    textAlign: "center",
    fontSize: totalSize(2),
    fontWeight: "600"
  },
  button: {
    width: "85%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: w(2),
    backgroundColor: "transparent",
    borderRadius: w(10),
    marginTop: h(8)
  },
  text: {
    color: "white",
    fontWeight: "bold",
    paddingVertical: h(1),
    fontSize: totalSize(3.0),
    textTransform: "uppercase"
    // textShadowColor: "#000",
    // textShadowOffset: { width: 0, height: 0 },
    // textShadowRadius: totalSize(3.0),
    // shadowOpacity: 0.2
  },
  spinner: {
    height: h(5)
  },
  textContainer: {
    marginTop: 10,
    height: 50,
    width: "85%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Login;
