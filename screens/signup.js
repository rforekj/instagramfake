import React from 'react'
import { View, Text, TouchableOpacity, Image, YellowBox, TextInput} from 'react-native'
import { f, auth, database } from '../config/config'
import { Ionicons } from '@expo/vector-icons';
//import Toast from 'react-native-simple-toast'

class signup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            name: '',
            avatar: 'https://i.stack.imgur.com/l60Hf.png'
        }
    }

    signupWithEmail(){
        f.auth().createUserWithEmailAndPassword(this.state.email,this.state.password)
            .then(() => {
                database.ref('users/' + f.auth().currentUser.uid).set({
                    avatar: this.state.avatar,
                    email: this.state.email,
                    name: this.state.name
                })})
            .then(() => {console.log('success'),this.props.navigation.goBack()})
        .catch(err => { console.log(err) })   
    }

    render() {
        return (
            <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                    <Ionicons name={'ios-mail'} size={30} style={{ padding: 5 }} />
                    <TextInput placeholder="email..." onChangeText={email => this.setState({ email: email })} style={{ padding: 5, width: 100 }}></TextInput>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                    <Ionicons name={'ios-key'} size={30} style={{ padding: 5 }} />
                    <TextInput secureTextEntry={true} placeholder="password" onChangeText={password => this.setState({ password: password })} style={{ padding: 5, width: 100 }}></TextInput>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                    <Ionicons name={'ios-person'} size={30} style={{ padding: 5 }} />
                    <TextInput placeholder="name" onChangeText={name => this.setState({ name: name })} style={{ padding: 5, width: 100 }}></TextInput>
                </View>
                <View style={{ padding: 5 }}>
                    <TouchableOpacity onPress={() => this.signupWithEmail()} style={{ width: 150, height: 30, backgroundColor: 'blue', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white', justifyContent: 'center', alignItems: 'center' }}>Sign up</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
        )
    }
}
export default signup