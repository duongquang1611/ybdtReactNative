import React, { Component } from "react";
import { ActivityIndicator, AsyncStorage, ScrollView, StyleSheet, View } from "react-native";
import healthyBooksApi from "../../api/healthy-book-api/healthyBooksApi";
import ItemCanLamSang from "./list-item-cls/ItemCanLamSang";
class CanLamSang extends Component {
  static navigationOptions = {
    title: "Cận Lâm Sàng"
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      allDetailCls: [],
    };
  }

  async componentDidMount() {
    // await this.loadListLanKham();
    this.setState({
      allDetailCls: await this.getAllDataCls(),
      isLoading: false
    })
  }

  getAllDataCls = async () => {
    let token = await AsyncStorage.getItem("token");
    let username = JSON.parse(token).username;

    let allPhieu = await healthyBooksApi.getPhieuKhamTheoUsername(username);
    let allCls = await Promise.all(allPhieu.map(async item => await healthyBooksApi.getChiTietLanKhamTheoIdPhieuKham(item.Id)));
    let allDetailCls = await Promise.all(allCls.map(async item => {
      return {
        "NgayKham": item.NgayKham,
        "ChanDoan": item.ChanDoanBS,
        "ViewData": (item.LstPhieuChiDinh != null) ? await Promise.all(item.LstPhieuChiDinh.map(async itemDetail =>
          await healthyBooksApi.getHTMLPhieuCLSTheoIdPhieuIn(itemDetail.IdPhieuIn))) : null
      }
    }
    ));
    return allDetailCls;
  }


  render() {
    if (this.state.isLoading) {
      return (
        <View
          style={styles.containerLoading}
        >
          <ActivityIndicator size="large" color="dodgerblue" />
        </View>
      );
    }

    let { allDetailCls } = this.state;
    let listRender = allDetailCls.map((item, key) => {
      return <ItemCanLamSang item={item} key={key} navigation={this.props.navigation} />;
    });

    return (
      <ScrollView style={{ backgroundColor: "#E9EEEC", flex: 1 }}>
        <View>{listRender}</View>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  containerLoading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default CanLamSang;
