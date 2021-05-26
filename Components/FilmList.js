import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import FilmItem from './FilmItem';
import { connect } from 'react-redux';

class FilmList extends React.Component {
  
  state = {
    films: [],
  }

  _displayDetailForFilm = (filmId) => {
    console.log("Display film " + filmId)
    // On a récupéré les informations de la navigation, on peut afficher le détail du film
    this.props.navigation.navigate('Détails', {filmId: filmId})
  }  

  render() {
    return (
      <FlatList
          style={styles.list}
          data={this.props.films}
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
            if (this.props.page < this.props.totalPages) {
              // On vérifie qu'on n'a pas atteint la fin de la pagination (totalPages) avant de charger plus d'éléments
              this.props.loadFilms();
            }
          }}
        />
    )
  }


}

const styles = StyleSheet.create({
  list: {
    flex: 1
  }
})

const mapStateToProps = state => {
  return {
    favoritesFilm: state.favoritesFilm
  }
}

export default connect(mapStateToProps)(FilmList)