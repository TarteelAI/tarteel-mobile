import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, Image, I18nManager } from 'react-native';
import { touchedSetting } from '../styles/colours';

export default class SettingsOptionSelectorPage extends Component {
  handleSelection = (value) => {
    this.props.navigation.state.params.onOptionSelection(value);
    this.props.navigation.goBack();
  }

  render() {
    const {options, selectedOption} = this.props.navigation.state.params;

    const renderedOptions = options.map(option => {
      const {value, displayText} = option;
      const isSelected = value === selectedOption;
      return (
        <TouchableHighlight
          onPress={() => this.handleSelection(value)}
          underlayColor={touchedSetting}
          style={styles.touchableOption}
          key={value}
        >
          <View style={styles.touchableOptionContainer}>
            <Text style={styles.optionText}>{displayText}</Text>
            <View style={styles.selectionIndicatorSpace}>
              {isSelected &&
                <Image source={require("../assets/check.png")} style={styles.check} />
              }
            </View>
          </View>
        </TouchableHighlight>
      )
    });

    return (
      <ScrollView>
        {renderedOptions}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
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
    flex: 1,
    justifyContent: 'center',
    textAlign: 'left',
  },
  selectionIndicatorSpace: {
    width: 24,
    height: 24,
    marginLeft: 12,
    justifyContent: 'center',
  },
  check: {
    height: 24,
    width: 24,
    transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
  }
});
