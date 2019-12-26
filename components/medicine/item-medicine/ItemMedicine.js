import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import moment from "moment";
import DetailMedicine from "./detail-medicine/DetailMedicine";

class ItemMedicine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: false
    };
  }
  onPressItem = () => {
    // LayoutAnimation.spring();
    this.setState((prevState, prevProps) => ({
      isSelected: !prevState.isSelected
    }));
  };
  render() {
    let { item } = this.props;
    // console.log(item.LstDonThuoc);
    const { isSelected } = this.state;
    return (
      <View style={{ paddingBottom: 5 }}>
        <TouchableWithoutFeedback onPress={this.onPressItem}>
          <View
            style={{
              ...styles.container,
              borderBottomEndRadius: isSelected ? 0 : 5,
              borderBottomStartRadius: isSelected ? 0 : 5
            }}
          >
            <View style={styles.itemRowCotainer}>
              <View style={{ flex: 9 }}>
                {!isSelected && (
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.date}>{moment(item.NgayKham).format("DD/MM/YYYY")}</Text>
                  </View>
                )}
                <Text
                  style={{
                    color: "dodgerblue",
                    fontWeight: "bold",
                    fontSize: isSelected ? 16 : 14
                  }}
                >
                  {isSelected
                    ? `Đơn thuốc ngày ${moment(item.NgayKham).format("DD/MM/YYYY")}`
                    : item.ChanDoan != null
                      ? item.ChanDoan.trim()
                      : "Chưa có chuẩn đoán"}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <FontAwesome name={isSelected ? "angle-up" : "angle-down"} color="black" size={16} />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        {isSelected && <DetailMedicine medicine={item.Medicine} />}
        {/* {isSelected && this.renderDetail(item.dsThuoc)} */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    marginTop: 10,
    marginHorizontal: 10,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2
  },
  itemRowCotainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10
  },
  date: {
    marginTop: 5,
    fontSize: 12,
    color: "gray"
  }
});

export default ItemMedicine;
