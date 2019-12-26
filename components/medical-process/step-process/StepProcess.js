import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, Animated } from "react-native";
import Triangle from "react-native-triangle";

function StepProcess(props) {
  const { width } = Dimensions.get("window");

  const [animationWidthBorder, setAnimationWidthBorder] = useState(new Animated.Value(5));
  const [animationOpacityBorder, setAnimationOpacityBorder] = useState(new Animated.Value(1));

  useEffect(() => {
    Animated.loop(
      Animated.timing(animationWidthBorder, {
        toValue: 0,
        duration: 1000
      }),
      Animated.timing(animationOpacityBorder, {
        toValue: 0,
        duration: 2000
      })
    ).start();
  }, []);

  return (
    <View style={{ width: width, alignItems: "flex-end", paddingRight: 15 }}>
      {props.step === 1 && <View style={{ height: 20, marginHorizontal: 30 }} />}
      <View style={{ width: (3 * width) / 4, flexDirection: "row" }}>
        <View
          style={{
            width: 70,
            paddingVertical: 5,
            alignItems: "center",
            borderRadius: 50,
            backgroundColor: props.step > props.active ? "#F4F4F4" : "#FF9493",
            position: "absolute",
            left: -80
          }}
        >
          <Text style={{ color: "white" }}>Bước {props.step}</Text>
        </View>
        <View
          style={{
            width: 30,
            height: 30,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 50,
            backgroundColor: props.step > props.active ? "#F4F4F4" : "#299CDA",
            position: "absolute",
            top: 0,
            zIndex: 2
          }}
        >
          {props.active === props.step && (
            <Animated.View
              style={{
                position: "absolute",
                borderRadius: 50,
                width: 40,
                height: 40,
                borderWidth: animationWidthBorder,
                borderColor: "#299CDA",
                opacity: animationOpacityBorder
              }}
            />
          )}
          <View style={{ height: 15, width: 15, borderRadius: 50, backgroundColor: "white" }} />
        </View>
        <View
          style={{
            width: 2,
            backgroundColor: props.step > props.active ? "#F4F4F4" : "#299CDA",
            marginLeft: 14,
            zIndex: 1
          }}
        />
        <View>
          <View
            style={{
              marginLeft: 30,
              marginRight: 20,
              backgroundColor: props.step > props.active ? "#F4F4F4" : "#299CDA",
              borderRadius: 5,
              padding: 10
            }}
          >
            <Triangle
              width={width}
              height={35}
              width={30}
              color={props.step > props.active ? "#F4F4F4" : "#299CDA"}
              direction="left"
              style={{ position: "absolute", top: 22, left: -30 }}
            />
            <Text style={{ fontSize: 14, fontWeight: "bold", color: props.step > props.active ? "white" : "black" }}>
              {props.title}
            </Text>
            <Text style={{ color: props.step > props.active ? "white" : "black" }}>{props.content}</Text>
          </View>
          {props.totalStep !== props.step && <View style={{ height: 20, marginHorizontal: 30 }} />}
        </View>
      </View>
    </View>
  );
}

export default StepProcess;
