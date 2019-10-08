import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableHighlight, Modal, Button, Animated, Easing, Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { Answers } from 'react-native-fabric';
import Voice from 'react-native-voice';
import Toast from 'react-native-root-toast';
import Permissions from 'react-native-permissions';
import RNANAndroidSettingsLibrary from 'react-native-android-settings-library';
import I18n from '../i18n/i18n';
import { performSearch } from '../network/requests';
import { logError } from '../network/errors';
import { colourPrimary } from '../styles/colours';

export default class Record extends Component {
  networkUnsubscribe;

  constructor(props) {
    super(props);
    Voice.onSpeechStart = this.onSpeechStart;
    Voice.onSpeechRecognized = this.onSpeechRecognized;
    Voice.onSpeechEnd = this.onSpeechEnd;
    Voice.onSpeechError = this.onSpeechError;
    Voice.onSpeechResults = this.onSpeechResults;
    Voice.onSpeechPartialResults = this.onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
    this.state = {
      isRecording: false,
      micText: I18n.t('tapOnMic'),
      pitches: [],
      results: [],
      partialResults: [],
      isFetching: false,
      spinValue: new Animated.Value(0),
      translation: 'en-hilali',
      isModalVisible: false,
      modalTitle: '',
      modalMessage: '',
      canOpenSettings: false,
      hasNetworkConnection: false,
      partialResultsLastUpdateTimestamp: new Date(),
    };
  }

  async componentDidMount() {
    try {
      const translation = await AsyncStorage.getItem('Settings:Translation');
      if (translation) {
        this.setState({ translation });
      }
    } catch (error) {
      // Error retrieving data
      logError(error.message);
    }

    NetInfo.fetch().then(state => {
      this.handleNetworkChange(state.isConnected && state.isInternetReachable);
    });
    this.networkUnsubscribe = NetInfo.addEventListener(state => {
      this.handleNetworkChange(state.isConnected && state.isInternetReachable);
    });
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);

