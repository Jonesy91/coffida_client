import React, { Component } from 'react';
import { Header, Right, Icon, Button } from 'native-base';
import { StyleSheet } from 'react-native';


class HeaderMenu extends Component {
    render(){
        return(
            <Header style={styles.header}>
                <Right>
                    <Button transparent>
                        <Icon name='md-options' style={styles.icon}/>
                    </Button>
                </Right>
            </Header>       
        )
    }
}

const styles = StyleSheet.create({
    header:  {
        backgroundColor: '#08485e'
    },
    icon:{
        color:'white',
        fontSize:30
    }
});

export default HeaderMenu;