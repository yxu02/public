import React from "react";
import { TextInput, View, Text } from "react-native";

const TextInputBox = ({
  label,
  onChangeText,
  value,
  placeholder,
  secureTextEntry
}) => {
  const { labelStyle, inputStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        autoCorrect={false}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={inputStyle}
      />
    </View>
  );
};
const styles = {
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1 //take 1/3 of the parent space
  },
  inputStyle: {
    color: "#000",
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2 //take 2/3 of the parent space
  },
  containerStyle: {
    height: 40,
    flexDirection: "row",
    flex: 1,
    alignItems: "center" //align item vertically to the center
  }
};

export { TextInputBox };
