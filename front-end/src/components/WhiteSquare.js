import React from "react";
import { View, StyleSheet } from "react-native";

export default function WhiteSquare() {
  return (
    <View style={styles.container}>
      <View style={styles.rec}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "White",
    alignItems: "center",
    justifyContent: "center",
  },
  rec: {
    width: 390,
    height: 205,
  },
});
