import React, { useState } from "react";
import { Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { theme } from "../core/theme";
import Button from "../components/Button";

import { allergens_list, allergens_selection } from "../core/allergens";

function AllergeneButton({ idx, allergens }) {
  const [allergen, setAllergen] = useState(allergens[idx]);
  var style = {};
  if (allergen) style = styles.buttonOpen;
  else style = styles.buttonClose;
  return (
    <Pressable
      style={[styles.button, style]}
      onPress={() => {
        allergens[idx] = !allergens[idx];
        setAllergen(!allergen);
      }}
    >
      <Text style={[styles.textStyle, styles.textClose]}>
        {allergens_list[idx]}
      </Text>
    </Pressable>
  );
}

export default function ChooseAllergene({ allergens }) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <View style={styles.buttonView}>
        <Button mode="contained" onPress={() => setModalVisible(true)}>
          Liste des Allergènes
        </Button>
        {/* <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Liste des Alergènes</Text>
        </Pressable> */}
      </View>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.column}>
                <AllergeneButton idx="0" allergens={allergens} />
                <AllergeneButton idx="1" allergens={allergens} />
                <AllergeneButton idx="2" allergens={allergens} />
              </View>
              <View style={styles.column}>
                <AllergeneButton idx="3" allergens={allergens} />
                <AllergeneButton idx="4" allergens={allergens} />
                <AllergeneButton idx="5" allergens={allergens} />
              </View>
              <View style={styles.column}>
                <AllergeneButton idx="6" allergens={allergens} />
                <AllergeneButton idx="7" allergens={allergens} />
                <AllergeneButton idx="8" allergens={allergens} />
              </View>
              <View style={styles.column}>
                <AllergeneButton idx="9" allergens={allergens} />
                <AllergeneButton idx="10" allergens={allergens} />
                <AllergeneButton idx="11" allergens={allergens} />
              </View>
              <View style={styles.column}>
                <AllergeneButton idx="12" allergens={allergens} />
                <AllergeneButton idx="13" allergens={allergens} />
                <AllergeneButton idx="14" allergens={allergens} />
              </View>
              {/* <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.textStyle}>Accepter</Text>
              </Pressable> */}
              <Button mode="contained" onPress={() => setModalVisible(false)}>
                OK
              </Button>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  buttonView: {},
  column: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    margin: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    padding: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: 100,
  },
  buttonOpen: {
    backgroundColor: theme.colors.primary,
  },
  buttonClose: {
    backgroundColor: "white",
    borderWidth: 2,
  },
  textStyle: {
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
