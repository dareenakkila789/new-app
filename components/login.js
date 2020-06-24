import React from "react";
import {
  Alert,
  Button,
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
  NavLink,
} from "react-native";
import signUp from "./signUp";
import { AuthContext } from "../Auth";
import * as firebase from "firebase";

export default class login extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    email: "",
    password: "",
    type: "",
    username: "",
  };
  static contextType = AuthContext;

  handleChange = (e) => {
    let key = e.target.name;

    this.setState({
      [key]: e.target.value,
    });
  };

  signin = () => {
    const { email, password } = this.state;
    const db = firebase.firestore();
    console.log(this.state.email);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        db.collection("users")
          .doc(res.user.uid)
          .get()
          .then((doc) => {
            console.log("I am in");
            // const data = doc.data();
            console.log(doc.data().type);
            const UserType = doc.data().type;

            console.log("the user type is : ", UserType);
            // console.log(UserId.type);
            if (UserType === "student") {
              this.props.navigation.navigate("choose");
            } else {
              this.props.navigation.navigate("mainpage");
            }
          });
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      })
      .then(console.log("mission completed!"));
  };

  moving = () => {
    this.props.navigation.navigate("signUp");
  };
  render() {
    var user = firebase.auth().currentUser;

    if (user) {
      console.log(user);
    }
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          style={{ margin: 40, width: 100, height: 100 }}
          source={require("../components/bell.png")}
        />

        <TextInput
          defaultValue={this.state.email}
          // onChangeText={(text) => this.setState({ email: text })}
          placeholderTextColor={"white"}
          onChange={this.handleChange}
          type="email"
          name="email"
          placeholder={"Email"}
          style={styles.input}
        />
        <TextInput
          defaultValue={this.state.password}
          // onChangeText={(text) => this.setState({ password: text })}
          placeholderTextColor={"white"}
          placeholder={"Password"}
          secureTextEntry={true}
          type="passowrd"
          name="password"
          style={styles.input}
        />
        <View style={styles.login}>
          <View>
            <TouchableOpacity style={styles.button} onPress={this.signin}>
              <Text>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <TouchableOpacity onPress={this.moving}>
            <Text style={{ color: "black", fontSize: 25, marginTop: 5 }}>
              You don't have an account?
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: "grey",
    margin: 10,

    padding: 4,
    borderColor: "white",
    borderWidth: 1,

    color: "white",
    borderRadius: 14,
    fontSize: 18,
    fontWeight: "500",
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
  vie: {
    justifyContent: "center",
    alignItems: "center",
  },
});
