import React from "react";
import { Text, View, Modal } from "react-native";
import { CardSection } from "./CardSection";
import { Button } from "./Button";

const ModalConfirm = ({ children, visible, onAccept, onDecline }) => {
  const { cardSectionStyle, textStyle, containerStyle } = styles;
  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={() => {}}
    >
      <View style={containerStyle}>
        <CardSection style={cardSectionStyle}>
          <Text style={textStyle}>{children}</Text>
        </CardSection>
        <CardSection>
          <Button onPress={onAccept} text="Yes" />
          <Button onPress={onDecline} text="No" />
        </CardSection>
      </View>
    </Modal>
  );
};

const styles = {
  cardSectionStyle: {
    justifyContent: "center" //default is 'start'
  },
  textStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: "center",
    lineHeight: 40
  },
  containerStyle: {
    backgroundColor: "rgba(0,0,0,0.7)",
    position: "relative",
    flex: 1,
    justifyContent: "center"
  }
};

export { ModalConfirm };
