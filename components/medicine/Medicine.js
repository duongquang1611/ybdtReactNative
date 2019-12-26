import React, { Component } from "react";
import { ActivityIndicator, StyleSheet, Text, View, FlatList, RefreshControl, AsyncStorage } from "react-native";
import ItemMedicine from "./item-medicine/ItemMedicine";
import healthyBooksApi from "../../api/healthy-book-api/healthyBooksApi";
// import { createStackNavigator, createAppContainer } from "react-navigation";
class Medicine extends Component {
  static navigationOptions = {
    title: "Danh sách thuốc"
  };
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      isLoading: true,
    };
  }

  componentDidMount() {
    this.getMedicine();
  }

  getMedicine = async () => {
    let token = await AsyncStorage.getItem("token");
    let username = JSON.parse(token).username;

    let allPhieu = await healthyBooksApi.getPhieuKhamTheoUsername(username);
    let allDetail = await Promise.all(allPhieu.map(async item => await healthyBooksApi.getChiTietLanKhamTheoIdPhieuKham(item.Id)));
    let allDetailThuoc = allDetail.map(item => {
      return {
        "NgayKham": item.NgayKham,
        "ChanDoan": item.ChanDoanBS,
        "Medicine": item.LstDonThuoc
      }
    }
    );
    this.setState({
      allMedicine: allDetailThuoc,
      isLoading: false,
      refreshing: false
    })
  }

  onRefresh = () => {
    this.setState({
      refreshing: true,
    });
    this.getMedicine();
  };
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.containerLoading}>
          <ActivityIndicator color="dodgerblue" size="large" />
        </View>
      );
    }
    return (
      <View style={{ backgroundColor: "#F4F4F4", flex: 1 }}>
        <FlatList
          data={this.state.allMedicine}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => <ItemMedicine item={item} />}
          refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh.bind(this)} />}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  containerLoading: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Medicine;
