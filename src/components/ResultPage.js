import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Toast from 'react-native-root-toast';
import HeaderRight from './HeaderRight';
import ResultHeader from './ResultHeader';
import ResultCount from './ResultCount';
import ResultList from './ResultList';
import { changeTranslation } from '../network/requests';

export default class ResultPage extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerRight: <HeaderRight navigation={navigation} onChangeTranslation={(translation) => params.handleChangeTranslation(translation)} />,
    };
  };

  constructor() {
    super();
    this.state = {
      queryText: '',
      matches: [],
    };
  }

  _handleChangeTranslation = (translation) => {
    let { matches } = this.props.navigation.state.params.result;
    const ayahs = matches.map(match => {
      return {
        surahNum: match.surahNum,
        ayahNum: match.ayahNum,
      };
    });
    changeTranslation(translation, ayahs, (err, response) => {
      if (err) {
        Toast.show(err.message);
      } else {
        matches.forEach((match, idx) => {
          match.translationAyah = response.result[idx].translationAyah;
        });
        this.setState({ matches });
      }
    });
  }

  componentDidMount() {
    const { queryText, matches } = this.props.navigation.state.params.result;
    this.props.navigation.setParams({ handleChangeTranslation: this._handleChangeTranslation });
    this.setState({
      queryText,
      matches,
    });
  }

  render() {
    const { queryText, matches } = this.state;
    return (
      <View style={styles.pageContainer}>
        <ResultHeader query={queryText} />
        <ResultCount count={matches.length} />
        <ResultList results={matches} navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
});
