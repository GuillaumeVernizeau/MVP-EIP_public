import React from "react";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import { StyleSheet, View, Text } from "react-native";

export default function StartScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Logo />
      <Header>CONNEXION</Header>
      <TextInput label="Email" />
      <TextInput label="Password" />
      <Text style={styles.forgotPassword}> Mot de passe oublie ? </Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("HomeScreen")}
      >
        CONNEXION
      </Button>
      <Button mode="outlined" onPress={() => console.log("register")}>
        S'INSCRIRE
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    width: "100%",
    //maxWidth: 340,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  forgotPassword: {
    //width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  forgot: {
    fontSize: 13,
    color: "black",
  },
});
