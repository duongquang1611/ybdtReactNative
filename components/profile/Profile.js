import React from "react";
import { View, Text, Dimensions, Image, TouchableWithoutFeedback, ActivityIndicator, AsyncStorage, Platform } from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import InfoProfile from "./info-profile/InfoProfile";
import { profileApi } from "../../api/profile-api/profileApi";
export default class Profile extends React.Component {
  static navigationOptions = {
    title: "Thông tin cá nhân"
  };
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      profile: {},
      isLoading: true
    };
  }
  async componentDidMount() {
    let user = await AsyncStorage.getItem("token");
    this.setState({ isLoading: true });
    let profile = await profileApi.getProfile(JSON.parse(user).username);
    this.setState({ profile: profile.data, isLoading: false });
  }
  render() {
    const { width, height } = Dimensions.get("window");
    const { profile } = this.state;
    return (
      <>
        {this.state.isLoading ? (
          <View style={{ flex: 1, alignItems: "center", marginTop: 50 }}>
            <ActivityIndicator size="small" />
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <View style={{ height: 200, flexDirection: "row" }}>
              <Image
                source={require("../../assets/doctor-explaining-explanation-2182972.jpg")}
                style={{ width: width, height: 200 }}
              />
              <View
                style={{
                  backgroundColor: "rgba(144, 147, 153,0.8)",
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  zIndex: 1
                }}
              />
              <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 2 }}>
                <View style={{ flexDirection: "row", marginTop: 30, marginLeft: 30 }}>
                  <Image
                    source={require("../../assets/avatar-profile.jpg")}
                    style={{ width: 70, height: 70, borderRadius: 70 }}
                  />

                  <View style={{ justifyContent: "space-around", marginLeft: 20 }}>
                    <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>{profile.HoTen}</Text>
                    <View style={{ flexDirection: "row", color: "white", justifyContent: "space-between" }}>
                      <Text style={{ color: "white", fontSize: 16 }}>
                        Giới tính:
                        {profile.GioiTinh ? (
                          <FontAwesome name="male" color="white" size={20} />
                        ) : (
                          <FontAwesome name="female" color="white" size={20} />
                        )}
                      </Text>
                      <TouchableWithoutFeedback onPress={() => this.setState({ edit: true })}>
                        <View
                          style={{
                            alignItems: "center",
                            paddingLeft: 10,
                            paddingRight: 10,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: "white",
                            flexDirection: "row"
                          }}
                        >
                          <Text>
                            <AntDesign name="edit" color="white" size={20} />
                          </Text>
                          <Text
                            style={{
                              color: "white",
                              marginLeft: 3
                            }}
                          >
                            Sửa
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <InfoProfile
              edit={this.state.edit}
              stopEdit={() => this.setState({ edit: false })}
              openEditOpenPress={() => this.setState({ edit: true })}
              profile={profile}
            />
          </View>
        )}
      </>
    );
  }
}