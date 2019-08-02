import React, { Component } from 'react';
import { StyleSheet, View, Text, I18nManager } from 'react-native';
import { colourPrimary } from '../styles/colours';

export default class ResultHeader extends Component {
  render() {
    return (
      <View style={styles.queryContainer}>
        <Text style={styles.query}>{this.props.query}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  queryContainer: {
    backgroundColor: colourPrimary,
    paddingTop: 4,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,

  },
  query: {
    color: 'white',
    fontSize: 24,
    textAlign: I18nManager.isRTL ? 'left' : 'right',
  },
});
