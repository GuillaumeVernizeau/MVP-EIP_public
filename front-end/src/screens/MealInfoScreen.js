import React from "react";
import { StyleSheet, View } from "react-native";
import axios from "axios";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
import LogoWriting from "../components/LogoWritting";
import ProfileButton from "../components/ProfileIcon";
import { Text } from "react-native-paper";
import Button from "../components/Button";
import { MealName, MealImage } from "../components/Meal";
import { getElapseTime } from "../utils/getTime";
import { allergens_list } from "../core/allergens";

export default function MealInfoScreen({ route, navigation }) {
  const meal = route.params.meal;
  return (
    <View style={styles.container}>
      <View style={styles.navContainer}>
        <BackButton goBack={navigation.goBack} />
        <LogoWriting />
        <ProfileButton />
      </View>
      <View style={styles.image}>
        <MealImage data_meal={meal}>{meal._id}</MealImage>
        {/* <MealName key={meal._id}>{meal.name}</MealName> */}
      </View>
      <View style={styles.datas}>
        <Text style={styles.textTitle}>Name: </Text>
        <Text style={styles.textContent}>{meal.name}</Text>
        <Text style={styles.textTitle}>Description: </Text>
        <Text style={styles.textContent}>{meal.desc}</Text>
        <Text style={styles.textTitle}>Location: </Text>
        <Text style={styles.textContent}>{meal.fridge_loc}</Text>
        <Text style={styles.textTitle}>Time: </Text>
        <Text style={styles.textContent}>{getElapseTime(meal.time)}</Text>
        <Text style={styles.textTitle}>Allergens: </Text>
        {meal.allergens.map((item) => (
          <Text style={styles.textContent}>{allergens_list[item - 1]}</Text>
        ))}
      </View>
      <View style={styles.acceptButton}>
        <Button
          mode="contained"
          onPress={() => {
            axios
              .put("http://localhost:8080/dishes/" + meal._id + "/collect")
              .then((data) => {
                axios.delete("http://localhost:8080/dishes/" + meal._id).then(() =>
                  navigation.navigate("AcceptScreen", { header: "VOTRE PLAT EST SERVI !", code: data.data })
                )
              });
          }}
        >
          J'ACCEPTE
        </Button>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    width: "100%",
    height: "100%",
    //maxWidth: 340,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    position: "fixed",
    zindex: 99,
    top: 60,
    width: 390,
    height: 205,
    marginBottom: 20,
    alignItems: "center",
  },
  datas: {
    backgroundColor: "white",
    marginTop: 10,
    padding: 20,
    width: "100%",
    //maxWidth: 340,
    alignSelf: "center",
    justifyContent: "center",
  },
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
  textTitle: {
    zIndex: 99,
    fontSize: 21,
    textAlign: "left",
    color: theme.colors.secondary,
    fontWeight: "bold",
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
  },
  textContent: {
    fontFamily: "Aloja-light",
    fontSize: 18,
    color: theme.colors.secondary,
    margingBottom: 5,
    paddingBottom: 5,
  },
  acceptButton: {
    position: "fixed",
    backgroundColor: "white",
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    bottom: 20,
  },
});
