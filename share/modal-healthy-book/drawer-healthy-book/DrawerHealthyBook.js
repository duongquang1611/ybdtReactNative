import React, { useState, useEffect } from "react";
import { View, Text, Image, Animated, TouchableWithoutFeedback, BackHandler, FlatList, StyleSheet } from "react-native";
import { statusBarHeight } from "../../../share/customStatusBar/CustomStatusBar";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import healthyBooksApi from "../../../api/healthy-book-api/healthyBooksApi";
import { cutScript } from "../../../helpers/cutScript/cutScript";

function DrawerHealthyBook(props) {
  const width = Math.min(props.height, props.width);
  const headerHeight = width - statusBarHeight - 100;
  const [transformDrawer, setTransformDrawer] = useState(new Animated.Value((-3 * width) / 4 - 10));
  const [BackHandlerAdd, setBackHandlerAdd] = useState();

  useEffect(
    () => {
      if (props.showDrawer) {
        Animated.timing(transformDrawer, { toValue: 0, duration: 300 }).start();
      }
    },
    [props.showDrawer]
  );

  useEffect(() => {
    setBackHandlerAdd(
      BackHandler.addEventListener("hardwareBackPress", () => {
        closeDrawer();
        return true;
      })
    );
  }, []);

  closeDrawer = () => {
    Animated.timing(transformDrawer, { toValue: (-3 * width) / 4 - 10, duration: 300 }).start(() => {
      props.closeDrawer();
    });
    BackHandlerAdd.remove();
  };

  reloadDataForEachHealthyBook = (item, index) => async () => {
    Animated.timing(transformDrawer, { toValue: (-3 * width) / 4 - 10, duration: 150 }).start(async () => {
      props.closeDrawer();
      let count = 0;

      for (let i = 0; i < index; ++i) {
        if (props.allCls[i].LstPhieuChiDinh) {
          count += props.allCls[i].LstPhieuChiDinh.length + 2;
        } else {
          count += 2;
        }
      }
      count++;
      props.skipCarouelTo(count);
    });
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={closeDrawer}>
        <View
          style={{
            position: "absolute",
            width: props.width,
            height: props.height,
            backgroundColor: "rgba(22, 22, 23,0.7)",
            zIndex: 2999
          }}
        />
      </TouchableWithoutFeedback>

      <Animated.View
        style={{
          transform: [{ translateX: transformDrawer }],
          backgroundColor: "white", //"white",
          position: "absolute",
          zIndex: 3000,
          top: 0,
          left: 0,
          height: props.height - statusBarHeight,
          width: (3 * width) / 4,
          marginTop: statusBarHeight
        }}
      >
        <View style={styles.containerModal}>
          <TouchableWithoutFeedback onPress={closeDrawer}>
            <View style={styles.containerClose}>
              <FontAwesome name="close" size={20} />
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.containerInfo}>
            <FlatList
              data={props.allCls}
              renderItem={({ item, index }) => (
                <TouchableWithoutFeedback onPress={reloadDataForEachHealthyBook(item, index)}>
                  <View style={[styles.containerPk, { height: headerHeight + 50 }]}>
                    <View
                      style={{ marginTop: 10, height: headerHeight * 0.125, justifyContent: "center", alignItems: "center" }}
                    >
                      <Text style={{ fontSize: 14 }}> Ngày khám : {this.convertDate(new Date(item.NgayKham))}</Text>
                    </View>
                    <View
                      style={{
                        marginTop: 10,
                        height: headerHeight * 0.5,
                        width: width / 2 + 20,
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <Image source={require("../../../assets/cls.png")} />
                    </View>
                    <View
                      style={{ marginTop: 10, height: headerHeight * 0.125, justifyContent: "center", alignItems: "center" }}
                    >
                      <Text style={{ fontSize: 14, fontStyle: "italic" }}>
                        Bác sĩ: {item.TenBacSi ? item.TenBacSi : "_._._._._._._._"}
                      </Text>
                    </View>
                    <View style={{ marginTop: 10, msarginBottom: 10, height: headerHeight * 0.25 }}>
                      <Text style={{ textAlign: "center", fontSize: 14, fontStyle: "italic", fontWeight: "500" }}>
                        Chẩn đoán: {item.ChanDoanBS}
                      </Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              )}
              keyExtractor={item => item.Id}
            />
          </View>
        </View>
      </Animated.View>
    </>
  );
}

convertDate = date => {
  return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
};

const styles = StyleSheet.create({
  containerModal: {
    flex: 1
  },
  containerClose: {
    position: "absolute",
    right: 0,
    top: 0,
    padding: 10
  },
  containerInfo: {
    marginTop: 20,
    padding: 10,
    flex: 1
  },
  containerPk: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center"
  }
});

export default DrawerHealthyBook;
