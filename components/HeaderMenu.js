import React, { Component } from 'react';
import { Header, Right } from 'native-base';
import { TouchableOpacity } from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';

class HeaderMenu extends Component {
    render(){
        return(
            <Header>
                <Right>
                    <TouchableOpacity>
                        <IonIcons name='md-options' size={30} color='black'/>
                    </TouchableOpacity>
                </Right>
            </Header>
        )
    }
}

export default HeaderMenu;