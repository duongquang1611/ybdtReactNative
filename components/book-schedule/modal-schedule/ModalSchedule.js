import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput,
  Dimensions,
  Alert,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import Modal from "react-native-modal";
import { FontAwesome, AntDesign, Entypo } from "@expo/vector-icons";
import { ScheduleApi } from "../../../api/schedule-api/scheduleApi";

function ModalSchedule(props) {
  const [note, setNote] = useState("");
  const [texting, setTexting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  const { width, height } = Dimensions.get("window");

  booking = async () => {
    if (!props.doctor.id || !props.room.id) {
      Alert.alert(
        "Bạn chưa chọn phòng hoặc bác sĩ.",
        "Nhấn quay lại để quay lại chọn",
        [
          {
            text: "Hủy",
            style: "cancel"
          },
          { text: "Quay lại", onPress: () => props.closeModal() }
        ],
        { cancelable: false }
      );
    } else {
      let token = JSON.parse(await AsyncStorage.getItem("token"));
      let schedule = {
        title: token.HoTen,
        state: 0,
        start: new Date(
          props.date.getFullYear(),
          props.date.getMonth(),
          props.date.getDate(),
          props.time.hour + 7,
          props.time.minute
        ),
        meta: {
          doctor: props.doctor.id,
          doctorName:props.doctor.name,
          patientName: token.HoTen,
          patientMobile: "",
          idPatient: token.id,
          room: props.room.id,
          roomName: props.room.name,
          phone: "",
          note: note,
          creator: ""
        }
      };

      try {
        setIsLoading(true);
        await ScheduleApi.createSchedule(schedule);
        setIsLoading(false);
        Alert.alert(
          "Đặt lịch thành công",
          "Nhấn OK để tới xem lịch hẹn",
          [
            {
              text: "OK",
              onPress: () => {
                props.closeModal();
                props.navigation.navigate({ routeName: "Appointment", params: { from: "book-schedule" } });
              }
            }
          ],
          { cancelable: false }
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View>
      <Modal
        isVisible={props.isOpen}
        animationIn="slideInUp"
        animationOutTiming={100}
        backdropOpacity={0.5}
        avoidKeyboard={true}
        backdropTransitionOutTiming={0}
      >
        <View style={styles.modal}>
          <TouchableWithoutFeedback
            onPress={() => {
              props.closeModal();
            }}
          >
            <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, top: 0 }} />
          </TouchableWithoutFeedback>
          <View style={{ backgroundColor: "#F4F4F4", zIndex: 2, borderRadius: 5, padding: 10, paddingTop: 20 }}>
            <View style={{ flexDirection: "row", alignItems: "flex-end", marginBottom: 10 }}>
              <Text>
                <Entypo name="edit" />
              </Text>
              <Text style={{ marginLeft: 10 }}>Thông tin lịch hẹn</Text>
              <TouchableWithoutFeedback onPress={() => props.closeModal()}>
                <View style={{ position: "absolute", right: 5, top: -10, padding: 10 }}>
                  <FontAwesome name="close" size={22} />
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.itemSchedule}>
              <Text style={{ marginBottom: 5, fontSize: 12, color: "gray" }}>Khoa phòng</Text>
              <Text>{props.room.name}</Text>
            </View>

            <View style={styles.itemSchedule}>
              <Text style={{ marginBottom: 5, fontSize: 12, color: "gray" }}>Bác sĩ</Text>
              <Text>{props.doctor.name}</Text>
            </View>

            <View style={styles.itemSchedule}>
              <Text style={{ marginBottom: 5, fontSize: 12, color: "gray" }}>Thời gian</Text>
              <View style={styles.dateTime}>
                <Text>
                  <FontAwesome name="calendar-o" color="gray" />
                  <Text style={{ color: "gray", marginLeft: 10 }}>
                    {props.date.getDate()}-{props.date.getMonth() + 1}-{props.date.getFullYear()}
                  </Text>
                </Text>
                <Text>
                  <AntDesign name="clockcircleo" color="gray" />
                  <Text style={{ color: "gray", marginLeft: 10 }}>
                    {props.time.hour}:{props.time.minute}
                  </Text>
                </Text>
              </View>
            </View>
            <View style={{ marginVertical: 5 }}>
              <TextInput
                multiline={true}
                style={{
                  borderRadius: 5,
                  padding: 5,
                  backgroundColor: "white",
                  width: width * 0.8,
                  height: 100,
                  textAlignVertical: "top"
                }}
                placeholder="Nhập ghi chú cho bác sĩ ..."
                value={note}
                onChangeText={text => setNote(text)}
                onFocus={() => setTexting(true)}
                ref={inputRef}
                returnKeyType="done"
              />
            </View>
            <TouchableWithoutFeedback onPress={booking}>
              <View style={{ marginTop: 15, backgroundColor: "#47B7BA", alignItems: "center", padding: 10, borderRadius: 5 }}>
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                  {isLoading ? (
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <ActivityIndicator size="small" color="white" />
                      <Text style={{ color: "white", marginLeft: 5 }}>loading...</Text>
                    </View>
                  ) : (
                    <View>
                      <Text style={{ color: "white" }}>Đặt lịch</Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  dateTime: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  itemSchedule: {
    marginVertical: 5,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10
  }
});

export default ModalSchedule;
