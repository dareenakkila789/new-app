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
  TouchableWithoutFeedback,
} from "react-native";
import { SegmentedControls } from "react-native-radio-buttons";
import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

export default class signUp extends React.Component {
  state = {
    email: "",
    username: "",
    password: "",
    options: ["student", "teacher"],
    selectedOption: "",
  };
  handleChange = (e) => {
    let key = e.target.name;
    this.setState({
      [key]: e.target.value,
    });
  };

  signUp = () => {
    const db = firebase.firestore();
    const { email, username, type, password, selectedOption } = this.state;
    firebase.auth().createUserWithEmailAndPassword(email, password);
    let user = firebase.auth().currentUser;
    db.collection("users")
      .doc(user.uid)
      .set({
        Email: email,
        Username: username,
        type: selectedOption,
      })

      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      })
      .then(console.log("mission completed"));
  };
  onChangeText = (key, val) => {
    this.setState({ [key]: val });
  };

  checktype = () => {
    let { selectedOption } = this.state;
    console.log(selectedOption);
    if (selectedOption === "student") {
      this.props.navigation.navigate("choose");
    } else {
      this.props.navigation.navigate("mainpage");
    }
    console.log("done checking!");
  };
  compiledFun = () => {
    this.signUp();
    this.checktype();
  };
  render() {
    setSelectedOption = (selectedOption) => {
      this.setState({
        selectedOption,
      });
    };

    function renderOption(option, selected, onSelect, index) {
      const style = selected ? { fontWeight: "bold" } : {};

      return (
        <TouchableWithoutFeedback onPress={onSelect} key={index}>
          <Text style={style}>{option}</Text>
        </TouchableWithoutFeedback>
      );
    }
    function renderContainer(optionNodes) {
      return <View>{optionNodes}</View>;
    }
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

        <View style={{ margin: 20 }}>
          <SegmentedControls
            options={this.state.options}
            onSelection={setSelectedOption.bind(this)}
            selectedOption={this.state.selectedOption}
          />
          <Text>
            Selected type: {this.state.selectedOption || "choose your type"}
          </Text>
        </View>
        <View style={styles.login}>
          <View>
            <TouchableOpacity style={styles.button} onPress={this.compiledFun}>
              <Text>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  login: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: "#E9446A",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    width: 200,
  },
  input: {
    width: 345,
    height: 50,
    backgroundColor: "grey",
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
