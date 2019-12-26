import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  AsyncStorage,
} from "react-native";
import Barcode from "react-native-barcode-builder";
export default class BookCover extends Component {
  constructor() {
    super();
    this.state = {
      city: "",
    };
  }
  async componentDidMount() {
    this.setState({
      city: JSON.parse(await AsyncStorage.getItem("hospital")).city,
    });
  }
  render() {
    let birthDay = new Date(this.props.profile.NgaySinh);
    let { hospital } = this.props;
    let { profile } = this.props;
    return (
      <ScrollView>
        <View
          style={[
            styles.container,
            {
              height: this.props.screenIos
                ? this.props.height - 100
                : null,
              width: this.props.width - 40,
            },
          ]}
        >
          <View
            style={[
              { borderWidth: 5, padding: 3 },
              styles.borderBook,
            ]}
          >
            <View style={[{ borderWidth: 2 }, styles.borderBook]}>
              <View
                style={{
                  alignItems: "center",
                  flex: 2,
                }}
              >
                <Text
                  style={[
                    styles.inforHospital,
                    { fontSize: 18 },
                  ]}
                >
                  Sở Y Tế {this.state.city}
                </Text>
                <Text
                  style={[
                    styles.inforHospital,
                    { fontSize: 18 },
                  ]}
                >
                  {hospital && hospital.name.toUpperCase()}
                </Text>
                <Text style={[, styles.inforHospital]}>
                  Địa chỉ:{" "}
                  <Text
                    style={{
                      textTransform: "capitalize",
                    }}
                  >
                    {hospital.address}
                  </Text>
                </Text>
                <Text style={styles.inforHospital}>
                  Số điện thoại:{hospital.phoneNumber}
                </Text>
              </View>

              <View
                style={{
                  flex: 2,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 35,
                    fontWeight: "500",
                    color: "#b71c1c",
                  }}
                >
                  SỔ KHÁM BỆNH
                                </Text>
              </View>
              <View style={{ flex: 3, marginLeft: 10 }}>
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 10,
                  }}
                >
                  <Text style={styles.inforPatient}>
                    Họ và tên:{" "}
                  </Text>
                  <Text style={{ fontSize: 16 }}>
                    {this.props.profile.HoTen}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 10,
                  }}
                >
                  <Text style={styles.inforPatient}>
                    Ngày{" "}
                  </Text>
                  <Text style={{ fontSize: 16 }}>
                    {" "}
                    {birthDay.getDate()}{" "}
                  </Text>
                  <Text style={styles.inforPatient}>
                    {" "}
                    tháng{" "}
                  </Text>
                  <Text style={{ fontSize: 16 }}>
                    {" "}
                    {birthDay.getDate()}{" "}
                  </Text>
                  <Text style={styles.inforPatient}>
                    {" "}
                    năm sinh{" "}
                  </Text>
                  <Text style={{ fontSize: 16 }}>
                    {" "}
                    {birthDay.getFullYear()}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 10,
                  }}
                >
                  <Text style={styles.inforPatient}>
                    Địa chỉ:
                                        <Text
                      style={{
                        fontSize: 16,
                        color: "black",
                        fontWeight: "100",
                      }}
                    >
                      {this.props.profile.DiaChi}
                    </Text>
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.inforPatient}>
                    Số điện thoại:{" "}
                  </Text>
                  <Text style={{ fontSize: 16 }}>
                    {this.props.profile.DienThoai}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  alignItems: "center",
                  flex: 2,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "500",
                    color: "#1a237e",
                  }}
                >
                  NĂM 2019
                </Text>
                <Barcode height={30} value={profile.Ma} format="CODE128" />
              </View>

            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
    padding: 10,
    paddingHorizontal: 15,
  },
  inforPatient: {
    fontSize: 15,
    fontWeight: "500",
    color: "#1a237e",
  },
  inforHospital: {
    fontWeight: "500",
    color: "#1a237e",
    textAlign: "center",
  },
  borderBook: {
    alignItems: "stretch",
    borderColor: "#1a237e",
    flex: 1,
  },
});
