import React, { Component } from "react";
import { View, Image, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";


import TitleListCls from "../title-list-cls/TitleListCls";
const imageCLS = require("../../../assets/medicalbill.png");
class ItemCanLamSang extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // componentDidMount() {
  //     let { item } = this.props;
  //     let { navigation } = this.props;
  //     let imageList;
  //     if (item.data[0] != "Khong co cls") {
  //         imageList = item.data.map((item, key) => {
  //             return (
  //                 <TouchableWithoutFeedback key={key} onPress={() => navigation.navigate('DetailCLSReport', { data: item })}>
  //                     <View style={styles.imageWrapper}>
  //                         <Image style={styles.image} source={imageCLS} />
  //                     </View>
  //                 </TouchableWithoutFeedback>
  //             )
  //         });
  //     } else {
  //         imageList = <View style={styles.nonCls}><Text style={styles.textNonCls}>Không có kết quả cận lâm sàng</Text></View>
  //     }
  //     this.setState({
  //         imageList: imageList
  //     })
  // }
  render() {
    let { item } = this.props;
    let { navigation } = this.props;
    let imageList;
    if (item.ViewData != null) {
      imageList = item.ViewData.map((item, key) => {
        return (
          <TouchableWithoutFeedback key={key} onPress={() => navigation.navigate("ClsSnapCarousel", { "data": this.props.item.ViewData, "index": this.props.item.ViewData.indexOf(item) })}>
            <View style={styles.imageWrapper}>
              <Image style={styles.image} source={imageCLS} />
            </View>
          </TouchableWithoutFeedback>
        );
      });
    } else {
      imageList = (
        <View style={styles.nonCls}>
          <Text style={styles.textNonCls}>Không có kết quả cận lâm sàng</Text>
        </View>
      );
    }
    // let { item } = this.props;
    return (
      <View style={styles.container}>
        <TitleListCls NgayKham={item.NgayKham} ChanDoan={item.ChanDoan} />
        <View style={styles.imageListWrapper}>{imageList}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 15,
    borderRadius: 10,
    backgroundColor: "white"
  },
  nonCls: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textNonCls: {
    fontWeight: "bold",
    color: "gray",
    fontSize: 14
  },
  image: {
    height: 80,
    width: 60
  },
  imageListWrapper: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginHorizontal: 10,
    padding: 15
  },
  imageWrapper: {
    marginHorizontal: 5,
    marginVertical: 10
  }
});

export default ItemCanLamSang;
