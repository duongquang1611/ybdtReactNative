import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Platform, Image, Text, Dimensions, TouchableWithoutFeedback, FlatList, Alert } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Entypo } from "@expo/vector-icons";

function RoomDoctor(props) {
  const { width, height } = Dimensions.get("window");
  const scrollDoctorRef = useRef(null);
  const [activeDoctor, setActiveDoctor] = useState(null);
  const [doctorSelect, setDoctorSelect] = useState({});
  const [rooms, setRooms] = useState([]);
  const [offsetScroll, setOffsetScroll] = useState(0);
  const [roomSelect, setRoomSelect] = useState({});
  handleOnScrollDoctor = offsetX => {
    setOffsetScroll(offsetX.x);
  };

  handleNextScrollDoctor = () => {
    if(props.doctor.length <= 0){
      Alert.alert(
        'Thiếu thông tin',
        'Vui lòng chọn khoa để chọn bác sĩ',
        [
          {text: 'OK'},
        ],
        {cancelable: false},
      );
    }
     else {
      scrollDoctorRef.current.scrollToOffset({ offset: offsetScroll + 100 });
     } 
  };
  handlePrevScrollDoctor = () => {
    if(props.doctor.length <= 0){
      Alert.alert(
        'Thiếu thông tin',
        'Vui lòng chọn khoa để chọn bác sĩ',
        [
          {text: 'OK'},
        ],
        {cancelable: false},
      );
    }
    else {
      scrollDoctorRef.current.scrollToOffset({ offset: offsetScroll - 100 });
    }
  };

  useEffect(
    () => {
      if (props.rooms) {
        const roomConvert = props.rooms.map(room => {
          return { label: room.name, value: room };
        });
        setRooms(roomConvert);
      }
    
    },
    [props.rooms]
  );

  

  handleSelectDoctor = (doctor, active) => () => {
    setDoctorSelect(doctor);
    setActiveDoctor(active);
    props.getDoctor(doctor);
  };
  return (
    <View style={{ padding: 15, paddingTop: 0, backgroundColor: "white" }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ marginHorizontal: 9 }}>Khoa: </Text>
        <View style={{ width: width - 120 }}>
          <RNPickerSelect
            placeholder={{
              label: "--Chọn khoa phòng--",
              value: {}
            }}
            onValueChange={value => {
              if (Platform.OS === "android") {
                props.getDoctor({});
                setDoctorSelect({});
                setActiveDoctor(null);
                props.getRoom(value);
                setRoomSelect(value);
              } else {
                props.getDoctor({});
                setDoctorSelect({});
                setActiveDoctor(null);
                setRoomSelect(value);
              }
            }}
            onDonePress={() => {
              props.getDoctor({});
              setDoctorSelect({});
              setActiveDoctor(null);
              props.getRoom(roomSelect);
            }}
            items={rooms}
            style={{
              ...(Platform.OS === "ios" ? pickerSelectStyles.inputIOS : pickerSelectStyles.inputAndroid),
              iconContainer: {
                top: Platform.OS === "ios" ? 5 : 20,
                right: 10
              },
              placeholder: {
                fontSize: 12,
                fontWeight: "bold"
              }
            }}
            Icon={() => {
              return (
                <View
                  style={{
                    backgroundColor: "transparent",
                    borderTopWidth: 5,
                    borderTopColor: "gray",
                    borderRightWidth: 5,
                    borderRightColor: "transparent",
                    borderLeftWidth: 5,
                    borderLeftColor: "transparent",
                    width: 0,
                    height: 0
                  }}
                />
              );
            }}
          />
        </View>
      </View>
      <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
        <Text style={{ marginLeft: 9, marginTop: Platform.OS === "ios" ? 10 : 0 }}>Bác sĩ: </Text>

        <Text style={{ marginLeft: 9 }}>{doctorSelect.name}</Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
        <TouchableWithoutFeedback onPress={handlePrevScrollDoctor}>
          <Entypo name="chevron-left" size={40}/>
        </TouchableWithoutFeedback>

        {props.doctor.length > 0 ? (
          <FlatList
            horizontal={true}
            onScroll={event => handleOnScrollDoctor(event.nativeEvent.contentOffset)}
            ref={scrollDoctorRef}
            style={{ paddingVertical: 10 }}
            data={props.doctor}
            keyExtractor={(item, index) => `${item._id}`}
            renderItem={({ item, index }) => (
              <TouchableWithoutFeedback onPress={handleSelectDoctor({ id: item._id, name: item.name }, index)}>
                <View style={{ marginHorizontal: 5, alignItems: "center" }}>
                  <Image
                    source={require("../../../assets/blurbgdb.jpeg")}
                    style={{ width: 50, height: 50, borderRadius: 25, padding: 5, zIndex: 1 }}
                    opacity={activeDoctor === index ? 1 : 0.3}
                  />
                  <Text style={{ fontSize: 10, marginTop: Platform.OS === "ios" ? 5 : 0 }}>{item.name}</Text>
                </View>
              </TouchableWithoutFeedback>
            )}
          />
        ) : roomSelect._id ? (
          <View>
            <Text>Khoa không có bác sĩ</Text>
          </View>
        ) : (
          <View>
            <Text>Hãy chọn khoa để chọn bác sĩ</Text>
          </View>
        )}
        <TouchableWithoutFeedback onPress={handleNextScrollDoctor}>
          <Entypo name="chevron-right" size={40}/>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 13,
    paddingHorizontal: 10,
    color: "black",
    paddingRight: 30 // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 13,
    paddingHorizontal: 10,
    color: "black",
    paddingRight: 30 // to ensure the text is never behind the icon
  }
});

export default RoomDoctor;
