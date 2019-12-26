import React from "react";

import { Text, View, Image, StyleSheet } from "react-native";
const createEllipses = function createEllipses(str) {
  return str.length > 14 ? `${str.substring(0, 11)}...` : str;
};

const medicalbill = require("../../../../assets/medicalbill.png");

const CLSDetail = ({ index }) => (
  <View style={styles.padding10}>
    <Image style={styles.recentlyPlayedThumb} source={medicalbill} />
    <Text style={[styles.smallText, styles.strong]}>{createEllipses("Phiếu " + index)}</Text>
  </View>
);
const primaryTextColor = "#2f4f4f";

const styles = StyleSheet.create({
  padding10: {
    padding: 10
  },

  recentlyPlayedThumb: {
    width: 90,
    height: 80,
    borderRadius: 10
  },

  smallText: {
    color: primaryTextColor,
    fontSize: 12,
    alignSelf: "center",
    marginTop: 5
  },

  strong: {}
});

export default CLSDetail;
