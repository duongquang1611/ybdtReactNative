import React from "react";
import { StyleSheet, View } from "react-native";

const Separator = () => (
  <View style={styles.container}>
    <View style={styles.separatorOffset} />
    <View style={styles.separator} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
  },
  separatorOffset: {
    flex: 2,
    flexDirection: "row"
  },
  separator: {
    flex: 8,
    flexDirection: "row",
    borderColor: "#EDEDED",
    borderWidth: 0.8
  }
});

export default Separator;
