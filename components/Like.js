import { Button, View, Text } from 'native-base';
import React, { Component } from 'react';
import IonIcons from 'react-native-vector-icons/Ionicons';

class Like extends Component{
    render(){
        return(
            <View style={{flexDirection:'row',}}>
                <Button iconLeft transparent>
                    <IonIcons name='md-thumbs-up-outline' size={20} />
                </Button>
                <Text>{this.props.likes}</Text>
            </View>
        );
    }
}


export default Like;