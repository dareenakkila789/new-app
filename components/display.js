import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TextInput,
  Button,
} from "react-native";
import * as firebase from "firebase";
import "firebase/auth";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import { AuthContext } from "../Auth";

export default class display extends Component {
  state = {
    Myquestions: null,
    questions: null,
    quistion: "",
    answer: "",
  };
  static contextType = AuthContext;
  handleChange = (e) => {
    let key = e.target.name;

    this.setState({
      [key]: e.target.value,
    });
  };
  addQuest = () => {
    var user = firebase.auth().currentUser;
    var uid;

    if (user != null) {
      uid = user.uid;
    }
    const db = firebase.firestore();
    firebase.auth();
    db.collection("users")
      .doc(uid)
      .collection("MyQuistions")
      .add({
        question: this.state.question,
        answer: this.state.answer,
      });
    db.collection("users")
      .doc(uid)
      .collection("MyQuistions")
      // db.collection("MyQuestions")
      .get()
      .then((snapshot) => {
        const Myquestions = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          Myquestions.push(data);
        });
        this.setState({ Myquestions: Myquestions });
      });
  };

  componentDidMount() {
    const db = firebase.firestore();
    db.collection("questions-answers")
      .get()
      .then((snapshot) => {
        const questions = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          questions.push(data);
        });
        this.setState({ questions: questions });
      })
      .catch((error) => console.log(error));
    var user = firebase.auth().currentUser;
    var uid;

    if (user != null) {
      uid = user.uid;
    }
    db.collection("users")
      .doc(uid)
      .collection("MyQuistions")
      // db.collection("MyQuestions")
      .get()
      .then((snapshot) => {
        const Myquestions = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          Myquestions.push(data);
        });
        this.setState({ Myquestions: Myquestions });
      });
  }

  render() {
    var user = firebase.auth().currentUser;

    if (user) {
      console.log(user);
    }
    let { question, answer } = this.state;
    return (
      <View>
        <MuiThemeProvider>
          <View>
            <Text style={styles.style7}>
              You can add some questions to revise!
            </Text>

            <TextInput
              defaultValue={question}
              onChange={this.handleChange}
              type="text"
              name="quistion"
              placeholder={"Enter your question"}
              style={styles.input}
            />
            <TextInput
              defaultValue={answer}
              onChange={this.handleChange}
              type="text"
              name="answer"
              placeholder={"Enter your answer"}
              style={styles.input}
            />
            <Button
              style={{
                padding: 300,
                margin: 100,
                width: 70,
                height: 50,
                alignItems: "center",
              }}
              onPress={this.addQuest}
              title="add"
              color="#0000ff"
            />

            <Text style={styles.style7}>All the questions!</Text>
            {this.state.questions &&
              this.state.questions.map((questions) => {
                return (
                  <View>
                    <Text style={styles.paragraph}>{questions.questions}</Text>
                    <FlatList
                      contentContainerStyle={styles.styleli}
                      numColumns={1}
                      //   keyExtractor={(item) => item.id}
                      //   data={this.state.questions}
                      renderItem={() => (
                        <View>
                          <Text style={styles.paragraph}>
                            {questions.correctAnswer}
                          </Text>
                        </View>
                      )}
                    />
                  </View>
                );
              })}
            <Text style={styles.style7}>Your questions!</Text>
            {this.state.Myquestions &&
              this.state.Myquestions.map((Myquestions) => {
                return (
                  <View>
                    <Text style={styles.paragraph}>{Myquestions.question}</Text>
                    <FlatList
                      contentContainerStyle={styles.styleli}
                      numColumns={1}
                      //   keyExtractor={(item) => item.id}
                      //   data={this.state.questions}
                      renderItem={() => (
                        <View>
                          <Text style={styles.paragraph}>
                            {Myquestions.answer}
                          </Text>
                        </View>
                      )}
                    />
                  </View>
                );
              })}
          </View>
        </MuiThemeProvider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  style7: {
    color: "#245",
    // fontFamily: "Comic Sans MS",
  },
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

  paragraph: {
    fontSize: 20,
    padding: 10,
    textAlign: "left",
    color: "#000",
  },
  styleli: {
    margin: 5,
    flex: 1,
  },
});
