import React from "react";
import { Text, TouchableOpacity } from "react-native";

const Button = ({onPress, text}) => {
  const {buttonStyle, textStyle} = styles;
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles={
  textStyle:{
    alignSelf: 'center',  //text will be at middle of the button
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle:{
    flex:1, //weight = 1
    alignSelf: 'stretch',  //stretch to the entire container
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5
  }
};

export {Button};