    this.networkUnsubscribe();
  }

  handleNetworkChange = (hasNetworkConnection) => {
    this.setState({ hasNetworkConnection });
  }

  resetState = () => {
    this.setState({
      isRecording: false,
      micText: I18n.t('tapOnMic'),
      pitches: [],
      results: [],
      partialResults: [],
      isFetching: false,
      spinValue: new Animated.Value(0),
    });
  }

  getResults = (query) => {
    // The replacement removes the "RIGHT-TO-LEFT MARK" character provided as part of Arabic results in iOS
    this.setState({
      isFetching: true,
      micText: I18n.t('gettingMatch'),
    });
    const modifiedQuery = query.replace(/[\u{200f}]/gu, '');
    performSearch(modifiedQuery, this.state.translation, (err, response) => {
      this.resetState();
      if (err) {
        Toast.show(err.message);
      } else {
        this.props.showResults(response.result);
      }
    });
    Answers.logCustom(
      'Performed query',
      {
        query: modifiedQuery,
        translation: this.state.translation,
      }
    );
  };

  // Can take event e as a parameter
  onSpeechStart = () => {
    this.setState({
      isRecording: true,
      micText: I18n.t('beginRecording'),
      pitches: [],
      results: [],
      partialResults: [],
    });
  };

  // Can take event e as a parameter
  onSpeechRecognized = () => {
    this.setState({
      micText: I18n.t('nowRecording'),
    });
  };

  // Can take event e as a parameter
  onSpeechEnd = () => {
    this.setState({
      isRecording: false,
      micText: I18n.t('doneRecording'),
    });
    this.getResults(this.state.results[0]);
  };

  onSpeechError = (e) => {
    const SPEECH_RECOGNITION_STATUS_NOT_DETERMINED = 'Speech recognition not yet authorized';
    const SPEECH_RECOGNITION_STATUS_DENIED = 'User denied access to speech recognition';
    const SPEECH_RECOGNITION_RESTRICTED = 'Speech recognition restricted on this device';
    const NO_SPEECH_RECOGNIZED = '203/Retry'; // No speech recognized yet, not necessarily disabled

    if (this.state.isRecording) {
      this._stopRecognizing();
      this.resetState();
    }

    if (e.error.message === NO_SPEECH_RECOGNIZED) {
      Toast.show(I18n.t('noSpeech'));
      return;
    }

    let modalTitle, modalMessage;
    if ([SPEECH_RECOGNITION_STATUS_NOT_DETERMINED, SPEECH_RECOGNITION_STATUS_DENIED].includes(e.error.message)) {
      modalTitle = I18n.t('missingPermissionTitle');
      modalMessage = I18n.t('missingPermissionExplanation', {permissionName: I18n.t('speechRecognition')});
    } else {
      modalTitle = I18n.t('somethingWentWrong');
      modalMessage = JSON.stringify(e);
    }

    this.setState({
      isModalVisible: true,
      modalTitle,
      modalMessage,
    });
  };

  onSpeechResults = (e) => {
    this.setState({
      results: e.value,
    });
  };

  onSpeechPartialResults = (e) => {
    this.setState({
      partialResults: e.value,
      partialResultsLastUpdateTimestamp: new Date(),
    });
    setTimeout(() => {
      if (new Date() - this.state.partialResultsLastUpdateTimestamp >= 2500) {
        this._stopRecognizing();
      }
    }, 2500);
  };

  onSpeechVolumeChanged = (e) => {
    // console.log('pitch', e.value);
    this.setState({
      pitches: this.state.pitches.push(e.value),
    });
  };

  _startRecognizing = async () => {
    try {
      await Voice.start('ar');
    } catch (e) {
      logError(e.message);
    }
  };

  _stopRecognizing = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      logError(e.message);
    }
  };

  handleMicPress = (e) => {
    const permissionsList = Platform.OS === 'ios' ? ['microphone', 'speechRecognition'] : ['microphone'];
    Permissions.checkMultiple(permissionsList).then(response => {
      if (['denied', 'restricted'].includes(response.microphone)) {
        this.setState({
          isModalVisible: true,
          modalTitle: I18n.t('missingPermissionTitle'),
          modalMessage: I18n.t('missingPermissionExplanation', {permissionName: I18n.t('microphone')}),
        });
      } else if (Platform.OS === 'ios' && ['denied', 'restricted'].includes(response.speechRecognition)) {
        this.setState({
          isModalVisible: true,
          modalTitle: I18n.t('missingPermissionTitle'),
          modalMessage: I18n.t('missingPermissionExplanation', {permissionName: I18n.t('speechRecognition')}),
        });
      } else {
        if (!this.state.hasNetworkConnection) {
          Toast.show(I18n.t('noInternetConnection'));
        } else {
          // Skip voice
          // const query = 'محمد';
          // this.getResults(query);
          // return;

          const {isRecording} = this.state;
          if (!isRecording) {
            this._startRecognizing(e);
          } else {
            this._stopRecognizing(e);
          }
        }
      }
    });
  };

  openSettings() {
    if (Platform.OS === 'ios') {
      Permissions.openSettings();
    } else {
      RNANAndroidSettingsLibrary.open('ACTION_APPLICATION_DETAILS_SETTINGS');
    }
  }

  render() {
    const {isRecording, micText, partialResults, isFetching, isModalVisible, modalTitle, modalMessage} = this.state;
    const circleColourStyle = isRecording ? styles.activeCircle : styles.inactiveCircle;
    const circleStyles = [styles.baseCircle, circleColourStyle];
    const partialResult = (isRecording && partialResults.length) ? partialResults[0] : null;
    const showMicButton = !isFetching;
    const showPartialResult = !isFetching && partialResult;

    let spinStyle;
    if (isFetching) {
      Animated.loop(
        Animated.timing(
          this.state.spinValue,
          {
            toValue: 1,
            duration: 1200,
            easing: Easing.linear,
            useNativeDriver: true,
          }
        )
      ).start();

      const spin = this.state.spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
      });

      spinStyle = {
        transform: [
          {rotate: spin},
          {perspective: 1000},
        ],
      };
    }

    return (
      <View style={styles.recordContainer}>
        <Text style={styles.recordText}>{micText}</Text>
        <View style={circleStyles}>
          {showMicButton && (
            <TouchableHighlight onPress={this.handleMicPress} underlayColor="transparent" style={styles.micTouchableArea}>
              <Image source={require('../assets/mic.png')} style={styles.mic} />
            </TouchableHighlight>
          )}
          {isFetching && (
            <Animated.Image source={require('../assets/logo.png')} style={[styles.logo, spinStyle]} />
          )}
        </View>
        {showPartialResult && <Text style={styles.partialResultText}>{partialResult}</Text>}
        <Modal
          animationType="slide"
          transparent={false}
          visible={isModalVisible}
        >
          <View style={styles.modal}>
            <View style={styles.modalTextContainer}>
              <Text style={styles.modalTitle}>{modalTitle}</Text>
              <Text style={styles.modalMessage}>{modalMessage}</Text>
            </View>
            <Button
              style={styles.modalPrimaryButton}
              onPress={this.openSettings}
              title={I18n.t('openSettings')}
              color={colourPrimary}
              accessibilityLabel={I18n.t('openSettings')}
            />
            <Button
              style={styles.modalSecondaryButton}
              onPress={() => {
                this.setState({ isModalVisible: false });
              }}
              title={I18n.t('ok')}
              color="gray"
              accessibilityLabel={I18n.t('ok')}
            />
          </View>
        </Modal>
      </View>
    );
  }
}

const circleSize = 80;

const styles = StyleSheet.create({
  recordContainer: {
    alignItems: 'center',
    flex: 2,
  },
  recordText: {
    color: 'gray',
    fontSize: 15,
  },
  baseCircle: {
    backgroundColor: '#606060',
    height: circleSize,
    width: circleSize,
    borderRadius: circleSize / 2,
    alignItems: 'center',
    top: 60,
    marginBottom: 30,
  },
  activeCircle: {
    backgroundColor: colourPrimary,
  },
  inactiveCircle: {
    backgroundColor: '#606060',
  },
  micTouchableArea: {
    padding: 18,
  },
  mic: {
    height: 48,
    width: 48,
  },
  logo: {
    height: 50,
    width: 48,
    marginTop: 15,
  },
  partialResultText: {
    top: 90,
    textAlign: 'center',
    marginLeft: 12,
    marginRight: 12,
  },
  modal: {
    marginTop: 16,
    padding: 24,
    flex: 1,
  },
  modalTextContainer: {
    flex: 1,
  },
  modalTitle: {
    fontSize: 20,
    textAlign: 'left',
  },
  modalMessage: {
    fontSize: 16,
    marginTop: 12,
    textAlign: 'left',
  },
  modalPrimaryButton: {
    justifyContent: 'flex-end',
    height: 40,
  },
  modalSecondaryButton: {
    justifyContent: 'flex-end',
    height: 40,
  },
});
