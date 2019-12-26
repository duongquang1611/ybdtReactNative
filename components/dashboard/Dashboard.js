import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Platform,
  ImageBackground,
  AsyncStorage,
  BackHandler,
  Alert
} from "react-native";
import { FontAwesome, Ionicons, AntDesign, MaterialCommunityIcons, Entypo, Foundation } from "@expo/vector-icons";
import AwesomeAlert from "react-native-awesome-alerts";

import Profile from "../profile/Profile";
import { createAppContainer, createStackNavigator, HeaderBackButton } from "react-navigation";
import CustomStatusBar from "../../share/customStatusBar/CustomStatusBar";
import BookSchedule from "../book-schedule/BookSchedule";
import Appointment from "../appointment/Appointment";
import ListNotification from "../notification/ListNotification";
import Medicine from "../medicine/Medicine";
import MedicalProcess from "../medical-process/MedicalProcess";
import HospitalScreen from "../hospital/Hospital";
import ListHealthyBooks from "../list-healthy-books/ListHealthyBooks";
import HealthyBooks from "../list-healthy-books/healthy-books/HealthyBooks";
import CLSDetailReport_InHealthyBooks from "../list-healthy-books/healthy-books/ItemHealthyBooks/cls-detail-report/CLSDetailReport";
import CanLamSang from "../can-lam-sang/CanLamSang";
import ClsSnapCarousel from "../can-lam-sang/list-item-cls/cls-snap-carousel/ClsSnapCarousel";
import Guide from "../../share/guide/Guide";
import ModalHealthyBook from "../../share/modal-healthy-book/ModalHealthyBook";
import PushNotification from '../notification/push-notification/PushNotification';
import ChangePassword from '../profile/change-password/ChangePassword'
import MyBarcode from '../my-barcode/MyBarcode'
import { TouchableOpacity } from "react-native-gesture-handler";

