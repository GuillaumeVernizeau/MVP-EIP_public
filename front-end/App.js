import React from "react";
import { Provider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { theme } from "./src/core/theme";
import { StartScreen, ResetPasswordScreen } from "./src/screens";
import HomeScreen from "./src/screens/HomeScreen";
import MealInfoScreen from "./src/screens/MealInfoScreen";
import AddScreen from "./src/screens/AddScreen";
import AcceptScreen from "./src/screens/AcceptScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="StartScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="MealInfoScreen" component={MealInfoScreen} />
          <Stack.Screen name="AddScreen" component={AddScreen} />
          <Stack.Screen name="AcceptScreen" component={AcceptScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
