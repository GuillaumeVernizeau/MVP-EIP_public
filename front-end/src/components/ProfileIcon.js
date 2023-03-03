import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

export default function ProfileButton() {
  return (
    <TouchableOpacity
      onPress={() => console.log("Profile")}
      style={styles.container}
    >
      <Image
        style={styles.image}
        source={require("../assets/iconPerson.png")}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  image: {
    width: 24,
    height: 24,
  },
});
