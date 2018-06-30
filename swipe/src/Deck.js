import React, { Component } from "react";
import {
  View,
  Animated,
  PanResponder,
  Dimensions,
  Text,
  LayoutAnimation,
  UIManager
} from "react-native";
import { Card, Button } from "react-native-elements";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;
const SWIPE_OUT_DURATION = 250;

export default class Deck extends Component {
  //defaultprops is a good place to give default props
  //(when parent component doesn't define and pass the props down to the child here)
  static defaultProps = {
    onSwipeLeft: () => {},
    onSwipeRight: () => {}
  };

  constructor(props) {
    super(props);
    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      //dx, dy are the params tracking distances user fingers moved
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          this.forceSwipe("right");
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          this.forceSwipe("left");
        } else {
          this.resetPosition();
        }
      }
    });
    this.panResponder = panResponder;
    this.position = position;
    this.state = { itemIndex: 0 };
  }

  renderCards = () => {
    if (this.state.itemIndex >= this.props.data.length) {
      return this.renderNoMoreCards();
    }
    return this.props.data
      .map((item, index) => {
        if (index < this.state.itemIndex) return null;
        if (index === this.state.itemIndex) {
          return (
            <Animated.View
              key={item.id}
              //use array to add >1 styles. Add rotation controller
              style={[this.getCardStyle(), styles.cardStyle]}
              //many panResponder handlers as gesture goes
              {...this.panResponder.panHandlers}
            >
              {this.renderCard(item)}
            </Animated.View>
          );
        }
        return (
          //to prevent re-render, use animated.view instead of just view
          <Animated.View
            key={item.id}
            style={[
              styles.cardStyle,
              {
                top: 5 * (index - this.state.itemIndex),
                left: 5 * (index - this.state.itemIndex)
              }
            ]}
          >
            {this.renderCard(item)}
          </Animated.View>
        );
      })
      .reverse();
  };
  render() {
    return <Animated.View>{this.renderCards()}</Animated.View>;
  }

  getCardStyle = () => {
    const { position } = this;
    //interpolate x movement to rotate deg
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
      outputRange: ["-30deg", "0deg", "30deg"]
    });
    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    };
  };

  resetPosition = () => {
    Animated.spring(this.position, { toValue: { x: 0, y: 0 } }).start();
  };

  //force animation to all the way right or left off screen
  forceSwipe = direction => {
    if (direction === "right") {
      Animated.timing(this.position, {
        toValue: { x: SCREEN_WIDTH * 2, y: 0 },
        duration: SWIPE_OUT_DURATION
      })
        //here to add callback when animation completed
        .start(() => this.onSwipeComplete(direction));
    }
    if (direction === "left") {
      Animated.timing(this.position, {
        toValue: { x: -SCREEN_WIDTH * 2, y: 0 },
        duration: SWIPE_OUT_DURATION
      }).start(() => this.onSwipeComplete(direction));
    }
  };

  onSwipeComplete = direction => {
    const { onSwipeLeft, onSwipeRight, data } = this.props;
    const item = data[this.state.itemIndex];
    direction === "right" ? onSwipeRight(item) : onSwipeLeft(item);
    //reset xy position to zero for next animation
    this.position.setValue({ x: 0, y: 0 });
    //increase index by 1 to point to next list item
    this.setState({ itemIndex: this.state.itemIndex + 1 });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({ itemIndex: 0 });
    }
  }
  componentWillUpdate() {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }

  renderCard = item => {
    return (
      <Card title={item.text} image={{ uri: item.uri }}>
        <Text style={{ marginBottom: 10 }}>{item.uri}</Text>
        <Button
          icon={{ name: "code" }}
          backgroundColor="#03A9F4"
          title="View Now!"
        />
      </Card>
    );
  };

  renderNoMoreCards = () => {
    return (
      <View style={styles.cardStyle}>
        <Card title="all done!">
          <Text>No more content!</Text>
          <Button
            backgroundColor="#03A9F4"
            title="Check again!"
            onPress={this.reloadContent}
          />
        </Card>
      </View>

    );
  };

  reloadContent = () => {
    this.setState({ itemIndex: 0 });
  };
}

const styles = {
  cardStyle: {
    //enforce style applies to absolute position (here they are 0,0)
    position: "absolute",
    marginTop: 20,
    width: SCREEN_WIDTH,
    elevation: 1
  }
};
