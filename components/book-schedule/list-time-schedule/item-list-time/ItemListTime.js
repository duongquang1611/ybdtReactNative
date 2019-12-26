import React from "react";
import { TouchableWithoutFeedback, View, Text, StyleSheet, Dimensions } from "react-native";
import { checkTimeCanBook } from "../../../../helpers/date/formatDate";

function ItemListTime(props) {
  return (
    <TouchableWithoutFeedback
      onPress={() => props.openModal(props.data)}
      disabled={checkTimeCanBook(props.datePicker, props.data.hour, props.data.minute)}
    >
      <View
        style={{
          paddingHorizontal: 10,
          width: Dimensions.get("window").width / 4,
          marginVertical: 5
        }}
      >
        <View
          style={{
            alignItems: "center",
            paddingHorizontal: 10,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: "#F4F0F4",
            paddingVertical: 2,
            position: "relative"
          }}
        >
          <Text
            style={{
              color: checkTimeCanBook(props.datePicker, props.data.hour, props.data.minute) ? "#e8dfdf" : "#2ac5e8",
              fontWeight: "500"
            }}
          >
            {props.data.hour}:{props.data.minute}
          </Text>
          <Text
            style={{
              color: checkTimeCanBook(props.datePicker, props.data.hour, props.data.minute) ? "#e8dfdf" : "#2ac5e8",
              fontWeight: "500",
              fontSize: 12
            }}
          >
            đã đặt {props.data.count}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default ItemListTime;
