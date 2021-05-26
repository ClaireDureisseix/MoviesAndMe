import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Image  } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator  } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Store from './Store/configureStore';
import Search from './Components/Search';
import FilmDetail from './Components/FilmDetail';
import Favorites from './Components/Favorites';


export default class App extends React.Component {
  
  render() {
    const Stack = createStackNavigator();

    const Tab = createBottomTabNavigator();

    function Home() { 
      return (
        <Tab.Navigator
          initialRouteName="Search"
          tabBarOptions={{
            activeBackgroundColor: '#DDDDDD',
            inactiveBackgroundColor: '#FFFFFF',
            showLabel: false,
            showIcon: true,
          }}
        >
          <Tab.Screen 
            name="Search" 
            component={Search}
            options={{
              tabBarIcon: () => (
                <Image source={require('./assets/ic_search.png')} style={styles.icon} />
              ),
            }}
          />
          <Tab.Screen 
            name="Favorites"
            component={Favorites}
            options={{
              title: 'Favoris',
              tabBarIcon: () => (
                <Image source={require('./assets/ic_favorite.png')} style={styles.icon} />
              ),
            }}
          />
        </Tab.Navigator>
      );
    }
    
    return (
      <Provider store={Store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Rechercher">
            <Stack.Screen name="Rechercher" component={Home} />
            <Stack.Screen name="Détails" component={FilmDetail} />
            {/* <Stack.Screen name="Favorites" component={Favorites} options={{ title: 'Favoris' }} /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  }
})
