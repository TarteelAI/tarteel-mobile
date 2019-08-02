import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, TextInput, Button, View, KeyboardAvoidingView, ActivityIndicator, I18nManager } from 'react-native';
import Toast from 'react-native-root-toast';
import I18n from '../i18n/i18n';
import { contactDeveloper } from '../network/requests';
import { logError } from '../network/requests';
import { colourPrimary } from '../styles/colours';

export default class ContactPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: '',
      loading: false,
    };
  }

  onSend = () => {
    const { name, email, message } = this.state;

    if (message.trim() === '') {
      Toast.show(I18n.t('noMessageEntered'));
    } else {
      this.setState({ loading: true });
      contactDeveloper(name, email, message, (err) => {
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
            <Text style={styles.text}>{I18n.t('contactParagraph')}</Text>
            <View style={styles.inputUnderline}>
              <TextInput
                style={styles.input}
                onChangeText={(name) => this.setState({name})}
                value={this.state.name}
                multiline={false}
                placeholder={I18n.t('contactFormName')}
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
});
