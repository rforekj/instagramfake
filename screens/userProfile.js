import React from 'react'
import { View, Text, Image, TouchableOpacity, YellowBox } from 'react-native'
import { f, auth, database } from '../config/config'
import { Ionicons } from '@expo/vector-icons';

class userProfile extends React.Component {
    constructor(props) {
        super(props)
        YellowBox.ignoreWarnings(['Setting a timer']);
        this.state=({
            loaded: false
        })
    }

    checkParams = () => {
        var params = this.props.navigation.state.params
        if(params){
            if(params.userId){
                this.setState({
                    userId: params.userId   
                })
                this.fetchUserInfo(params.userId)
            }
        }
    }

    fetchUserInfo = (userId) => {
        var that = this
        database.ref('users').child(userId).once('value').then((snapshot) => {
            const exist = (snapshot.val()!==null)
            if(exist) {
                data = snapshot.val()
                that.setState({
                    name:data.name,
                    avatar:data.avatar,
                    email:data.email,
                    loaded:true
                })
            }
        }).catch(err => console.log(err));
        
    }
    componentDidMount(){
        this.checkParams()
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', height: 60, paddingTop: 30, backgroundColor: 'white', borderColor: 'lightgrey', borderBottomWidth: 0.5, justifyContent: 'center',justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                        <Ionicons name={'ios-arrow-back'} size={25} style={{padding:10}}/>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 30, fontWeight: 'bold', fontStyle: 'italic'}}>Profile</Text>
                    <Text style={{width:25}}></Text>
                </View>
                {this.state.loaded==true ? (
                    <View style={{padding: 1, width: '100%', flexDirection: 'row',justifyContent:'space-evenly',alignItems:'center'}}>
                        <Image source={{ uri: this.state.avatar }} style={{ borderRadius: 50, height: 100, width: 100, borderColor:'red' }}></Image>
                        <Text style={{ padding: 4, fontSize: 40, fontWeight: 'bold' }}>{this.state.name}</Text>
                    </View>
                ) : (
                    <Text>loading</Text>
                )}
                
            </View>
        )
    }
}
export default userProfile