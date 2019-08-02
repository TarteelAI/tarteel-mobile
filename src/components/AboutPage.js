import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import I18n from '../i18n/i18n';

export default class AboutPage extends Component {
  render() {
    return (
      <ScrollView style={styles.page}>
        <Text style={styles.text}>{I18n.t('aboutParagraph')}</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    padding: 16,
  },
  text: {
    color: 'gray',
    fontSize: 16,
    textAlign: 'left',
  }
});
