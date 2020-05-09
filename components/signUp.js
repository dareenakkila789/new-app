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
    this.props.navigation.navigate("Score");
  };
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          autoCapitalize="none"
          placeholderTextColor="white"
          name="username"
          Value="username"
          onChangeText={(val) => this.onChangeText("username", val)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          placeholderTextColor="white"
          name="email"
          Value="email"
          onChangeText={(val) => this.onChangeText("email", val)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          autoCapitalize="none"
          name="password"
          Value="password"
          placeholderTextColor="white"
          onChangeText={(val) => this.onChangeText("password", val)}
        />

        <RadioGroup getChecked={this.addUser}>
          <Radio
            defaultValue="op1"
            value="teacher"
            iconName={"lens"}
            name="value"
            label={"Teacher"}
            value={"teacher"}
            onChange={this.handleChange}
          />
          <Radio
            onChange={this.handleChange}
            defaultValue="op1"
            value="student"
            iconName={"lens"}
            name="value"
            label={"Student"}
          />
        </RadioGroup>
        <Button
          style={{
            padding: 300,
            margin: 100,
            width: 70,
            height: 50,
            alignItems: "center",
          }}
          onPress={this.addUser}
          title="SignUp"
          color="#0000ff"
        />
        <Button
          style={{
            padding: 300,
            margin: 100,
            width: 70,
            height: 50,
            alignItems: "center",
          }}
          onPress={this.moving}
          title="iibvu"
          color="#0000ff"
        />
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
