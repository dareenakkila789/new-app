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
export default class quiz extends React.Component {
  state = {
    options: ["Option 1", "Option 2"],
    selectedOption: "",
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
      <View style={{ margin: 20 }}>
        <SegmentedControls
          options={this.state.options}
          onSelection={setSelectedOption.bind(this)}
          selectedOption={this.state.selectedOption}
        />
        <Text>Selected option: {this.state.selectedOption || "none"}</Text>
      </View>
    );
  }
}
