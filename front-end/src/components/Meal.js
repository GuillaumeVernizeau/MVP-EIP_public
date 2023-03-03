import React from "react";
import { Image, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { theme } from "../core/theme";

const imageUrl = "http://localhost:8080/thumbnail/6391f5cb6ba39f210326792e";

export function MealImage(props) {
  const im = `http://localhost:8080/thumbnail/${props.data_meal._id}`;
  console.log(im);
  console.log(props);
  return <Image source={{ uri: im }} style={image_styles.image} />;
}

const image_styles = StyleSheet.create({
  image: {
    resizeMode: "cover",
    width: "100%",
    resizeMode: "cover",
    height: 205,
    marginBottom: 8,
  },
});

export function MealName(props) {
  //console.log(props);
  return <Text style={name_styles.header} {...props} />;
}

const name_styles = StyleSheet.create({
  header: {
    fontSize: 18,
    textAlign: "left",
    color: theme.colors.secondary,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export function MealLoc(props) {
  //console.log(props);
  return <Text style={desc_styles.loc} {...props} />;
}

const desc_styles = StyleSheet.create({
  loc: {
    fontSize: 15,
    textAlign: "left",
    color: "grey",
    fontWeight: "bold",
    marginBottom: 20,
  },
});
