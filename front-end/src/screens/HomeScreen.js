import { React, useState, useEffect } from "react";
import { TouchableOpacity, StyleSheet, View, Alert } from "react-native";
import axios from "axios";
import { Text } from "react-native-paper";
import Logo from "../components/Logo";
import BackButton from "../components/BackButton";
import Map from "../components/Map";
import LogoWriting from "../components/LogoWritting";
import ProfileButton from "../components/ProfileIcon";
import PlusButton from "../components/PlusButton";
import { MealName, MealImage, MealLoc } from "../components/Meal";
import { theme } from "../core/theme";
import { getElapseTime } from "../utils/getTime";
import ChooseAllergeneModal from "../components/ChooseAllergeneModal";
import { allergens_selection, tradAllergens } from "../core/allergens";

export default function HomeScreen({ navigation }) {
  const [element, setElement] = useState(<Logo />);
  const [data, setData] = useState('');

  useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      axios.get(
        `http://localhost:8080/dishes?filters=${tradAllergens(
          allergens_selection
        )}`
      ).then((data) => {
        //data.data = data.data.reverse();
        setData(data);
        var infos = data.data.map((meal) => {
          return (
            <>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("MealInfoScreen", { meal: meal })
                }
                style={styles.mealImage}
              >
                <MealImage data_meal={meal}>{meal._id}</MealImage>
              </TouchableOpacity>
              <View style={styles.column}>
                <View style={styles.row}>
                  <MealName key={meal._id}>{meal.name}</MealName>
                  <MealLoc key={meal._id}>{meal.fridge_loc}</MealLoc>
                </View>
                <Text style={styles.time}>{getElapseTime(meal.time)}</Text>
              </View>
            </>
          );
        });
        setElement(infos);
      })
        .catch((err) => {
          console.log(err);
        });
    });
    return focusHandler;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.navContainer}>
        <BackButton goBack={navigation.goBack} />
        <LogoWriting />
        <ProfileButton />
      </View>
      <Map />
      <ChooseAllergeneModal allergens={allergens_selection} />
      {element}
      <View style={styles.botNavContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("AddScreen")}>
          <PlusButton />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mealImage: {
    width: 390,
    height: 205,
    marginBottom: 8,
  },
  time: {
    marginTop: 10,
    fontSize: 25,
    textAlign: "right",
    color: "black",
    fontWeight: "bold",
  },
  column: {
    display: "flex",
    flexDirection: "row",
    alignItems: "",
    width: "100%",
  },
  row: {
    alignItems: "",
    width: "85%",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    width: "100%",
    //maxWidth: 340,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "right",
  },
  botNavContainer: {
    position: "fixed",
    alignItems: "center",
    //backgroundColor: "black",
    top: 725,
    zIndex: 1000,
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
});
