import React from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import { Text, StyleSheet, View } from "react-native";
import axios from "axios";
import BackButton from "../components/BackButton";
import LogoWriting from "../components/LogoWritting";
import ProfileButton from "../components/ProfileIcon";
import { useState } from 'react';
import { theme } from "../core/theme";

export default function AcceptScreen({ route, navigation }) {
  const header = route.params.header;
  const code = route.params.code.code;
  return (
    <View style={styles.container}>
      <View style={styles.navContainer}>
        <BackButton goBack={navigation.goBack} />
        <LogoWriting />
        <ProfileButton />
      </View>
      <Header> {header} </Header>
      <Text style={styles.textTitle}>Voici votre code :</Text>
      <Text style={styles.textContent}>{code}</Text>
      <Button
        mode="contained"
        onPress={() => {
            navigation.navigate("HomeScreen");
        }}
      >
        MERCI !
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    position: "fixed",
    alignItems: "center",
    //backgroundColor: "black",
    top: 0,
    zIndex: 100,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    width: "100%",
    justifyContent: "space-evenly",
    height: 60,
  },
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
  textTitle: {
    zIndex: 99,
    fontSize: 21,
    textAlign: "left",
    color: theme.colors.secondary,
    fontWeight: "bold",
    marginBottom: 5,
  },
  textContent: {
    fontFamily: "Aloja-light",
    fontSize: 18,
    color: theme.colors.secondary,
    margingBottom: 5,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
  },
});