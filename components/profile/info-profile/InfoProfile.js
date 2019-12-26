import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  NativeModules,
  LayoutAnimation
} from "react-native";
import { FontAwesome, AntDesign, MaterialCommunityIcons, MaterialIcons, Entypo } from "@expo/vector-icons";

function InfoProfile(props) {
  const [codeLogin, setCodeLogin] = useState(props.profile.Ma);
  const [nameUser, setNameUser] = useState(props.profile.HoTen);
  const [insurrance, setInsurrance] = useState(props.profile.SoBHYT);
  const [birthday, setBirthday] = useState(
    `${new Date(props.profile.NgaySinh).getDate()}-${new Date(props.profile.NgaySinh).getMonth() + 1}-${new Date(
      props.profile.NgaySinh
    ).getFullYear()}`
  );
  const [phone, setPhone] = useState(props.profile.DienThoai);
  const [address, setAddress] = useState(props.profile.DiaChi);
  const [openModal, setOpenModal] = useState(false);
  const [animationHeight, setAnimationHeight] = useState(-200);
  const [titleInputEdit, setTitleInputEdit] = useState("");
  const [inputEdit, setInputEdit] = useState("");
  const [typeEdit, setTypeEdit] = useState("");
  const inputEditRef = useRef(null);

  useEffect(
    () => {
      setCodeLogin(props.profile.Ma);
      setNameUser(props.profile.HoTen);
      setInsurrance(props.profile.SoBHYT);
      setBirthday(
        `${new Date(props.profile.NgaySinh).getDate()}-${new Date(props.profile.NgaySinh).getMonth() + 1}-${new Date(
          props.profile.NgaySinh
        ).getFullYear()}`
      );
      setPhone(props.profile.DienThoai);
      setAddress(props.profile.DiaChi);
    },
    [props.profile]
  );

  const { UIManager } = NativeModules;
  UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

  openModalEdit = (title, value, type) => {
    if (props.edit) {
      LayoutAnimation.spring();
      setOpenModal(true);
      setAnimationHeight(10);
      setTitleInputEdit(title);
      setInputEdit(value);
      setTypeEdit(type);
      inputEditRef.current.focus();
    }
  };

  stopAndCloseEdit = () => {
    setOpenModal(false);
    LayoutAnimation.spring();
    setAnimationHeight(-200);
    inputEditRef.current.blur();

    switch (typeEdit) {
      case "codeLogin": {
        setCodeLogin(inputEdit);
        break;
      }
      case "nameUser": {
        setNameUser(inputEdit);
        break;
      }
      case "insurrance": {
        setInsurrance(inputEdit);
        break;
      }
      case "birthday": {
        setBirthday(inputEdit);
        break;
      }
      case "phone": {
        setPhone(inputEdit);
        break;
      }
      case "address": {
        setAddress(inputEdit);
        break;
      }
      default:
        return null;
    }
  };

  changeEdit = text => {
    setInputEdit(text);
  };

  handleOpenEditOnPress = (title, value, type) => () => {
    props.openEditOpenPress();
    openModalEdit(title, value, type);
  };

  return (
    <>
      {openModal && (
        <TouchableWithoutFeedback onPress={stopAndCloseEdit}>
          <View
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              backgroundColor: "rgba(153, 161, 173,0.5)",
              zIndex: 500
            }}
          />
        </TouchableWithoutFeedback>
      )}

      <View
        style={{
          position: "absolute",
          zIndex: 1000,
          backgroundColor: "white",
          borderRadius: 5,
          padding: 10,
          left: 10,
          right: 10,
          top: animationHeight
        }}
      >
        <View>
          <Text style={{ color: "gray", fontSize: 14 }}>{titleInputEdit}</Text>
          <TextInput
            style={styles.editInput}
            value={inputEdit}
            returnKeyType="done"
            contextMenuHidden={true}
            ref={inputEditRef}
            onChangeText={changeEdit}
            returnKeyType="done"
            onEndEditing={stopAndCloseEdit}
          />
          <Text style={{ position: "absolute", right: 5, bottom: 5 }}>
            <Entypo name="edit" />
          </Text>
        </View>
      </View>

      <ScrollView>
        <View style={{ backgroundColor: "#F4F4F4", paddingBottom: 20 }}>
          <TouchableWithoutFeedback
            onLongPress={handleOpenEditOnPress("Mã đăng nhập", codeLogin, "codeLogin")}
            onPress={() => openModalEdit("Mã đăng nhập", codeLogin, "codeLogin")}
          >
            <View
              style={{
                borderRadius: 5,
                paddingVertical: 10,
                paddingHorizontal: 20,
                marginLeft: 25,
                marginRight: 25,
                backgroundColor: "white",
                marginTop: 20
              }}
            >
              <Text style={styles.textHeader}>
                Mã Đăng Nhập <MaterialCommunityIcons name="barcode" />
              </Text>
              {props.edit ? (
                <View>
                  <View style={{ ...styles.editInput, marginTop: 8 }}>
                    <Text>{codeLogin}</Text>
                  </View>
                  <Text style={{ position: "absolute", right: 5, bottom: 5 }}>
                    <Entypo name="edit" />
                  </Text>
                </View>
              ) : (
                <Text style={styles.marginText}>{codeLogin}</Text>
              )}
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onLongPress={handleOpenEditOnPress("Họ và tên", nameUser, "nameUser")}
            onPress={() => openModalEdit("Họ và tên", nameUser, "nameUser")}
          >
            <View
              style={{
                paddingVertical: 10,
                paddingHorizontal: 20,
                marginLeft: 25,
                marginRight: 25,
                borderRadius: 5,
                backgroundColor: "white",
                marginTop: 10
              }}
            >
              <Text style={styles.textHeader}>
                Họ và Tên <MaterialCommunityIcons name="format-letter-case" />
              </Text>
              {props.edit ? (
                <View>
                  <View style={{ ...styles.editInput, marginTop: 8 }}>
                    <Text>{nameUser}</Text>
                  </View>
                  <Text style={{ position: "absolute", right: 5, bottom: 5 }}>
                    <Entypo name="edit" />
                  </Text>
                </View>
              ) : (
                <Text style={styles.marginText}>{nameUser}</Text>
              )}
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onLongPress={handleOpenEditOnPress("Số bảo hiểm", insurrance, "insurrance")}
            onPress={() => openModalEdit("Số bảo hiểm", insurrance, "insurrance")}
          >
            <View
              style={{
                paddingVertical: 10,
                paddingHorizontal: 20,
                marginLeft: 25,
                marginRight: 25,
                borderRadius: 5,
                backgroundColor: "white",
                marginTop: 10
              }}
            >
              <Text style={styles.textHeader}>
                Số thẻ bảo hiểm <AntDesign name="creditcard" />
              </Text>
              {props.edit ? (
                <View>
                  <View style={{ ...styles.editInput, marginTop: 8 }}>
                    <Text>{insurrance}</Text>
                  </View>
                  <Text style={{ position: "absolute", right: 5, bottom: 5 }}>
                    <Entypo name="edit" />
                  </Text>
                </View>
              ) : (
                <Text style={styles.marginText}>{insurrance}</Text>
              )}
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onLongPress={handleOpenEditOnPress("Ngày sinh", birthday, "birthday")}
            onPress={() => openModalEdit("Ngày sinh", birthday, "birthday")}
          >
            <View
              style={{
                paddingVertical: 10,
                paddingHorizontal: 20,
                marginLeft: 25,
                marginRight: 25,
                borderRadius: 5,
                backgroundColor: "white",
                marginTop: 10
              }}
            >
              <Text style={styles.textHeader}>
                Ngày sinh <MaterialIcons name="date-range" />
              </Text>
              {props.edit ? (
                <View>
                  <View style={{ ...styles.editInput, marginTop: 8 }}>
                    <Text>{birthday}</Text>
                  </View>
                  <Text style={{ position: "absolute", right: 5, bottom: 5 }}>
                    <Entypo name="edit" />
                  </Text>
                </View>
              ) : (
                <Text style={styles.marginText}>{birthday}</Text>
              )}
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onLongPress={handleOpenEditOnPress("Điện thoại", phone, "phone")}
            onPress={() => openModalEdit("Điện thoại", phone, "phone")}
          >
            <View
              style={{
                paddingVertical: 10,
                paddingHorizontal: 20,
                marginLeft: 25,
                marginRight: 25,
                borderRadius: 5,
                backgroundColor: "white",
                marginTop: 10
              }}
            >
              <Text style={styles.textHeader}>
                Điện thoại <AntDesign name="phone" />
              </Text>
              {props.edit ? (
                <View>
                  <View style={{ ...styles.editInput, marginTop: 8 }}>
                    <Text>{phone}</Text>
                  </View>
                  <Text style={{ position: "absolute", right: 5, bottom: 5 }}>
                    <Entypo name="edit" />
                  </Text>
                </View>
              ) : (
                <Text style={styles.marginText}>{phone}</Text>
              )}
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onLongPress={handleOpenEditOnPress("Địa chỉ", address, "address")}
            onPress={() => openModalEdit("Địa chỉ", address, "address")}
          >
            <View
              style={{
                paddingVertical: 10,
                paddingHorizontal: 20,
                marginLeft: 25,
                marginRight: 25,
                borderRadius: 5,
                backgroundColor: "white",
                marginTop: 10
              }}
            >
              <Text style={styles.textHeader}>
                Địa chỉ <FontAwesome name="map-marker" />
              </Text>
              {props.edit ? (
                <View>
                  <View style={{ ...styles.editInput, marginTop: 8 }}>
                    <Text>{address}</Text>
                  </View>
                  <Text style={{ position: "absolute", right: 5, bottom: 5 }}>
                    <Entypo name="edit" />
                  </Text>
                </View>
              ) : (
                <Text style={styles.marginText}>{address}</Text>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  textHeader: {
    textTransform: "capitalize",
    fontSize: 12,
    color: "#CBBEB3"
  },
  marginText: { marginTop: 5 },
  editInput: {
    borderBottomColor: "#F4F4F4",
    borderBottomWidth: 2
  }
});

export default InfoProfile;
