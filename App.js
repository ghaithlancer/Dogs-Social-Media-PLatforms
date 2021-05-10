import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import LandingScreen from './components/auth/Landing'
import SignupScreen from './components/auth/Signup'
import LoginScreen from './components/auth/Login'
import MainScreen from './components/Main'
import AddScreen from './components/main/Add'
import SaveScreen from './components/main/Save'
import CommentScreen from './components/main/Comment'
import firebase from 'firebase'
import {firebaseConfig} from './firebase'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'

const store = createStore(rootReducer, applyMiddleware(thunk))

if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
}

const Stack = createStackNavigator()

export class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      loaded: false,
      loggedIn: false,
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        this.setState({
          loggedIn: false,
          loaded: true
        })
      }else{
        this.setState({
          loggedIn: true,
          loaded: true
        })
      }
    })
  }



  render() {
    const {loggedIn, loaded} = this.state
    if(!loaded){
      return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Loading</Text>
        </View>
      )
    }

    if(!loggedIn){
      return (    
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Landing'>
            <Stack.Screen name="Landing" component={LandingScreen} options={{headerShown: false}} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      )
    }

    return(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Main'>
              <Stack.Screen name="Main" component={MainScreen}  />
              <Stack.Screen name="Add" component={AddScreen} navigation={this.props.navigation}/>
              <Stack.Screen name="Save" component={SaveScreen} navigation={this.props.navigation}/>
              <Stack.Screen name="Comment" component={CommentScreen} navigation={this.props.navigation}/>
          </Stack.Navigator>
         </NavigationContainer>
      </Provider>
    )
  }
}

export default App

// options={{headerShown: false}}