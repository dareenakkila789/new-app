import React from "react";
import RadioGroup, { Radio } from "react-native-radio-input";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
  Button,
  Picker,
} from "react-native";
import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

export default class signUp extends React.Component {
  state = {
    email: "",
    username: "",
    password: "",
    student_checked: false,
    teacher_checked: false,
  };
  handleChange = (e) => {
    let key = e.target.name;
    this.setState({
      [key]: e.target.value,
    });
  };
  addUser = (value) => {
    console.log(value);
    const { email, username, type, password } = this.state;

    const db = firebase.firestore();

    console.log(email, password, "email,password");

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        let user = firebase.auth().currentUser;
        db.collection("users")
          .doc(user.uid)
          .set({
            Email: email,
            Username: username,
            type: value,
          })
          .then((docRef) => {
            if (type === "student") {
              this.props.navigation.navigate("/notification");
            } else {
              this.props.navigation.navigate("/notification");
            }
          })
          .catch(function(error) {
            console.error(error);
          });
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;

        console.log(error);

        // ...
      });
  };
  onChangeText = (key, val) => {
    this.setState({ [key]: val });
  };
  moving = () => {
    this.props.navigation.navigate("/Login");
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>score page</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    width: 345,
    height: 50,
    backgroundColor: "red",
    margin: 5,

    padding: 8,
    borderColor: "white",
    borderWidth: 1,

    color: "white",
    borderRadius: 14,
    fontSize: 18,
    fontWeight: "500",
  },
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  login: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
