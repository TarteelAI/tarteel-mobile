import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import I18n from '../i18n/i18n';
import { colourBackgroundGray } from '../styles/colours';

export default class ResultCount extends Component {
  render() {
    const countText = I18n.t(
      'resultCount',
      { count: I18n.formatNumberForLocale(this.props.count, I18n.currentLocale())}
    );

    return (
      <View style={styles.countContainer}>
        <Text style={styles.count}>{countText}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  countContainer: {
    backgroundColor: colourBackgroundGray,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 16,
    paddingRight: 16,
  },
  count: {
    color: 'white',
    fontSize: 18,
    textAlign: 'left',
  },
});
