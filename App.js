import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator} from 'react-navigation-tabs'
import { createStackNavigator} from 'react-navigation-stack'
import{createAppContainer} from 'react-navigation'
import feed from './screens/feed.js'
import profile from './screens/profile.js'
import upload from './screens/upload.js'
import comment from './screens/comment.js'
import userProfile from './screens/userProfile.js'
import signup from './screens/signup.js'
import { Ionicons } from '@expo/vector-icons';

const TabStack = createBottomTabNavigator({
  Feed: {
    screen:feed, 
    navigationOptions:{
    tabBarLabel:'Feed',
      tabBarIcon: ({ tintColor }) => {
        return <Ionicons name={'ios-home'} size={25} color={tintColor} />;
      },
    }
  },
  Profile: {
    screen:profile,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => {
        return <Ionicons name={'md-person'} size={25} color={tintColor} />;
      },
    }
  },
  Upload: {
    screen:upload,
    navigationOptions: {
      tabBarLabel: 'Upload',
      tabBarIcon: ({ tintColor }) => {
        return <Ionicons name={'md-cloud-upload'} size={25} color={tintColor} />;
      },
    }
  },
},
  {initialRouteName:'Feed'},
)

const MainStack = createStackNavigator({
  Home: {screen: TabStack},
  User: {screen: userProfile},
  Comment: {screen: comment},
  SignUp: {screen: signup}
},
{
  initialRouteName: 'Home',
  mode: 'modal',
  headerMode: 'none'
}
)
const App = createAppContainer(MainStack)
export default App
/*
export default class App extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <MainStack/>
    )
  }
}*/

/*
export default class App extends Component{

    constructor(props){
      super(props);
      database.ref('/hieu/conhieu').remove()
      this.state = {
        loggedin : false
      };
      var that = this;
      f.auth().onAuthStateChanged( user => {
        if(user) {
          that.setState({
            loggedin : true
          })
        } else {
          that.setState({
            loggedin : false
          }) 
        }
      })
    }  

    logout(){
      auth.signOut()//.then(()=>{console.log('Log out');}).catch((err)=>{console.log('err',err)});
    
    }

    async loginWithFacebook(){
      console.ignoredYellowBox = [
        'Setting a timer'
      ]
      Facebook.initializeAsync('2397026640550129', 'myfirstproject')
        const{type,token} = await Facebook.logInWithReadPermissionsAsync(
          '2397026640550129',
          {permissions:['public_profile']}
        );
        if(type==='success'){
          const cre = f.auth.FacebookAuthProvider.credential(token);
          f.auth().signInWithCredential(cre).catch((err)=>{
            console.log('err',err)
          })
        }
    }

    render(){
      return(
        <View style = {styles.container}>
        {
          this.state.loggedin === true ? (
            <Button
             title='log out'
             style = {styles.button}
             onPress = {() => this.logout()}></Button>
          ) : (
            <Button
              title='ngu'
              style={styles.button}
              onPress={() => this.loginWithFacebook()}>
            </Button>
          )
        } 
        </View>
      )
    }
}
*/
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center'
  },
  button:{
    backgroundColor:'#ff0'
  }
}
)
