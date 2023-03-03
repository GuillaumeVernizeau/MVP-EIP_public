import React from "react";
import { Image, StyleSheet } from "react-native";

export default function Map() {
  return <Image source={require("../assets/map.png")} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    marginTop: 60,
    width: 390,
    height: 205,
    marginBottom: 20,
  },
});
