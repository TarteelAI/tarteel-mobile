import React, { Component } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { colourPrimary } from '../styles/colours';

export default class Logo extends Component {
  render() {
    return (
      <View style={styles.imageContainer}>
        <Image source={require("../assets/logo.png")} style={styles.image} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: colourPrimary,
    flex: 1,
    paddingTop: 20,
    paddingBottom: 40,
  },
  image: {
    height: 125,
    width: 120,
    margin: 4,
  },
});
