import React from "react";
import StyleSheet from "react-native";
import LogoWriting from "./LogoWritting";
import ProfileButton from "./ProfileIcon";
import BackButton from "./BackButton";

export default function NavTop({ navigation }) {
  return (
    <View style={styles.navContainer}>
      <BackButton goBack={navigation.goBack} />
      <LogoWriting />
      <ProfileButton />
    </View>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    position: "fixed",
    alignItems: "center",
    top: 0,
    zIndex: 100,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    width: "100%",
    justifyContent: "space-evenly",
    height: 60,
  },
});
