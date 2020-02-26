import React from 'react'
import { View, Text, TouchableOpacity, Image, YellowBox, TextInput, ActivityIndicator} from 'react-native'
import { f,auth,database,storage } from '../config/config'
import * as Facebook from 'expo-facebook';
import {Ionicons} from '@expo/vector-icons';
import {ImageViewer} from 'react-native-image-zoom-viewer'
//import Toast from 'react-native-simple-toast'



class profile extends React.Component {

    images = [];

    constructor(props) {
        super(props)
        YellowBox.ignoreWarnings(['Setting a timer']);
        this.state = {
            loggedIn: false,
            name: 'hieu',
            image: 'https://i.stack.imgur.com/l60Hf.png',
            email: '',
            password: '',
            loaded:false,
        }
        var that = this;
        f.auth().onAuthStateChanged(user => {
            if (user) {
                that.setState({
                    loggedIn: true,
                })
            } else {
                that.setState({
                    loggedIn: false
                })
            }
        })
        
    }

    checkParams = () => {
        var params = this.props.navigation.state.params
        //console.log(params.image)
        if (params) {
            if (params.image) {
                this.setState({
                    image: params.image
                })
            }
        }
        
    }

    logout() {
        auth.signOut().then(()=>{console.log('Log out');}).catch((err)=>console.log(err));
        this.setState({
            loggedIn:false
        })
    }

    async loginWithFacebook() {
        Facebook.initializeAsync('2397026640550129', 'myfirstproject')
        const { type, token } = await Facebook.logInWithReadPermissionsAsync(
            '2397026640550129',
            { permissions: ['public_profile'] }
        );
        if (type === 'success') {
            const cre = f.auth.FacebookAuthProvider.credential(token);
            f.auth().signInWithCredential(cre).catch((err) => {
                console.log('err', err)
            })
        }
    }

    loginWithEmail() {
        f.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        //.then(()=>this.fetchInfo())
        .catch(err => { console.log(err) })
    }

    fetchInfo() {
        database.ref('users/'+f.auth().currentUser.uid).once('value').then((snapshot) => {
            const exist = (snapshot.val() !== null)
            if (exist) data = snapshot.val()
            var that = this
            that.setState({
                name: data.name,
                image: data.avatar,
            })
        })    
    }


    fetchImage() {
        const userId = f.auth().currentUser.uid
        database.ref('photo').once('value').then((snapshot) => {
            const exist = (snapshot.val() !== null)
            if (exist) data = snapshot.val()
            for (var photo in data) {
                let photoObj = data[photo]
                if (photoObj.author === userId) {
                    this.images.push({
                        url: photoObj.url,
                        props: {
                            title: 'alo'
                        }
                    })
                }
            }
        }).then(()=>{this.setState({imageAlbum:this.images, loaded: true})})
    }
    
    componentDidMount(){
        //this.checkParams()
        var that = this
        f.auth().onAuthStateChanged((user) => {
            if(user){
                that.setState({ loggedIn: true })
                this.fetchInfo()
                //this.fetchImage()
                //console.log(this.state.imageAlbum)
            } 
            else that.setState({ loggedIn: false })
        })
    }

    render() {
        return (
            <View style = {{flex:1}}>
                <View style = {{height: 70, paddingTop: 30, backgroundColor: 'white', borderColor: 'lightgrey', borderBottomWidth: 0.5, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold', fontStyle: 'italic' }}>Profile</Text>
                </View>
                {this.state.loggedIn == true ? (
                    <View style={{flex:1,flexDirection:'column'}}>
                    <View style={{ flex:2,padding: 1, width: '100%', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Upload')}>
                        {
                            <Image source={{ uri: this.state.image }} style={{ borderRadius: 50, height: 100, width: 100, borderColor: 'red' }}></Image>
                        }
                        </TouchableOpacity>
                        <Text style={{ padding: 4, fontSize: 40, fontWeight: 'bold' }}>{this.state.name}</Text>
                    </View>
                    <View style={{flex:1, paddingTop: 20,justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity onPress={() => this.logout()} style={{ paddingVertical: 10, paddingHorizontal: 20, backgroundColor: 'blue', borderRadius: 5 }}>
                            <Text style={{ color: 'white' }}>log out</Text>
                        </TouchableOpacity>
                    </View>
                    {this.state.loaded==true ? (
                    <View style={{flex:4}}>
                        <ImageViewer imageUrls={this.state.imageAlbum}/>
                    </View>
                    ) : (
                        <ActivityIndicator />
                    )}
                    </View>
                ) : (
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center',padding:20 }}>
                        <Text>You haven't log in. Please log in!</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding:5 }}>
                            <Ionicons name={'ios-mail'} size={30} style={{ padding: 5 }} />
                                <TextInput placeholder="email..." onChangeText={email => this.setState({ email:email })} style={{padding:5, width:100}}></TextInput> 
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding:5 }}>
                            <Ionicons name={'ios-key'} size={30} style={{ padding: 5 }} />
                                <TextInput secureTextEntry={true} placeholder="password" onChangeText={password=>this.setState({password:password})} style={{ padding: 5, width: 100}}></TextInput>
                        </View>
                        <View style={{padding:5}}>
                                <TouchableOpacity onPress={() => this.loginWithEmail()} style={{ width: 150, height: 30, backgroundColor: 'blue', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: 'white', justifyContent: 'center', alignItems: 'center' }}>Log in</Text>
                                </TouchableOpacity>
                        </View>
                        <View style={{padding:5}}>
                                <TouchableOpacity onPress={() => this.loginWithFacebook()} style={{ width: 150, height: 30, backgroundColor: 'blue', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: 'white', justifyContent: 'center', alignItems: 'center' }}>Log in with facebook</Text>
                                </TouchableOpacity>
                        </View>
                        <View>
                            <Text>If you dont have an account, please </Text>
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate('SignUp')} style={{justifyContent:'center',alignItems:'center'}}>
                                <Text style={{color: 'blue'}}>Sign up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )} 
            </View>
        )
    }
}
export default profile