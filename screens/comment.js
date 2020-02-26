import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

class comment extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', height: 60, paddingTop: 30, backgroundColor: 'white', borderColor: 'lightgrey', borderBottomWidth: 0.5, justifyContent: 'center', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Ionicons name={'ios-arrow-back'} size={25} style={{ padding: 10 }} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 30, fontWeight: 'bold', fontStyle: 'italic' }}>Comment</Text>
                    <Text style={{ width: 25 }}></Text>
                </View>
            </View>
        )
    }
}
export default comment