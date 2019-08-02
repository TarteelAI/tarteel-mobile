import React, { Component } from 'react';
import { StyleSheet, Image, TouchableHighlight } from 'react-native';

export default class HeaderRight extends Component {
  render() {
    return (
      <TouchableHighlight
        onPress={() => this.props.navigation.navigate('Settings', {onChangeTranslation: this.props.onChangeTranslation})}
        underlayColor="transparent"
      >
        <Image source={require("../assets/settings.png")} style={styles.image} />
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: 24,
    width: 24,
    marginRight: 4,
  },
});
