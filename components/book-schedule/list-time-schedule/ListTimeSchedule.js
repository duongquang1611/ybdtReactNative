import React, { useState } from "react";
import { ScrollView, Text, View, Dimensions } from "react-native";
import ModalSchedule from "../modal-schedule/ModalSchedule";
import ItemListTime from "./item-list-time/ItemListTime";
import { Feather } from "@expo/vector-icons";

function ListTimeSchedule(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState("");

  closeModal = () => {
    setIsOpen(false);
  };

  openModal = time => {
    setTime(time);
    setIsOpen(true);
  };

  const { width, height } = Dimensions.get("window");

  return (
    <ScrollView bounces={false} bouncesZoom={false} showsVerticalScrollIndicator={false} style={{ marginTop: 10 }}>
      <View
        style={{
          backgroundColor: "white",
          paddingTop: 10,
          flex: 1
        }}
      >
        <ModalSchedule
          navigation={props.navigation}
          isOpen={isOpen}
          room={props.room}
          date={props.date}
          doctor={props.doctor}
          time={time}
          closeModal={closeModal}
        />
        <View>
          <View style={{ flexDirection: "row", marginLeft: 10, alignItems: "center" }}>
            <Feather name="sun" size={18} color="#3A9FF2" />
            <Text style={{ fontWeight: "bold", marginLeft: 10, color: "#3A9FF2", fontSize: 18 }}>Sáng</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              paddingTop: 5,
              paddingBottom: 20,
              width: width,
              flexWrap: "wrap"
            }}
          >
            {props.listCountSchedule.map(
              (item, index) =>
                item.hour <= 11 && (
                  <ItemListTime data={item} key={index} index={index} datePicker={props.datePicker} openModal={openModal} />
                )
            )}
          </View>
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              marginLeft: 10,
              alignItems: "center"
            }}
          >
            <Feather name="moon" size={18} color="#eb6e1a" />
            <Text style={{ fontWeight: "bold", marginLeft: 10, color: "#eb6e1a", fontSize: 18 }}>Chiều</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              paddingTop: 5,
              paddingBottom: 20,
              width: width,
              flexWrap: "wrap"
            }}
          >
            {props.listCountSchedule.map(
              (item, index) =>
                item.hour >= 12 && (
                  <ItemListTime data={item} key={index} index={index} datePicker={props.datePicker} openModal={openModal} />
                )
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default ListTimeSchedule;
