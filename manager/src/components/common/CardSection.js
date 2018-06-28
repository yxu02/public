import React from "react";
import { View } from "react-native";

const CardSection = props => {
  //can pass an array of styles to primitive react-native component where the later array item overwrite previous if not undefined
  return (
    <View style={[styles.containerStyle, props.style]}>{props.children}</View>
  );
};

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: "#fff",
    justifyContent: "flex-start", //start: upper-left, end: bottom-left
    flexDirection: "row",
    borderColor: "#ddd",
    position: "relative"
  }
};
export { CardSection };
