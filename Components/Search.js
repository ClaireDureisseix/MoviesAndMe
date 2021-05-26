import React from 'react';
import {
  StyleSheet,
  View,
  Button,
  TextInput,
  ActivityIndicator
} from 'react-native';
import FilmList from './FilmList';
import TMDBApi from '../API/TMDBApi';
import { connect } from 'react-redux';

let searchedText = '';
let page = 0;
let totalPages = 0;

class Search extends React.Component {

  state = {
    films: [],
    isLoading: false
  };

  _loadFilms = () => {
    if (searchedText.length > 0) {
      this.setState({ isLoading: true });
      TMDBApi.getFilms(searchedText, page + 1).then(data => {
        page = data.page;
        totalPages = data.total_pages;
        this.setState({
          films: [...this.state.films, ...data.results],
          isLoading: false
        });
      });
    }
  }

  _searchedTextChanged(text) {
    searchedText = text;
  }

  _searchFilms() {
    page = 0;
    totalPages = 0;
    this.setState(
      {
        films: []
      },
      () => {
        this._loadFilms();
      }
    );
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" color="orange" />
        </View>
      );
    }
  }

  // _displayDetailForFilm = filmId => {
  //   console.log('Display film with id ' + filmId);
  //   this.props.navigation.navigate('Détails', { filmId: filmId });
  // };

  render() {
    return (
      <View style={styles.main_container}>
        <TextInput
          style={styles.textinput}
          placeholder="Titre du film"
          onSubmitEditing={() => this._searchFilms()}
          onChangeText={text => this._searchedTextChanged(text)}
        />
        <Button
          style={{ height: 50 }}
          title="Rechercher"
          onPress={() => this._searchFilms()}
        />
        {/* <FlatList
          data={this.state.films}
          extraData={this.props.favoritesFilm}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) =>
            <FilmItem
              film={item}
              isFilmFavorite={(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false}
              displayDetailForFilm={this._displayDetailForFilm}
            />}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (page < totalPages) {
              // On vérifie qu'on n'a pas atteint la fin de la pagination (totalPages) avant de charger plus d'éléments
              this._loadFilms();
            }
          }}
        /> */}
        <FilmList
          films={this.state.films}
          navigation={this.props.navigation}
          loadFilms={this._loadFilms}
          page={page}
          totalPages={totalPages}
          favoriteList={false}
        />
        {this._displayLoading()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  textinput: {
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000',
    borderWidth: 1,
    paddingLeft: 5
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

// const mapStateToProps = state => {
//   return {
//     favoritesFilm: state.favoritesFilm
//   }
// }

// export default connect(mapStateToProps)(Search);
export default Search;
