const API_TOKEN = '64da0b88acc3095d52cb198716647854';

class TMDBApi {
  getFilms (text, page) {
    const url =
      'https://api.themoviedb.org/3/search/movie?api_key=' +
      API_TOKEN +
      '&language=fr&query=' +
      text +
      '&page=' +
      page;
  
    try {
      const res = fetch(url).then(res => res.json());
      return res;
    } catch (err) {
      return console.error(err);
    }
  }

  getAFilm (id) {
    const url = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=' + API_TOKEN + '&language=fr';
    try {
      const result = fetch(url).then(res => res.json())
      return result;
    } catch (err) {
      return console.error(err);
    } 
  }

}

export default new TMDBApi();

