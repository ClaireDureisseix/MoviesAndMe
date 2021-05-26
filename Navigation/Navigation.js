import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator
} from '@react-navigation/stack';
import Search from '../Components/Search';
import FilmDetail from '../Components/FilmDetail';
import Favorites from '../Components/Favorites';

const SearchStackNavigator = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: {
      title: 'Rechercher'
    }
  },
  FilmDetail: {
    screen: FilmDetail
  }
});

const MoviesTabNavigator = createBottomTabNavigator({
  Search: {
    screen: SearchStackNavigator
  },
  Favorites: {
    screen: Favorites
  }
});

export default createAppContainer(MoviesTabNavigator);
