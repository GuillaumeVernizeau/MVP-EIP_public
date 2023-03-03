import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function PlusButton({ navigation }) {
  return <Image style={styles.image} source={require("../assets/Plus.png")} />;
}

const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 67,
    left: 100,
    //backgroundColor: "red",
  },
});
