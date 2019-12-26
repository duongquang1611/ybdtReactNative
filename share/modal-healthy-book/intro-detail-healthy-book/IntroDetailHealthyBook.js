import React, { Component } from "react";
import { Text, StyleSheet, View, Platform, StatusBar, ScrollView } from "react-native";
import moment from "moment";

export default class DetailHealthyBook extends Component {
  state = {
    chiTiet: ""
  };

  render() {
    healthyDetail = this.props.data.dataExaminationCard;

    return (
      <View style={styles.container}>
        <ScrollView>
          <Text
            style={{ alignItems: "center", textAlign: "center", textTransform: "uppercase", fontSize: 18, fontWeight: "bold" }}
          >
            Lần Khám Bệnh
          </Text>
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 16, marginVertical: 5 }}>
              <Text style={{ fontWeight: "bold" }}>Ngày khám: </Text>
              {healthyDetail.NgayKham ? moment(healthyDetail.NgayKham).format("DD/MM/YYYY") : "Không có"}
            </Text>
            <Text style={{ fontSize: 16, marginVertical: 5 }}>
              <Text style={{ fontWeight: "bold" }}>Khoa khám: </Text>
              {healthyDetail.TenKhoaKham ? healthyDetail.TenKhoaKham : "Không có"}
            </Text>
            <Text style={{ fontSize: 16, marginVertical: 5 }}>
              <Text style={{ fontWeight: "bold" }}>Bác sĩ khám: </Text>
              {healthyDetail.TenKhoaKham ? healthyDetail.TenKhoaKham : "Không có"}
            </Text>
            <Text style={{ fontSize: 16, marginVertical: 5 }}>
              <Text style={{ fontWeight: "bold" }}>Chẩn đoán: </Text>
              <Text style={{ fontStyle: "italic" }}>{healthyDetail.ChanDoanBS ? healthyDetail.ChanDoanBS : "Không có"}</Text>
            </Text>
            <Text style={{ fontSize: 16, marginVertical: 5 }}>
              <Text style={{ fontWeight: "bold" }}>Mã bệnh: </Text>
              {healthyDetail.MaICD ? healthyDetail.MaICD : "Không có"}
            </Text>
            <Text style={{ fontSize: 16, marginVertical: 5 }}>
              <Text style={{ fontWeight: "bold" }}>Ghi chú: </Text>
              <Text style={{ fontStyle: "italic" }}>{healthyDetail.GhiChu ? healthyDetail.GhiChu : "Không có"}</Text>
            </Text>
            <View>
              <Text style={{ fontSize: 16, marginVertical: 5, textAlign: "center", fontWeight: "bold" }}>
                Danh sách phiếu chỉ đinh
              </Text>
              <View style={{ borderWidth: 1, marginTop: 2 }}>
                <View style={[styles.chiDinh, { textAlign: "center" }]}>
                  <Text style={{ flex: 1, textAlign: "center", fontSize: 16, fontWeight: "bold" }}>STT</Text>
                  <Text
                    style={{
                      flex: 7,
                      textAlign: "center",
                      borderLeftWidth: 0.5,
                      paddingHorizontal: 10,
                      fontSize: 16,
                      fontWeight: "bold"
                    }}
                  >
                    Tên Phiếu chỉ định
                  </Text>
                </View>
                <View style={styles.chiDinh}>
                  <Text style={styles.stt}>1</Text>
                  <Text style={styles.tenPhieu}>Phiếu Siêu Âm Phiếu Siêu Âm Phiếu Siêu Âm Phiếu Siêu Âm Phiếu Siêu Âm</Text>
                </View>
                <View style={styles.chiDinh}>
                  <Text style={styles.stt}>2</Text>
                  <Text style={styles.tenPhieu}>Phiếu Siêu Âm</Text>
                </View>
                <View style={styles.chiDinh}>
                  <Text style={styles.stt}>3</Text>
                  <Text style={styles.tenPhieu}>Phiếu Siêu Âm</Text>
                </View>
                <View style={styles.chiDinh}>
                  <Text style={styles.stt}>4</Text>
                  <Text style={styles.tenPhieu}>Phiếu Siêu Âm</Text>
                </View>
              </View>
              <Text style={{ fontSize: 12, fontStyle: "italic", textAlign: "right", marginTop: 5 }}>
                Lật trang sau để xem chi tiết phiếu chỉ định và phiếu thu
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "stretch",
    marginTop: Platform.OS == "android" ? StatusBar.currentHeight + 10 : 10,
    padding: 20
  },
  chiDinh: {
    flexDirection: "row",
    borderBottomWidth: 0.5
  },
  stt: {
    flex: 1,
    textAlign: "center",
    alignSelf: "center",
    fontSize: 16
  },
  tenPhieu: {
    flex: 7,
    borderLeftWidth: 0.5,
    paddingHorizontal: 10,
    fontSize: 16
  }
});
