import React, { Component } from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import { Actions } from 'react-native-router-flux';
import { CardSection } from "./common";

class ListItem extends Component {
  onRowPress = () =>{
    Actions.employeeEdit({employee: this.props.employee});  //obj added in here becomes props to the target route
  }

  render() {
    const { name } = this.props.employee;
    return (
      <TouchableWithoutFeedback onPress={this.onRowPress}>
        <View>
          <CardSection>
            <Text style={styles.titleStyle}>{name}</Text>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15,
    fontWeight: "200"
  }
};

export default ListItem;
