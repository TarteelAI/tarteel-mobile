import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, Image, Linking, I18nManager, Share } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import RNRestart from 'react-native-restart';
import { Answers } from 'react-native-fabric';
import { findBestAvailableLanguage } from 'react-native-localize';
import I18n from '../i18n/i18n';
import { logError } from '../network/requests';
import { colourPrimary, touchedSetting } from '../styles/colours';

const TRANSLATION_SHORT_CODES = [
  'en-sahih',
  'en-arberry',
  'en-asad',
  'en-daryabadi',
  'en-hilali',
  'en-pickthall',
  'en-qaribullah',
  'en-sarwar',
  'en-yusufali',
  'en-maududi',
  'en-shakir',
  'en-transliteration'
];

const LANGUAGE_SHORT_CODES = [
  'en',
  'ar'
];

export default class SettingsPage extends Component {
  constructor() {
    super();
    this.state = {
      translation: null,
      language: null,
    }
  }

  async componentDidMount() {
    try {
      const translationShortCode = await AsyncStorage.getItem('Settings:Translation') || 'en-hilali';
      let languageShortCode = await AsyncStorage.getItem('Settings:Language');

      if (!languageShortCode) {
        // Use most appropriate device language
        // Use English as the fallback in case the user does not use their device in any supported language
        languageShortCode = findBestAvailableLanguage(LANGUAGE_SHORT_CODES) || 'en';

        this.setState({
          translationShortCode,
          translation: I18n.t(translationShortCode),
          languageShortCode,
          language: I18n.t(languageShortCode),
        });
      } else {
        this.setState({
          translationShortCode,
          translation: I18n.t(translationShortCode),
          languageShortCode,
          language: I18n.t(languageShortCode),
        });
      }
    } catch (error) {
      // Error retrieving data
      logError(error.message);
    }
  }

  _renderSectionTitle = (title) => {
    return (
      <Text style={styles.sectionTitle}>{title.toUpperCase()}</Text>
    )
  }

  _renderTouchableOption = (optionText, onPressAction, currentOptionSetting) => {
    return (
      <TouchableHighlight onPress={onPressAction} underlayColor={touchedSetting} style={styles.touchableOption}>
        <View style={styles.touchableOptionContainer}>
          <Text style={styles.optionText}>{optionText}</Text>
          <View style={styles.rightAligned}>
            {currentOptionSetting &&
              <Text numberOfLines={1} style={styles.currentOptionSetting}>{currentOptionSetting}</Text>
            }
            <Image source={require("../assets/chevron_right.png")} style={styles.chevron} />
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  _onChangeTranslation = async (newTranslation) => {
    if (newTranslation !== this.state.translationShortCode) {
      Answers.logCustom(
        'Changed app language',
        {
          previous: this.state.translationShortCode,
          new: newTranslation,
        }
      );
      this.props.navigation.state.params.onChangeTranslation(newTranslation);
      try {
        await AsyncStorage.setItem('Settings:Translation', newTranslation);
        this.setState({
          translationShortCode: newTranslation,
          translation: I18n.t(newTranslation),
        });
      } catch (error) {
        // Error saving data
        logError(error.message);
      }
    }
  }

  _openTranslationPicker = () => {
    const translationOptions = TRANSLATION_SHORT_CODES.map(value => {
      return {
        displayText: I18n.t(value),
        value,
      }
    });

    this.props.navigation.navigate(
      'SettingsOptionSelector',
      {
        headerTitle: I18n.t('settingsTranslation'),
        options: translationOptions,
        selectedOption: this.state.translationShortCode,
        onOptionSelection: this._onChangeTranslation.bind(this),
      }
    );
  }

  _onChangeLanguage = async (newLanguage) => {
    if (newLanguage !== I18n.locale) {
      try {
        I18n.locale = newLanguage;
        if (newLanguage === 'ar') {
          I18nManager.forceRTL(true);
          I18nManager.allowRTL(true);
        } else {
          I18nManager.forceRTL(false);
          I18nManager.allowRTL(false);
        }
        await AsyncStorage.setItem('Settings:Language', newLanguage);
        RNRestart.Restart();
      } catch (error) {
        // Error saving data
        logError(error.message);
      }
    }
  }

  _openLanguagePicker = () => {
    const languageOptions = LANGUAGE_SHORT_CODES.map(value => {
      return {
        displayText: I18n.t(value),
        value,
      }
    });

    this.props.navigation.navigate(
      'SettingsOptionSelector',
      {
        headerTitle: I18n.t('settingsLanguage'),
        options: languageOptions,
        selectedOption: this.state.languageShortCode,
        onOptionSelection: this._onChangeLanguage.bind(this),
      }
    );
  }

  _openAboutPage = () => {
    this.props.navigation.navigate('About');
  }

  _openContactPage = () => {
    this.props.navigation.navigate('Contact');
  }

  _initiateSharing() {
    Share.share(
      {
        message: I18n.t('shareMessage'),
        url: 'https://tarteel.io/mobile',
        title: I18n.t('shareSubject'),
      },
      {
        // Android only:
        dialogTitle: I18n.t('shareWith'),
        // iOS only:
        subject: I18n.t('shareSubject'),
        tintColor: colourPrimary,
      }
    );
  }

  _openPrivacyPolicy() {
    const url = 'https://iqraapp.com/privacy';
    Linking.openURL(url).catch(err => logError(err.message));
  }

  render() {
    return (
      <ScrollView>
        {this._renderSectionTitle(I18n.t('settingsTitle'))}
        {this._renderTouchableOption(I18n.t('settingsTranslation'), this._openTranslationPicker, this.state.translation)}
        {this._renderTouchableOption(I18n.t('settingsLanguage'), this._openLanguagePicker, this.state.language)}

        {this._renderSectionTitle(I18n.t('appName'))}
        {this._renderTouchableOption(I18n.t('aboutTitle'), this._openAboutPage)}
        {this._renderTouchableOption(I18n.t('contactTitle'), this._openContactPage)}
        {this._renderTouchableOption(I18n.t('actionShare'), this._initiateSharing)}
        {this._renderTouchableOption(I18n.t('privacyTitle'), this._openPrivacyPolicy)}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  sectionTitle: {
    color: 'gray',
    fontSize: 14,
    paddingTop: 10,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 8,
    textAlign: 'left',
  },
  touchableOption: {
    backgroundColor: 'white',
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 16,
    paddingRight: 16,
    borderWidth: 0.5,
    borderColor: '#CCCCCC',
    flex: 1,
  },
  touchableOptionContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  optionText: {
    color: 'black',
    fontSize: 16,
  },
  rightAligned: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
    alignItems: 'center',
  },
  currentOptionSetting: {
    flex: 1,
    textAlign: 'right',
    marginLeft: 12,
    color: 'gray',
  },
  chevron: {
    height: 24,
    width: 24,
    marginLeft: 4,
    transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
  },
});
