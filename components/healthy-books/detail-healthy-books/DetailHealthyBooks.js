import React, { Component } from "react";

import { Text, View, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { createAppContainer, createStackNavigator } from "react-navigation";
import CLSDetailReport from "./ItemHealthyBooks/cls-detail-report/CLSDetailReport";
import { FlatList, TouchableWithoutFeedback } from "react-native-gesture-handler";
import CLSDetail from "./ItemHealthyBooks/CLSDetail";
import healthyBooksApi from "../../../api/healthy-book-api/healthyBooksApi"
import MedicineDetail from "./ItemHealthyBooks/MedicineDetail";


class HealthyBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    const { navigation } = this.props;
    let Id = navigation.getParam("Id", "NO-ID");
    ;
    try {
      let response = await healthyBooksApi.getChiTietLanKhamTheoIdPhieuKham(Id);
      this.setState({
        listMedicineData: response.LstDonThuoc === null ? [] : response.LstDonThuoc,
        listCLSData:
          response.LstPhieuChiDinh === null
            ? []
            : response.LstPhieuChiDinh.filter(o => o.IdPhieuIn !== null).map(o => o.IdPhieuIn),
        isLoading: false
      });
    } catch (errors) {
      console.log(errors);
    }
  };

  render() {
    const { navigation } = this.props;

    let ChanDoan = navigation.getParam("ChanDoan", " ");

    if (this.state.isLoading) {
      return (
        <View style={styles.containerLoading}>
          <ActivityIndicator style={{ color: "green", size: "large" }} />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <ScrollView style={(flex = 1)}>
          <LinearGradient
            style={styles.header}
            colors={["#17B890", "#1798b8", "dodgerblue"]}
            start={{ x: 0.0, y: 0.25 }}
            end={{ x: 1.25, y: 1.75 }}
          >
            <View style={styles.titleContainer}>
              <Text style={[styles.title]}>CHI TIẾT KHÁM </Text>
            </View>
          </LinearGradient>

          {/* CLS */}
          <View style={styles.marginTopValue}>
            <View style={[styles.recentlyPlayed, { height: this.state.listCLSData.length === 0 ? 120 : 200 }]}>
              <Text style={[styles.name, styles.name1]}>Kết quả cận lâm sàng</Text>
              <Text style={[styles.name, styles.paddingLeftValue, { marginTop: 10 }]}>
                {ChanDoan}
              </Text>
              {this.state.listCLSData.length > 0 &&
                <FlatList
                  horizontal={true}
                  removeClippedSubviews={false}
                  style={{ flex: 1 }}
                  data={this.state.listCLSData}
                  renderItem={({ item, index }) => (
                    <TouchableWithoutFeedback
                      onPress={() => this.props.navigation.navigate("CLSDetailReport", { IdPhieuIn: item })}
                    >
                      <CLSDetail index={index + 1} />
                    </TouchableWithoutFeedback>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
              }

              {
                this.state.listCLSData.length === 0 &&
                <ShowWhenHasNoData ShowText="Không có phiếu CLS"/>
              }
            </View>

            {/* Thuoc */}
            <View style={[styles.recentlyPlayed, { height: this.heightOfMedicalView() }]}>
              <Text style={[styles.name, styles.name1]}>Danh sách thuốc</Text>

              {this.state.listMedicineData.length > 0 && <FlatList
                data={this.state.listMedicineData}
                removeClippedSubviews={false}
                renderItem={({ item, index }) => <MedicineDetail item={item} index={index + 1} />}
                keyExtractor={(item, index) => index.toString()}
              />}

              {
                this.state.listMedicineData.length == 0 &&
                <ShowWhenHasNoData ShowText="Không có đơn thuốc"/>
              }
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  heightOfMedicalView = () => {
    let len = this.state.listMedicineData.length;
    if (len == 0) return 120;
    if (len > 5) len = 5;
    return 100 + len * 50;
  }

}

class ShowWhenHasNoData extends Component {
  render() {
    return (
      <View>
        <View style={{ flex: 1, paddingTop: 20 }}>
          <Text style={{ textAlign: "center", fontSize: 14, fontWeight: "300", color: "red" }}>{this.props.ShowText}</Text>
        </View>
      </View>
    )
  }
}

const AppNavigator = createStackNavigator({
  HealthyBooks: {
    screen: HealthyBooks,
    navigationOptions: {
      header: null
    }
  },
  CLSDetailReport: {
    screen: CLSDetailReport,
    navigationOptions: {
      header: null
    }
  }
});

const titleColor = "#ffffff";
const backgroundPrimary = "#F2F6FE";
const borderColor = "#fff";
const primaryTextColor = "#2f4f4f";

const styles = StyleSheet.create({
  containerLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: backgroundPrimary
  },
  header: {
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: borderColor,
    height: 120,
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },

  titleContainer: {
    backgroundColor: "transparent"
  },

  title: {
    fontSize: 16,
    marginBottom: 20,
    color: titleColor,
    textAlign: "center",
    fontWeight: "bold"
  },

  marginTopValue: {
    marginTop: 80
  },

  recentlyPlayed: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    shadowColor: "#444",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 1,
    paddingLeft: 10,
    paddingTop: 10,
    padding: 5,
    backgroundColor: "white"
  },

  name: {
    color: primaryTextColor,
    fontSize: 14,
    textAlign: "left",
    justifyContent: "center"
  },

  name1: {
    textAlign: "center",
    color: "dodgerblue",
    fontWeight: "bold",
    fontSize: 16
  },

  listItem: {
    flex: 1,
    borderWidth: 0.3,
    borderStyle: "solid",
    borderTopColor: "white",
    borderLeftColor: "white",
    borderRightColor: "white",
    borderBottomColor: "gray",
    backgroundColor: "white",
    paddingLeft: 10,
    paddingTop: 2,
    // paddingBottom: 2,
    marginTop: 15,
    // borderRadius: 10,
    // shadowColor: '#444',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 1,
    marginLeft: 15,
    marginRight: 15
  },

  row: {
    flexDirection: "row"
  },

  text: {
    flex: 1,
    padding: 5,
    justifyContent: "center"
  },

  text1: {
    flex: 6,
    padding: 5,
    justifyContent: "center"
  },

  text2: {
    flex: 1,
    padding: 5,
    justifyContent: "center"
  },

  text3: {
    flex: 2,
    padding: 5,
    justifyContent: "center"
  },

  padding10: {
    padding: 10
  },

  paddingLeftValue: {
    paddingLeft: 10
  },

  recentlyPlayedThumb: {
    width: 90,
    height: 80,
    borderRadius: 10
  },

  smallText: {
    color: primaryTextColor,
    fontSize: 12,
    alignSelf: "center",
    marginTop: 5
  },

  strong: {}
});

export default (HealthyBooks = createAppContainer(AppNavigator));
