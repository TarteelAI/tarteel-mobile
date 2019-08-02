import React, { PureComponent } from 'react';
import { FlatList } from 'react-native';
import Result from './Result';

export default class ResultList extends PureComponent {
  state = {selected: (new Map(): Map<string, boolean>)};

  _keyExtractor = (result) => `${result.surahNum}:${result.ayahNum}`;

  _onPressResult = (id: string) => {
    this.setState((state) => {
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id));
      return {selected};
    });
  };

  _renderResult = ({item}) => {
    const {arabicAyah, arabicSurahName, ayahNum, surahNum, translationAyah, translationSurahName} = item;
    return (
      <Result
        id={this._keyExtractor(item)}
        onPressResult={this._onPressResult}
        selected={!!this.state.selected.get(this._keyExtractor(item))}
        arabicAyah={arabicAyah}
        arabicSurahName={arabicSurahName}
        ayahNum={ayahNum}
        surahNum={surahNum}
        translationAyah={translationAyah}
        translationSurahName={translationSurahName}
        navigation={this.props.navigation}
      />
    );
  }

  render() {
    return (
      <FlatList
        data={this.props.results}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderResult}
        alwaysBounceVertical={false}
      />
    );
  }
}
