import React, { Component } from 'react';
import { StyleSheet, Text, Button, View, Share } from 'react-native';
import CheckBox from 'react-native-check-box';
import I18n from '../i18n/i18n';
import { colourPrimary } from '../styles/colours';

export default class ShareResultPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shareArabic: false,
      shareTranslation: false,
    };
  }

  _updateShareArabic = () => {
    this.setState({ shareArabic: !this.state.shareArabic });
  }

  _updateShareTranslation = () => {
    this.setState({ shareTranslation: !this.state.shareTranslation });
  }

  onShare = () => {
    const {shareArabic, shareTranslation} = this.state;
    const {
      arabicAyah,
      arabicSurahName,
      ayahNum,
      translationAyah,
      translationSurahName,
    } = this.props.navigation.state.params;
    const arabicAyahNum = I18n.formatNumberForLocale(ayahNum, 'ar');
    let shareMessage = '';

    if (shareArabic && shareTranslation) {
      shareMessage = I18n.t(
        'fullAyahShareMessage',
        {
          arabicAyah,
          arabicSurahName,
          arabicAyahNum,
          translationAyah,
          translationSurahName,
          ayahNum,
        }
      );
    } else if (shareArabic) {
      shareMessage = I18n.t(
        'arabicAyahShareMessage',
        {
          arabicAyah,
          arabicSurahName,
          arabicAyahNum,
        }
      );
    } else {
      shareMessage = I18n.t(
        'translationAyahShareMessage',
        {
          translationAyah,
          translationSurahName,
          ayahNum,
        }
      );
    }

    Share.share(
      {
        message: shareMessage,
        title: I18n.t('quran'),
      },
      {
        // Android only:
        dialogTitle: I18n.t('shareWith'),
        // iOS only:
        subject: I18n.t('quran'),
        tintColor: colourPrimary,
      }
    );
  }

  render() {
    return (
      <View style={styles.page}>
        <View style={styles.selectionSection}>
          <Text style={styles.text}>{I18n.t('shareInstructions')}</Text>
          <CheckBox
            style={styles.checkbox}
            onClick={this._updateShareArabic}
            isChecked={this.state.shareArabic}
            rightText={I18n.t('shareArabicAyah')}
            rightTextStyle={StyleSheet.flatten(styles.checkboxText)}
            checkBoxColor={this.state.shareArabic ? colourPrimary : 'gray'}
          />
          <CheckBox
            style={styles.checkbox}
            onClick={this._updateShareTranslation}
            isChecked={this.state.shareTranslation}
            rightText={I18n.t('shareTranslationAyah')}
            rightTextStyle={StyleSheet.flatten(styles.checkboxText)}
            checkBoxColor={this.state.shareTranslation ? colourPrimary : 'gray'}
          />
        </View>
        <Button
          style={styles.shareButton}
          onPress={this.onShare}
          title={I18n.t('actionShare')}
          color={colourPrimary}
          accessibilityLabel={I18n.t('actionShare')}
          disabled={!this.state.shareArabic && !this.state.shareTranslation}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    padding: 16,
    flex: 1,
  },
  selectionSection: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  text: {
    color: 'gray',
    fontSize: 16,
    textAlign: 'left',
  },
  checkbox: {
    marginTop: 6,
  },
  checkboxText: {
    textAlign: 'left',
  },
  shareButton: {
    justifyContent: 'flex-end',
    height: 40,
  },
});
