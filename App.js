import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
} from "react-navigation";
import "react-native-gesture-handler";
import React, { Component } from "react";

import Login from "./components/login";
import notification from "./components/notification";
import signUp from "./components/signUp";
import Score from "./components/score";
import * as firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8yRaA5V-hrWjm7sl-8zSF-DJ2ZkE2OFU",
  authDomain: "exchange-experiences.firebaseapp.com",
  databaseURL: "https://exchange-experiences.firebaseio.com",
  projectId: "exchange-experiences",
  storageBucket: "exchange-experiences.appspot.com",
  messagingSenderId: "318757269452",
  appId: "1:318757269452:web:e42dfac2463d95448db769",
  measurementId: "G-4P8152PSVS",
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const AuthStack = createStackNavigator({
  Login: Login,

  signUp: signUp,
});
// const mainStack = createStackNavigator({
//   signUp: signUp,
//   Login: Login,
//   notification: notification,
// });

const Tabs = createBottomTabNavigator({
  Login: AuthStack,
});

const App = createAppContainer(Tabs);
export default App;