function Dashboard(props) {
        const [width, setWidth] = useState(Dimensions.get("window").width);
  const [height, setHeight] = useState(Dimensions.get("window").height);
  const [guide, setGuide] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [name, setName] = useState("");
  const [showModalBook, setShowModalBook] = useState(false);

  handleCompleteGuide = () => {
    setShowAlert(true);
    setGuide(false);
  };

  useEffect(() => {
      
    // this.backhandler = BackHandler.addEventListener("hardwareBackPress", () => {
    //       props.navigation.navigate("Dashboard");
    //       return true;
    // });

    async function getData() {
      try {
          let user = await AsyncStorage.getItem("token");
        const times = await AsyncStorage.getItem("times");
        if (times == 1) {
               setGuide(true);
        }
           setName(JSON.parse(user).HoTen);
      } catch (errors) {
        console.log(errors);
      }
    }
    getData();

  }, []);

 

  logout = async () => {
    await AsyncStorage.multiRemove(["token"]);
    props.navigation.navigate("Login");
  };

  openModalBook = () => {
    setShowModalBook(true);
  };

  closeModalBook = () => {
    setShowModalBook(false);
  };

  return (
    <View style={styles.container}>
      <ModalHealthyBook showModal={showModalBook} closeModalBook={closeModalBook} />
      <CustomStatusBar backgroundColor={Platform.OS === "ios" ? "#082D0F" : "#17B890"} barStyle="light-content" />

      {guide ? (
        <Guide completeGuide={handleCompleteGuide} name={name} guide={guide} />
      ) : (
          <>
            <ScrollView style={{ marginBottom: 50 }}>
              <View style={{ backgroundColor: "#47B7BA", overflow: "hidden" }}>
                <View style={{ padding: 5, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                  <Text style={{ color: "white", fontWeight: "bold" }}>{name}</Text>
                  <TouchableWithoutFeedback onPress={logout}>
                    <FontAwesome name="sign-out" size={28} color="white" />
                  </TouchableWithoutFeedback>
                </View>

                <ImageBackground
                  style={{ flex: 1, height: 250 }}
                  source={require("../../assets/doctor-explaining-explanation-2182972.jpg")}
                >
                  <View
                    style={{
                      position: "absolute",
                      right: 0,
                      left: 0,
                      top: 0,
                      bottom: 0,
                      backgroundColor: "rgba(148, 184, 184, 0.6)",
                      zIndex: 2,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  />
                  <View
                    style={{
                      position: "absolute",
                      right: 0,
                      left: 0,
                      top: 40,
                      zIndex: 3,
                      alignItems: "center"
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 20,
                        width: width,
                        fontWeight: "bold",
                        textAlign: "center",
                        letterSpacing: 1,
                        textTransform: "uppercase",
                        textShadowColor: "#000"
                      }}
                    >
                        sức khỏe, thông minh
                  </Text>
                    </View>
                  <View
                    style={{
                      position: "absolute",
                      zIndex: 4,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: width,
                      bottom: 50
                    }}
                  >
                    
                    <TouchableWithoutFeedback onPress={() => props.navigation.navigate("BookSchedule")}>
                      <View style={{ flexDirection: "column", alignItems: "center", width: width / 3 }}>
                        <Text>
                          <Ionicons name="ios-clock" size={50} color="white" />
                        </Text>
                        <Text style={{ color: "white" }}>Đặt lịch khám</Text>
                      </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => props.navigation.navigate({ routeName: "MedicalProcess" })}>
                      <View style={{ flexDirection: "column", alignItems: "center", width: width / 3 }}>
                        <Text>
                          <MaterialCommunityIcons name="arrow-decision-outline" size={50} color="white" />
                        </Text>
                        <Text style={{ color: "white" }}>Quy trình khám</Text>
                      </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={openModalBook}>
                      <View style={{ flexDirection: "column", alignItems: "center", width: width / 3 }}>
                        <Text>
                          <FontAwesome name="address-book-o" size={50} color="white" />
                        </Text>
                        <Text style={{ color: "white" }}>Sổ y tế</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </ImageBackground>
              </View>
              <View style={{ flex: 1 }}>
                <View>
                  <View
                    style={{
                      backgroundColor: "#2193b0",
                      padding: 5,
                      justifyContent: "center",
                      paddingLeft: 15
                    }}
                  >
                    <Text style={{ marginLeft: 5, marginRight: 5, color: "white" }}>
                      <FontAwesome name="stethoscope" size={16} />
                      <Text style={{ fontSize: 14, fontWeight: "bold" }}> Khám bệnh</Text>
                    </Text>
                  </View>
                  <View
                    style={{
                      paddingTop: 10,
                      paddingLeft: 20,
                      paddingRight: 20,
                      paddingBottom: 5,
                      flexDirection: "row",
                      justifyContent: "space-around",
                      alignItems: "center"
                    }}
                  >
                    <TouchableWithoutFeedback onPress={() => props.navigation.navigate({ routeName: "ListHealthyBooks" })}>
                      <View
                        style={{
                          justifyContent: "flex-start",
                          alignItems: "center",
                          width: width / 3,
                          marginVertical: 5
                        }}
                      >
                        <FontAwesome name="heartbeat" size={30} color="red" />
                        <Text style={{ marginTop: 5, textAlign: "center", color: "rgba(0, 0, 0, 0.6)" }}>Lần khám</Text>
                      </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => props.navigation.navigate({ routeName: "CanLamSang" })}>
                      <View
                        style={{
                          justifyContent: "flex-start",
                          alignItems: "center",
                          width: width / 3
                        }}
                      >
                        <Ionicons name="md-paper" size={30} color="#68C9D6" />
                        <Text style={{ marginTop: 5, textAlign: "center", color: "rgba(0, 0, 0, 0.6)" }}>Kết quả CLS</Text>
                      </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={() => props.navigation.navigate({ routeName: "Medicine" })}>
                      <View
                        style={{
                          justifyContent: "flex-start",
                          alignItems: "center",
                          width: width / 3,
                          marginVertical: 5
                        }}
                      >
                        <MaterialCommunityIcons name="medical-bag" size={30} color="#ED195E" />
                        <Text style={{ marginTop: 5, textAlign: "center", color: "rgba(0, 0, 0, 0.6)" }}>Đơn thuốc</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </View>
                <View>
                  <Text
                    style={{
                      backgroundColor: "#2193b0",
                      color: "white",
                      padding: 5,
                      alignItems: "center",
                      paddingLeft: 15
                    }}
                  >
                    <Text style={{ marginLeft: 10, marginRight: 5 }}>
                      <MaterialCommunityIcons name="calendar-clock" size={16} />
                      <Text style={{ fontSize: 14, fontWeight: "bold" }}> Lịch hẹn</Text>
                    </Text>
                  </Text>
                  <View
                    style={{
                      paddingTop: 5,
                      paddingLeft: 20,
                      paddingRight: 20,
                      paddingBottom: 10,
                      flexDirection: "row",
                      justifyContent: "space-around",
                      alignItems: "center"
                    }}
                  >
                    <TouchableWithoutFeedback onPress={() => props.navigation.navigate("BookSchedule")}>
                      <View
                        style={{
                          justifyContent: "flex-start",
                          alignItems: "center",
                          width: width / 3,
                          marginVertical: 5
                        }}
                      >
                        <MaterialCommunityIcons name="av-timer" size={30} color="#7055A3" />
                        <Text style={{ marginTop: 5, textAlign: "center", color: "rgba(0, 0, 0, 0.6)" }}>Đặt lịch</Text>
                      </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => props.navigation.navigate({ routeName: "Appointment" })}>
                      <View
                        style={{
                          justifyContent: "flex-start",
                          alignItems: "center",
                          width: width / 3,
                          marginVertical: 5
                        }}
                      >
                        <MaterialCommunityIcons name="newspaper" size={30} color="#FDBD12" />
                        <Text style={{ marginTop: 5, textAlign: "center", color: "rgba(0, 0, 0, 0.6)" }}>Lịch hẹn</Text>
                      </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={() => props.navigation.navigate({ routeName: "Notification" })}>
                      <View
                        style={{
                          justifyContent: "flex-start",
                          alignItems: "center",
                          width: width / 3,
                          marginVertical: 5
                        }}
                      >
                        <FontAwesome name="bell-o" size={30} color="#7EBDC2" />
                        <Text style={{ marginTop: 5, textAlign: "center", color: "rgba(0, 0, 0, 0.6)" }}>Thông báo</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </View>
                <View>
                  <Text
                    style={{
                      backgroundColor: "#2193b0",
                      color: "white",
                      padding: 5,
                      alignItems: "center",
                      paddingLeft: 15
                    }}
                  >
                    <Text style={{ marginLeft: 10, marginRight: 5 }}>
                      <Foundation name="page-search" size={16} />
                      <Text style={{ fontSize: 14, fontWeight: "bold" }}> Thông tin</Text>
                    </Text>
                  </Text>
                  <View
                    style={{
                      paddingTop: 5,
                      paddingLeft: 20,
                      paddingRight: 20,
                      paddingBottom: 5,
                      flexDirection: "row",
                      justifyContent: "space-around",
                      alignItems: "center"
                    }}
                  >
                    <TouchableWithoutFeedback onPress={() => props.navigation.navigate( "Profile" , {mynavigation: props.navigation})}>
                    <View
                      style={{
                        justifyContent: "flex-start",
                        alignItems: "center",
                        width: width / 3,
                        marginVertical: 5
                      }}
                    >
                      <AntDesign name="user" size={30} color="#EB9486" />
                      <Text style={{ marginTop: 5, textAlign: "center", color: "rgba(0, 0, 0, 0.6)" }}>Cá nhân</Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={() => props.navigation.navigate({ routeName: "Hospital" })}>
                    <View
                      style={{
                        justifyContent: "flex-start",
                        alignItems: "center",
                        width: width / 3,
                        marginVertical: 5
                      }}
                    >
                      <FontAwesome name="hospital-o" size={30} color="#247BA0" />
                      <Text style={{ marginTop: 5, textAlign: "center", color: "rgba(0, 0, 0, 0.6)" }}>Bệnh viện</Text>
                    </View>
                  </TouchableWithoutFeedback>

                  <View
                    style={{
                      justifyContent: "flex-start",
                      alignItems: "center",
                      width: width / 3,
                      marginVertical: 5
                    }}
                  >
                    <Entypo name="map" size={30} color="#FF6B35" />
                    <Text style={{ marginTop: 5, textAlign: "center", color: "rgba(0, 0, 0, 0.6)" }}>Bản đồ</Text>
                  </View>
                  </View>
                </View>
              </View>
            </ScrollView>
            <View
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "#F4F4F4",
                flexDirection: "row",
                height: 50,
                width: width
              }}
            >
              <TouchableWithoutFeedback onPress={() => setGuide(true)}>
                <View
                  style={{
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: width / 3
                  }}
                >
                  <Entypo name="open-book" size={20} color="gray" />
                  <Text style={{ color: "gray", fontSize: 10 }}>Hướng dẫn</Text>
                </View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback onPress={() => props.navigation.navigate({ routeName: "PushNotification" })}>

                <View
                  style={{
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: width / 3
                  }}
                >
                  <Ionicons name="ios-apps" size={20} color="gray" />
                  <Text style={{ color: "gray", fontSize: 10 }}> Noti</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={()=> props.navigation.navigate({routeName: "MyBarcode"})}>
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: width / 3
                }}
              >
                <MaterialCommunityIcons name="barcode-scan" size={20} color="gray" />
                <Text style={{ color: "gray", fontSize: 10 }}> Mã của tôi</Text>
              </View>
              </TouchableWithoutFeedback>
            </View>
            <AwesomeAlert
              show={showAlert}
              title="Đã hoàn thành hướng dẫn"
              message="Hãy bắt đầu trải nghiệm dịch vụ khám chữa bệnh điện tử"
              closeOnTouchOutside={true}
              closeOnHardwareBackPress={true}
              showConfirmButton={true}
              confirmText="Bắt đầu !"
              confirmButtonColor="#50BF52"
              onConfirmPressed={() => {
                setShowAlert(false);
              }}
            />
          </>
        )}
    </View>
  );
}

