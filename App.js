import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";

import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAM15Kl7QRA-B-zqYeAPE321pmWV6uTdR0",
  authDomain: "instagramclone-5ba85.firebaseapp.com",
  projectId: "instagramclone-5ba85",
  storageBucket: "instagramclone-5ba85.appspot.com",
  messagingSenderId: "696986772742",
  appId: "1:696986772742:web:1ef21efe4fb26162f82a87",
  measurementId: "G-S4Y9VH1V4E",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

import LandingScreen from "./components/auth/Landing";
import LandingRegister from "./components/auth/Register";

const Stack = createStackNavigator();

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        });
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        });
      }
    });
  }

  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text>Loading</Text>
        </View>
      );
    }

    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen
              name="Landing"
              component={LandingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Register" component={LandingRegister} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text>User is logged in!</Text>
      </View>
    );
  }
}

export default App;
