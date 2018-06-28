import React from "react";
import { View } from "react-native";

const Card = props => {
  const { containerStyle } = styles;
  return <View style={containerStyle}>{props.children}</View>;
};

const styles = {
  containerStyle: {
    borderWidth: 1,
    borderRadius: 2, //border corner rounding
    borderColor: "#ddd",
    borderBottomWidth: 0, //leave no spacing to the next content below
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 }, //create shadow on vertical
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10
  }
};

export { Card };
