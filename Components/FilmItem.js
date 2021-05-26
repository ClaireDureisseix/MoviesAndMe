import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

import FadeIn from '../Animations/FadeIn';

class FilmItem extends React.Component {

  _displayFavoriteImage() {
    if (this.props.isFilmFavorite) {
      return (
        <Image
          style={styles.favorite_image}
          source={require('../assets/ic_favorite.png')}
        />
      )
    }
  }

  render() {
    const { film, displayDetailForFilm } = this.props;
    return (
      <FadeIn>

        <TouchableOpacity
          style={styles.main_container}
          onPress={() => displayDetailForFilm(film.id)}
        >
          <Image
            style={styles.image}
            source={{
              uri: `https://image.tmdb.org/t/p/w300${film.poster_path}`
            }}
          />

          <View style={styles.content_container}>
            <View style={styles.header}>
              {this._displayFavoriteImage()}
              <Text style={styles.title_text}>
                {film.title}
              </Text>
              <Text style={styles.vote_text}>
                {film.vote_average}
              </Text>
            </View>

            <View style={styles.description_container}>
              <Text style={styles.description_text} numberOfLines={6}>
                {film.overview}
              </Text>
            </View>

            <View style={styles.date_container}>
              <Text style={styles.date_text}>
                Sorti le {film.release_date}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </FadeIn>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 190,
    flexDirection: 'row'
  },
  image: {
    width: 120,
    height: 180,
    margin: 5,
    backgroundColor: 'grey'
  },
  content_container: {
    flex: 1,
    margin: 5
  },
  header: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center'
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    flexWrap: 'nowrap',
    paddingRight: 5
  },
  vote_text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#666'
  },
  description_container: {
    flex: 7,
    justifyContent: 'center'
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666'
  },
  date_container: {
    flex: 1
  },
  date_text: {
    textAlign: 'right',
    fontSize: 14
  },
  favorite_image: {
    width: 25,
    height: 25,
    marginRight: 5,
  },
});

export default FilmItem;
