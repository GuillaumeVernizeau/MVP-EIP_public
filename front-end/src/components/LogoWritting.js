import React from "react";
import { Text, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { theme } from "../core/theme";

export default function LogoWriting() {
  const [loaded] = useFonts({
    Montserrat: require("../assets/Aloja-Light.otf"),
  });
  return <Text style={styles.sText}>SouPourTous</Text>;
}

const styles = StyleSheet.create({
  sText: {
    padding: 25,
    fontFamily: "Aloja-light",
    fontWeight: "bold",
    fontSize: 20,
    color: theme.colors.primary,
  },
});
