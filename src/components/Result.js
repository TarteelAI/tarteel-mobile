import React, { PureComponent } from 'react';
import { StyleSheet, TouchableHighlight, TouchableOpacity, View, Text, Image, I18nManager } from 'react-native';
import { touchedResult } from '../styles/colours';
import I18n from '../i18n/i18n';

export default class Result extends PureComponent {
  _onPress = () => {
    this.props.onPressResult(this.props.id);
  };

  _onShare = () => {
    const {
      arabicAyah,
      arabicSurahName,
      ayahNum,
      id,
      selected,
      surahNum,
      translationAyah,
      translationSurahName,
    } = this.props;
    this.props.navigation.navigate(
      'ShareResult',
      {
        arabicAyah,
        arabicSurahName,
        ayahNum,
        id,
        selected,
        surahNum,
        translationAyah,
        translationSurahName,
      }
    );
  };

  render() {
    const {
      arabicAyah,
      arabicSurahName,
      ayahNum,
      selected,
      surahNum,
      translationAyah,
      translationSurahName,
    } = this.props;
    return (
      <TouchableHighlight onPress={this._onPress} underlayColor={touchedResult}>
        <View style={styles.resultContainer}>
          <View style={styles.metadataContainer}>
            <View style={styles.nameContainer}>
              <Text style={styles.translationSurahName}>{translationSurahName}</Text>
              <Text style={styles.arabicSurahName}>{arabicSurahName}</Text>
            </View>
            <Text style={styles.id}>
              {I18n.t(
                'ayahIndex',
                {
                  surahNum: I18n.formatNumberForLocale(surahNum, I18n.currentLocale()),
                  ayahNum: I18n.formatNumberForLocale(ayahNum, I18n.currentLocale()),
                }
              )}
            </Text>
          </View>
          {selected && (
            <View style={styles.expandedView}>
              <Text style={styles.arabicAyah}>{arabicAyah}</Text>
              <Text style={styles.translationAyah}>{translationAyah}</Text>
              <TouchableOpacity onPress={this._onShare} style={styles.shareContainer} activeOpacity={0.5}>
                <Image source={require("../assets/share.png")} style={styles.share} />
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.separationLine} />
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  resultContainer: {
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  metadataContainer: {
    flexDirection: 'row',
  },
  nameContainer: {
    flex: 2,
  },
  translationSurahName: {
    fontSize: 20,
    color: '#444444',
    textAlign: 'left',
  },
  arabicSurahName: {
    fontSize: 19,
    color: '#BBBBBB',
    textAlign: 'left',
  },
  id: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#BBBBBB',
  },
  expandedView: {
    flex: 1,
  },
  arabicAyah: {
    color: 'gray',
    marginTop: 16,
    fontSize: 20,
    textAlign: I18nManager.isRTL ? 'left' : 'right',
  },
  translationAyah: {
    color: 'gray',
    marginTop: 16,
    fontSize: 16,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  separationLine: {
    borderBottomColor: '#BBBBBB',
    borderBottomWidth: 1,
    paddingTop: 16,
  },
  shareContainer: {
    alignItems: 'center',
    flex: 1,
  },
  share: {
    height: 24,
    width: 24,
    marginTop: 10,
  }
});
