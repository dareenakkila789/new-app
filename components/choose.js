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
export default class choose extends React.Component {
  static navigationOptions = {
    title: "choose",
  };

  quiz = () => {
    this.props.navigation.navigate("quiz");
  };
  revise = () => {
    this.props.navigation.navigate("display");
  };
  render() {
    return (
      <View>
        <Text>this is choose page!</Text>
        <Button
          style={{
            padding: 300,
            margin: 100,
            width: 70,
            height: 50,
            alignItems: "center",
          }}
          onPress={this.quiz}
          title="quiz"
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
          onPress={this.revise}
          title="revise"
          color="#0000ff"
        />
      </View>
    );
  }
}
