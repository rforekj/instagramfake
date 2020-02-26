import React from 'react'
import { View, Text, TouchableOpacity, YellowBox, Image, TextInput, ActivityIndicator} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { f, database, auth, storage } from '../config/config.js'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
class upload extends React.Component {
    constructor(props) {
        super(props)
        YellowBox.ignoreWarnings(['Setting a timer']);
        this.state={
            status:'home',
            urihihi:''
        }
    }

    checkPermissions = async() => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            camera:status
        })

        const { statusRoll } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        this.setState({
            cameraRoll: statusRoll
        })
    }

    openCamera = async() => {
        this.checkPermissions()
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: 'Image',
            allowEditing: true,
            quality: 1,
        })
        if(!result.cancelled) {
            this.setState({
                status:'caption',
                urihihi: result.uri
            })
        } else {
            console.log("result false")
        }
    }

    openLibrary = async() => {
        this.checkPermissions()
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowEditing: true,
            aspect: [4, 3]
        })
        if (!result.cancelled) {
            this.props.navigation.navigate('Profile', {image: result.uri})
        } else {
            this.props.navigation.navigate('Profile', { image: result.uri })

        }
    }

    uploadImage = async(uri) => {
        this.setState({status:'loading'})
        const imageName = uri.substring(uri.lastIndexOf('/') + 1,uri.lastIndexOf('.'))
        const userId = f.auth().currentUser.uid
        const response = await fetch(uri)
        const blob = await response.blob()
        const storageRef = storage.ref().child(''+userId+'/image/'+imageName)
        return storageRef.put(blob)
        .then(()=>{
            storage.ref('' + userId + '/image/' ).child(''+imageName).getDownloadURL().then((urlImage) => {
                database.ref('photo/' + imageName).set({
                    author: userId,
                    caption: this.state.caption,
                    posted: Date.now(),
                    url: urlImage
                })
            })
            this.setState({status:'home'})
        })
    }

    render() {
        return (
            (this.state.status=='home') ? (
            <View style = {{flex:1}}>
                <View style={{ flexDirection: 'row', height: 70, paddingTop: 30, backgroundColor: 'white', borderColor: 'lightgrey', borderBottomWidth: 0.5, justifyContent: 'center', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Ionicons name={'ios-arrow-back'} size={25} style={{ padding: 10 }} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 30, fontWeight: 'bold', fontStyle: 'italic' }}>Upload</Text>
                    <Text style={{ width: 25 }}></Text>
                </View>
                <View style = {{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{padding:20}}>
                        <TouchableOpacity onPress={() => this.openCamera()} style={{ height: 50, width: 200, justifyContent: 'center', alignItems: 'center', backgroundColor: 'blue', borderRadius: 5 }}>
                            <Text style={{fontSize:30, color: 'white' }}>camera</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ padding: 20 }}>    
                        <TouchableOpacity onPress={() => this.openLibrary()} style={{ height: 50, width: 200, justifyContent: 'center', alignItems: 'center', backgroundColor: 'blue', borderRadius: 5 }}>
                            <Text style={{ fontSize: 30, color: 'white' }}>library</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            ) : (
                this.state.status=='caption' ? (
                <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                    <Image source={{uri: this.state.urihihi}} style={{height:200,width:400,paddingTop:20}}></Image>
                    <TextInput placeholder="write caption here" onChangeText={caption => this.setState({ caption: caption })} style={{ padding: 20, width: 200 }}/>
                    <TouchableOpacity onPress = {() => this.uploadImage(this.state.urihihi)} style={{justifyContent:'center',alignItems:'center',backgroundColor:'blue',height:20,width:100,padding:20, borderRadius:5}}>
                        <Text style={{color:'white', fontSize: 15}}>upload</Text>
                    </TouchableOpacity>
                </View>
                ) : (
                <ActivityIndicator size="large" color="#0000ff" style={{ justifyContent: 'center', alignItems: 'center' }}/>
                )
            )
        )
    }
}
export default upload