const AppNavigator = createStackNavigator(
  {
    Dashboard: {
      screen: Dashboard,
      navigationOptions: {
        header: null
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: ({ navigation }) => ({
        title: 'Thông tin cá nhân',
        headerRight: (
          <TouchableOpacity onPress={() => navigation.navigate("ChangePassword",{navigation: navigation})}>
            <Text style={{marginRight: 10, color: '#fff'}}>Đổi mật khẩu</Text>
          </TouchableOpacity>
        )
      }),
    },
    ChangePassword: {
      screen: ChangePassword
    },
    BookSchedule: {
      screen: BookSchedule
    },
    Medicine: {
      screen: Medicine
    },
    Notification: {
      screen: ListNotification
    },
    Appointment: {
      screen: Appointment
    },
    MedicalProcess: {
      screen: MedicalProcess,
      navigationOptions: {
        title: "Quy trình khám"
      }
    },

    Hospital: {
      screen: HospitalScreen
    },

    ListHealthyBooks: {
      screen: ListHealthyBooks
    },
    HealthyBooks: {
      screen: HealthyBooks
    },
    CLSDetailReport_InHealthyBooks: {
      screen: CLSDetailReport_InHealthyBooks
    },
    CanLamSang: {
      screen: CanLamSang
    },

    ClsSnapCarousel: {
      screen: ClsSnapCarousel
    },
    PushNotification: {
      screen: PushNotification
    },
    MyBarcode:{
      screen: MyBarcode
    }
  },
  {
    initialRouteName: "Dashboard",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#17B890",
        height: 45,
        ...Platform.select({
          android: {
            shadowColor: "transparent",
            shadowOpacity: 0,
            shadowRadius: 0,
            shadowOffset: {
              height: 0,
              width: 0
            },
            elevation: 0
          }
        })
      },
      headerTintColor: "white"
    }
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default createAppContainer(AppNavigator);
