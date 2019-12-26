import React, { Component } from 'react'
import { Text, StyleSheet, View, FlatList, ScrollView, Platform } from 'react-native'
import ItemMedicine from './item-medicine/ItemMedicine';
import moment from 'moment';


class MedicineModalHealthyBook extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { data } = this.props;
    let detailMedicine = data.dataMedicine;
    let { profile } = this.props;
    let stt = 1;
    let { height, width } = this.props;
    return (
      <ScrollView bounces={false}>
        <View style={{ paddingHorizontal: 20, flex: 1 }}>
          <View style={{ alignItems: "center", marginVertical: 20 }}>
            <Text style={styles.title}>Đơn thuốc</Text>
          </View>

          <View>
            <Text>Họ và tên: {profile.HoTen}</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text>Tuổi: {moment().diff(profile.NgaySinh, "years")}</Text>
            <Text>Giới tính: {profile.GioiTinh ? "Nam" : "Nữ"}</Text>
          </View>
          <Text>Địa chỉ: {profile.DiaChi}</Text>
          <View style={{ flexDirection: "row" }}>
            <Text>Số BHYT: </Text>
            <Text style={{ fontWeight: "bold" }}> {profile.SoBHYT}</Text>
          </View>

          <Text style={{ flexWrap: "wrap" }}>Chẩn đoán: {detailMedicine.ChanDoanBS}</Text>

          <View
            style={
              Platform.OS === "ios"
                ? { ...styles.headerContainer }
                : width > height
                  ? { ...styles.headerContainer }
                  : { ...styles.headerContainer, flex: 0.12 }
            }
          >
            <View style={{ flex: 1 }}>
              <Text style={{ ...styles.header }}>STT</Text>
            </View>
            <View style={{ flex: 7 }}>
              <Text style={{ ...styles.header }}>Tên thuốc (Hoạt chất)</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ ...styles.header }}>SL</Text>
            </View>
            <View style={{ flex: 1.5 }}>
              <Text style={{ ...styles.header }}>Đơn vị</Text>
            </View>
          </View>

          <View style={{ marginBottom: 30 }}>
            <FlatList
              data={detailMedicine.LstDonThuoc}
              renderItem={({ item, index }) => <ItemMedicine item={item} stt={stt++} />}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  headerContainer: {
    flexDirection: 'row',
    borderColor: 'black',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    marginTop: 10,
    paddingVertical: 8
  },
  header: {
    fontWeight: "bold",
    textAlign: "center"
  }
});

export default MedicineModalHealthyBook;
