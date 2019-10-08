import React, { Component } from 'react';
import { StyleSheet, ScrollView, TextInput, Button, View, KeyboardAvoidingView, ActivityIndicator, I18nManager } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Toast from 'react-native-root-toast';
import I18n from '../i18n/i18n';
import { contactDeveloper } from '../network/requests';
import { logError } from '../network/errors';
import { colourPrimary } from '../styles/colours';

const subjects = [
  {
    label: I18n.t('contactFormSubject1'),
    value: 'bug',
  },
  {
    label: I18n.t('contactFormSubject2'),
    value: 'question',
  },
  {
    label: I18n.t('contactFormSubject3'),
    value: 'featureRequest',
  },
  {
    label: I18n.t('contactFormSubject4'),
    value: 'partnership',
  },
  {
    label: I18n.t('contactFormSubject5'),
    value: 'other',
  },
];

export default class ContactPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: '',
      email: '',
      message: '',
      loading: false,
    };
  }

  onSend = () => {
    const { subject, email, message } = this.state;

    if (subject === '') {
      Toast.show(I18n.t('noSubjectSelected'));
    } else if (message.trim() === '') {
      Toast.show(I18n.t('noMessageEntered'));
    } else if (email.trim() === '') {
      // TODO: validate email
      Toast.show(I18n.t('noEmailEntered'));
    } else {
      this.setState({ loading: true });
      contactDeveloper(subject, email, message, (err) => {
        if (err) {
          logError(err.message);
          Toast.show(err.message);
        } else {
          Toast.show(I18n.t('messageSent'));
        }
        this.setState({ loading: false });
        this.props.navigation.goBack();
      });
    }
  }

  render() {
    return (
      <View style={styles.page}>
        <KeyboardAvoidingView behavior={'padding'} style={styles.kav} keyboardVerticalOffset={66}>
          <ScrollView
            style={styles.scrollSection}
            ref={ref => this.scrollView = ref}
            onContentSizeChange={() => {
              this.scrollView.scrollToEnd({animated: true});
            }}
          >
            <View style={styles.inputUnderline}>
              <RNPickerSelect
                style={pickerSelectStyles}
                placeholder={{label: I18n.t('contactFormSubject'), value: ''}}
                items={subjects}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({subject: itemValue})
                }
              />
            </View>
            <View style={styles.inputUnderline}>
              <TextInput
                style={styles.input}
                onChangeText={(email) => this.setState({email})}
                value={this.state.email}
                multiline={false}
                placeholder={I18n.t('contactFormEmail')}
              />
            </View>
            <View style={styles.inputUnderline}>
              <TextInput
                style={styles.input}
                onChangeText={(message) => this.setState({message})}
                value={this.state.message}
                multiline={true}
                placeholder={I18n.t('contactFormMessage')}
              />
            </View>
          </ScrollView>
          {!this.state.loading &&
            <Button
              style={styles.sendButton}
              onPress={this.onSend}
              title={I18n.t('contactFormSend')}
              color={colourPrimary}
              accessibilityLabel={I18n.t('contactFormSend')}
            />
          }
          {this.state.loading &&
            <ActivityIndicator size="small" color={colourPrimary} style={styles.spinner} />
          }
        </KeyboardAvoidingView>
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
  kav: {
    flex: 1,
  },
  scrollSection: {
    flex: 1,
  },
  text: {
    color: 'gray',
    fontSize: 16,
    textAlign: 'left',
  },
  input: {
    borderWidth: 0,
    marginTop: 16,
    fontSize: 16,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  inputUnderline: {
    borderBottomColor: colourPrimary,
    borderBottomWidth: 1,
  },
  sendButton: {
    justifyContent: 'flex-end',
    height: 40,
  },
  spinner: {
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  subjectPicker: {
    height: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    borderWidth: 0,
    marginTop: 16,
    fontSize: 16,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  inputAndroid: {
    borderWidth: 0,
    marginTop: 16,
    fontSize: 16,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
});
