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
import choose from "./components/choose";
import quiz from "./components/quiz";
import display from "./components/display";
import mainpage from "./components/mainPage";

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

const chooseStack = createStackNavigator({
  choose: choose,
  quiz: quiz,
  display: display,
});
const registerStack = createStackNavigator({
  signUp: signUp,
  choose: chooseStack,
  mainpage: mainpage,
});
const AuthStack = createStackNavigator({
  Login: Login,
  choose: chooseStack,
  signUp: registerStack,
  mainpage: mainpage,
});
// const mainStack = createStackNavigator({
//   signUp: signUp,
//   Login: Login,
//   notification: notification,
// });

const Tabs = createBottomTabNavigator({
  Login: AuthStack,
  quiz: quiz,
});

const App = createAppContainer(Tabs);
export default App;
