import React, { useState } from "react";
import { View, Text, Dimensions, FlatList, TouchableWithoutFeedback, ScrollView } from "react-native";
import StepProcess from "./step-process/StepProcess";
import { FontAwesome } from "@expo/vector-icons";

function MedicalProcess() {
  const { width } = Dimensions.get("window");
  const [stepActive, setStepActive] = useState(1);

  const listStep = [
    { title: "Thu tiền công khám", content: "Bạn cần phải đến thu tiền trước khi tiến hành khám" },
    { title: "Vào phòng khám nhận chỉ định cận lâm sàng", content: "đến phòng 306 tòa A" },
    { title: "Khám cận lâm sàng", content: "Khám tại phòng xquang phòng 204 tòa A" },
    { title: "Nhận chỉ định", content: "Đến phòng 204 tòa A" },
    { title: "Nhận thuốc", content: "Nhà thuốc cạnh cổng" }
  ];
  return (
    <View style={{ flex: 1, backgroundColor: "#F4F4F4" }}>
      <View style={{ backgroundColor: "white", borderWidth: 0.5, borderColor: "gray", paddingLeft: 10 }}>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 14, color: "gray" }}>Ngày : 10-7-2019 </Text>
          <Text style={{ fontSize: 14, color: "gray", marginTop: 5 }}>Giờ : 10:00</Text>
        </View>
        <View style={{ marginTop: 5, marginBottom: 10, flexDirection: "row", justifyContent: "space-between" }}>
          <Text>Quy trình : Khám bụng</Text>
          <Text style={{ marginRight: 20 }}>Bác sĩ : Nguyễn thị Lịu</Text>
        </View>
      </View>
      <View style={{ backgroundColor: "white", marginTop: 20, flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ paddingBottom: 60 }}>
            <FlatList
              data={listStep}
              keyExtractor={(item, index) => `${index}`}
              renderItem={({ item, index }) => (
                <StepProcess
                  totalStep={listStep.length}
                  active={stepActive}
                  step={index + 1}
                  title={item.title}
                  content={item.content}
                />
              )}
            />
          </View>
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            position: "absolute",
            bottom: 0,
            width: width,
            paddingVertical: 20
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              if (stepActive != 1) {
                setStepActive(prevStep => prevStep - 1);
              }
            }}
          >
            <View style={{ alignItems: "center", flexDirection: "row" }}>
              <Text style={{ marginRight: 10, color: stepActive == 1 ? "gray" : "#FC197A" }}>sau</Text>
              <FontAwesome name="arrow-left" size={24} color={stepActive == 1 ? "gray" : "#FC197A"} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              if (stepActive === listStep.length) {
                alert("ban da kham thanh cong");
              } else {
                setStepActive(prevStep => prevStep + 1);
              }
            }}
          >
            <View style={{ alignItems: "center", flexDirection: "row" }}>
              <FontAwesome name="arrow-right" size={24} color="#FC197A" />
              <Text style={{ marginLeft: 10, color: "#FC197A" }}>tiếp</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
}

export default MedicalProcess;
