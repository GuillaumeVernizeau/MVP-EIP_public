import { React, useEffect } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import { Picker, TextInput, StyleSheet, View } from "react-native";
import axios from "axios";
import BackButton from "../components/BackButton";
import LogoWriting from "../components/LogoWritting";
import ProfileButton from "../components/ProfileIcon";
import { useState } from "react";
import ChooseAllergeneModal from "../components/ChooseAllergeneModal";
import { tradAllergens } from "../core/allergens";

export default function AddScreen({ navigation }) {
  const [mealName, setText] = useState(null);
  var [allergens, setAllergens] = useState(Array(15).fill(false));
  const [location, setTextLoc] = useState("");
  const [desc, setTextDesc] = useState("");
  const [selectedValue, setSelectedValue] = useState("Choisie le frigo");
  const [fridges, setFridge] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target);
    console.log(event.target.files[0]);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/fridges")
      .then((data) => {
        var fridges = data.data.map((item) => {
          console.log("myValue: " + item._id);
          return <Picker.Item label={item.position} value={item._id} />;
        });
        setFridge(fridges);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.navContainer}>
        <BackButton goBack={navigation.goBack} />
        <LogoWriting />
        <ProfileButton />
      </View>
      <Header>ADD A MEAL</Header>
      <TextInput
        label="Name"
        onChangeText={(newMealName) => setText(newMealName)}
        placeholderTextColor={"grey"}
        placeholder="Nom du plat"
        style={styles.input}
        underlineColor="transparent"
        mode="outlined"
      />
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue) => {
          setSelectedValue(itemValue);
        }}
        style={styles.picker}
      >
        <Picker.Item label="Choisissez le frigo" />
        {fridges}
      </Picker>
      <TextInput
        label="Desc"
        onChangeText={(newDesc) => setTextDesc(newDesc)}
        placeholderTextColor={"grey"}
        multiline={true}
        placeholder="Description du plat"
        style={styles.multilineinput}
        underlineColor="transparent"
        mode="outlined"
      />
      <ChooseAllergeneModal allergens={allergens} />
      <form
        style={{
          // color: "white",
          // display: "flex",
          // justifyContent: "center",
          // alignItems: "center",
          paddingBottom: 250,
        }}
      >
        <label
          for="image_input"
          style={{
            backgroundColor: "#DB4941",
            paddingRight: 149,
            paddingLeft: 149,
            paddingTop: 14,
            paddingBottom: 14,
            color: "white",
            borderRadius: 8,
            fontFamily:
              "Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontWeight: "bold",
          }}
        >
          Photo
        </label>
        <input
          id="image_input"
          style={{ display: "none" }}
          type="file"
          onChange={handleFileSelect}
        />
      </form>
      <Button
        mode="contained"
        onPress={() => {
          if (selectedFile == null || mealName == null) return;
          const formData = new FormData();
          formData.append("name", mealName);
          formData.append("desc", desc);
          console.log(selectedValue);
          formData.append("fridge_id", selectedValue);
          formData.append("allergens", tradAllergens(allergens));
          formData.append("thumbnail", selectedFile);
          try {
            const response = axios
              .post("http://localhost:8080/dishes/", formData, {
                headers: { "Content-Type": "multipart/form-data" },
              })
              .then((data) => {
                console.log(response);
                navigation.navigate("AcceptScreen", {
                  header: "UN CASIER VOUS ATTENDS !",
                  code: data.data,
                });
              });
          } catch (error) {
            console.log(error);
          }
        }}
      >
        Ajouter un plat
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "95%",
    height: 50,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 16,
    margin: 12,
  },
  picker: {
    width: "95%",
    height: 50,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 16,
    margin: 12,
  },
  multilineinput: {
    width: "95%",
    height: 120,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 16,
    margin: 12,
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
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    width: "100%",
    //maxWidth: 340,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
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
