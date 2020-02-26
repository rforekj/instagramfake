import React from 'react'
import { View, Text, Image, FlatList,TouchableOpacity,YellowBox} from 'react-native'
import { database } from '../config/config'
import { Ionicons } from '@expo/vector-icons';

class feed extends React.Component{
    constructor(props){
        super(props)
        YellowBox.ignoreWarnings(['Setting a timer']);
        this.state = {
            photo_feed: [],
            loading: true,
            refresh: false
        }
    }
    componentDidMount(){
        this.loadFeed()
    }

    loadFeed(){
        this.setState({
            refresh: true,
            photo_feed: []
        })

        var that = this
        database.ref('photo').orderByChild('posted').once('value').then((snapshot)=>{
            const exist = (snapshot.val() !== null)
            if(exist) data = snapshot.val()
            //var photo_feed = that.state.photo_feed
            for(var photo in data){
                let photoObj = data[photo]
                database.ref('users').child(photoObj.author).once('value').then((snapshot)=>{
                    const exist = (snapshot.val() !== null)
                    if (exist) data = snapshot.val()
                    that.state.photo_feed.push({
                        id: photo,
                        url: photoObj.url,
                        caption: photoObj.caption,
                        posted: photoObj.posted,
                        authorId: photoObj.author,
                        author: data.name,
                        avatar_author: data.avatar,
                    })
                    that.setState({
                        refresh: false, 
                        loading: false
                    })
                }).catch(err => console.log(err))
            }
            
        }).catch(err => console.log(err))
    }

    render(){
        return(
            <View style = {{flex:1}}>
                <View style = {{height: 70, paddingTop: 30, backgroundColor: 'white', borderColor: 'lightgrey', borderBottomWidth: 0.5, justifyContent: 'center', alignItems: 'center'}}>
                   <Text style={{fontSize: 30, fontWeight: 'bold', fontStyle: 'italic'}}>New Feed</Text> 
                </View>
                <FlatList
                    refreshing = {this.state.refresh}
                    onRefresh = {()=>this.loadFeed()}
                    data = {this.state.photo_feed}
                    keyExtractor = {(item,index)=>index.toString()}
                    style = {{flex: 1, backgroundColor: '#fff'}}
                    renderItem={({item,index}) => (
                        <View key={index} style={{width:'100%', overflow: 'hidden', marginBottom: 5, justifyContent: 'space-between', borderBottomWidth: 1, borderColor: 'grey'}}>
                            <View style={{padding: 1,width: '100%', flexDirection: 'row',alignItems:'center'}}>
                                <Image source={{uri:item.avatar_author}} style={{borderRadius:40,height:40,width:40}}></Image>
                                <TouchableOpacity onPress={()=>this.props.navigation.navigate('User',{userId: item.authorId})}>
                                    <Text style={{ padding: 4, fontSize: 20, fontWeight: 'bold' }}>{item.author}</Text>
                                </TouchableOpacity>
                            </View>
                                   
                            <View>
                                <Image
                                    source={{uri:item.url}}
                                    style={{resizeMode: 'cover',width:'100%',height:275}}
                                />
                            </View>
                            <View style={{ padding: 5, width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                                <Ionicons name={'md-heart'} size={30}  />
                                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Comment')}>
                                    <Ionicons name={'ios-chatboxes'} size={30} style={{ padding: 10 }} />
                                </TouchableOpacity>
                                <Ionicons name={'ios-paper-plane'} size={30} style={{ padding: 10 }} />
                            </View>
                            <View style = {{padding:1}}>
                                <Text style={{ fontSize: 20}}>{item.caption}</Text>
                                
                            </View>
                        </View>
                    )}>
                </FlatList>
            </View>
        )
    }
}
export default feed