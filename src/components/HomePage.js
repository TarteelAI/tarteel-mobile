import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Toast from 'react-native-root-toast';
import I18n from '../i18n/i18n';
import Logo from './Logo';
import Record from './Record';

export default class HomePage extends Component {
  showResults = (result) => {
    if (result.matches.length === 0) {
      Toast.show(I18n.t('noMatches'));
    } else {
      const navigateAction = NavigationActions.navigate({
        routeName: 'Results',
        params: {
          result,
        },
      });

      this.props.navigation.dispatch(navigateAction);
    }
  }

  render() {
    return (
      <View style={styles.pageContainer}>
        <Logo />
        <Text style={styles.title}>{I18n.t('appName')}</Text>
        <Record showResults={this.showResults} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageContainer: {
    alignItems: 'center',
    flex: 1,
  },
  title: {
    color: 'gray',
    fontSize: 26,
    marginBottom: 30,
    marginTop: 4,
  },
});
