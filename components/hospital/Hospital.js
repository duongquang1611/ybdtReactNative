import React, { Component } from "react";
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions, 
  AsyncStorage
} from "react-native";

import mainColor from "./constants";

import Email from "./customCell/email/Email";
import Separator from "./customCell/separator/Separator";
import Tel from "./customCell/tel/Tel";
import GGmap from "./customCell/ggmap/GGmap";
import sodobv from "../../assets/Sodobv.png";
import Header from "./header/Header"

class HospitalScreen extends Component {
  static navigationOptions = {
    title: "Bệnh viện"
  };
  constructor(props) {
    super(props);
    this.state = {
      hospital: null
    };
  }
  render() {
    return <Profile {...this.state.hospital} />;
  }
  componentDidMount() {
    this.loadData();
  }

  loadData = async() => {
    const info = await AsyncStorage.getItem("hospital");
    this.setState({
      hospital: JSON.parse(info)
    });
  }

}

class Profile extends Component {
  
   onPressTel = number => {
    Linking.openURL(`tel://${number}`).catch(err => console.log("Error:", err));
  };

  onPressSms = () => {
    console.log("sms");
  };

  onPressEmail = email => {
    Linking.openURL(`mailto://${email}?subject=subject&body=body`).catch(err => console.log("Error:", err));
  };

  onPressGG = () => {
    const lat = this.props.lat;
    const lng = this.props.lng;
    const scheme = Platform.select({ ios: "maps:0,0?q=", android: "geo:0,0?q=" });
    const latLng = `${lat},${lng}`;
    const label = "Custom Label";
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });

    Linking.openURL(url);
  };

  render() {
    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <View containerStyle={styles.cardContainer}>
            <Header
              name={this.props.name}
              address={this.props.address}
            />
            <Tel
              name="Hotline"
              phoneNumber={this.props.phoneNumber}
              onPressSms={this.onPressSms}
              onPressTel={this.onPressTel}
            />
            <Separator />
            <Email
              name="Email"
              email={this.props.email ? this.props.email : "Chưa cập nhật email"}
              onPressEmail={this.onPressEmail}
            />
            <Separator />
            <GGmap
              name="Map"
              location="Bản đồ trực tuyến"
              onPressGG={this.onPressGG}
            />
            <Separator />
            {/* <View style={{ flex: 1, height: 300, width: Dimensions.get("window").width - 40 }} margin={20}>
              <Image style={{ flex: 1, width: undefined, height: undefined }} source={sodobv} />
            </View>
            <View style={{ flex: 1, height: 50, width: "100%" }}>
              <Text style={{ flex: 1, textAlign: "center", fontSize: 16, fontWeight: "bold", color: mainColor }}>
                SƠ ĐỒ BỆNH VIỆN
              </Text>
            </View> */}
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#FFF",
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0
  },
  container: {
    flex: 1
  },
  emailContainer: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingTop: 30
  },
 
  scroll: {
    backgroundColor: "#FFF"
  },
  telContainer: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingTop: 30
  },

  ggContainer: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingTop: 30
  },

  mapContainer: {
    backgroundColor: "#FFF",
    flex: 2,
    paddingTop: 30
  }
});

export default HospitalScreen;
