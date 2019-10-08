import React, { Component } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import I18n from './src/i18n/i18n';
import HeaderRight from './src/components/HeaderRight';
import HomePage from './src/components/HomePage';
import ResultPage from './src/components/ResultPage';
import SettingsPage from './src/components/SettingsPage';
import AboutPage from './src/components/AboutPage';
import ContactPage from './src/components/ContactPage';
import SettingsOptionSelectorPage from './src/components/SettingsOptionSelectorPage';
import ShareResultPage from './src/components/ShareResultPage';
import { colourPrimary, colourPrimaryDark } from './src/styles/colours';

const headerStyle = {
  backgroundColor: colourPrimary,
  borderBottomWidth: 0,
  // elevation: 0
  // shadowColor: 'transparent'
};

class App extends Component {
  async componentDidMount() {
    try {
      const language = await AsyncStorage.getItem('Settings:Language');
      if (language) {
        I18n.locale = language;
        this.forceUpdate();
      }
    } catch (error) {
      // Error retrieving data
      console.error('AsyncStorage not working right');
    }
  }

  render() {
    const AppNavigator = createStackNavigator({
      Home: {
        screen: HomePage,
        navigationOptions: ({ navigation }) => ({
          headerRight: <HeaderRight navigation={navigation} onChangeTranslation={() => {}} />,
          headerStyle,
          headerTintColor: 'white',
        }),
      },
      Results: {
        screen: ResultPage,
        navigationOptions: {
          headerStyle,
          headerTintColor: 'white',
        },
      },
      Settings: {
        screen: SettingsPage,
        navigationOptions: {
          headerTitle: I18n.t('settingsTitle'),
          headerStyle,
          headerTintColor: 'white',
        },
      },
      About: {
        screen: AboutPage,
        navigationOptions: {
          headerTitle: I18n.t('aboutTitle'),
          headerStyle,
          headerTintColor: 'white',
        },
      },
      Contact: {
        screen: ContactPage,
        navigationOptions: {
          headerTitle: I18n.t('contactTitle'),
          headerStyle,
          headerTintColor: 'white',
        },
      },
      SettingsOptionSelector: {
        screen: SettingsOptionSelectorPage,
        navigationOptions: ({ navigation }) => ({
          headerTitle: navigation.state.params.headerTitle,
          headerStyle,
          headerTintColor: 'white',
        }),
      },
      ShareResult: {
        screen: ShareResultPage,
        navigationOptions: {
          headerTitle: I18n.t('actionShare'),
          headerStyle,
          headerTintColor: 'white',
        },
      },
    },
    {
      cardStyle: {
        backgroundColor: '#eee',
      },
    });
    const AppContainer = createAppContainer(AppNavigator);

    return (
      <View style={styles.root}>
        <StatusBar barStyle="light-content" backgroundColor={colourPrimaryDark} />
        <AppContainer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default App;
