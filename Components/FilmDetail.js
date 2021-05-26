import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image  } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import numeral from 'numeral';

import TMDBApi from '../API/TMDBApi';
import { TouchableOpacity } from 'react-native-gesture-handler';

import EnlargeShrink from '../Animations/EnlargeShrink';


class FilmDetail extends React.Component {
  state = {
    film: undefined,
    isLoading: true,
  };
  
  componentDidMount() {
    const favoriteFilmIndex = this.props.favoritesFilm.findIndex(item => item.id === this.props.route.params.filmId);
    if (favoriteFilmIndex !== -1) {
      this.setState({
        film: this.props.favoritesFilm[favoriteFilmIndex]
      })
      return
    }
    this.setState({ isLoading: true })

    TMDBApi.getAFilm(this.props.route.params.filmId).then(data => {
      this.setState({
        film: data,
        isLoading: false,
      })
    })
  }

  // componentDidUpdate() {
  //   console.log('update', this.props.favoritesFilm);
  // }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" color='grey' />
        </View>
      )
    }
  }

  _toggleFavorite() {
    const action = { type: "TOGGLE_FAVORITE", value: this.state.film }
    this.props.dispatch(action)
  }

  _displayFavoriteImage() {
    let sourceImage = require('../assets/ic_favorite_border.png')
    let shouldEnlarge = false
    if (this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1) {
      sourceImage = require('../assets/ic_favorite.png')
      shouldEnlarge = true
    }
    return (
      <EnlargeShrink shouldEnlarge={shouldEnlarge}>
        <Image 
          style={styles.favorite_image} 
          source={sourceImage} 
        />
      </EnlargeShrink>
    )
  }

  _displayFilm() {
    const { film } = this.state;
    if (film != undefined) {
      return (
        <ScrollView style={styles.scrollview_container}>
          <Image
          style={styles.image}
          source={{uri: `https://image.tmdb.org/t/p/w300${film.backdrop_path}`}}  
        />
          <Text style={styles.title_text}>{film.title}</Text>

          <TouchableOpacity 
            style={styles.favorite_container}
            onPress={() => this._toggleFavorite()}>
            {this._displayFavoriteImage()}
          </TouchableOpacity>

          <Text style={styles.description_text}>{film.overview}</Text>
          <Text style={styles.default_text}>Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
          <Text style={styles.default_text}>Note : {film.vote_average} / 10</Text>
          <Text style={styles.default_text}>Nombre de votes : {film.vote_count}</Text>
          <Text style={styles.default_text}>Budget : {numeral(film.budget).format('0,0[.]00 $')}</Text>
          <Text style={styles.default_text}>Genre(s) : {film.genres.map(function(genre){
              return genre.name;
            }).join(" / ")}
          </Text>
          <Text style={styles.default_text}>Companie(s) : {film.production_companies.map(function(company){
              return company.name;
            }).join(" / ")}
          </Text>

        </ScrollView>
      )
    }
  }


  render() {
    return (
      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._displayFilm()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollview_container: {
    flex: 1,
  },
  image: {
    height: 169,
    margin: 5,
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 35,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center',
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
    margin: 5,
    marginBottom: 15,
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  },
  favorite_container: {
    alignItems: 'center',
  },
  favorite_image: {
    flex: 1,
    width: null,
    height: null,
  },
});

const mapStateToProps = (state) => {
  // Bonne pratique: on ne récupère que le state qui nous intéresse dans ce component
  return {
    favoritesFilm: state.favoritesFilm
  };
}

export default connect(mapStateToProps)(FilmDetail);
