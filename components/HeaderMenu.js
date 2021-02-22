/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { Header, Right, Icon, Button, Item, Input, Body } from 'native-base';
import { StyleSheet } from 'react-native';

class HeaderMenu extends Component {
    constructor(props){
        super(props);
        this.state={
            search: '',
        }
    }

    search(){
        const { searchCallback } = this.props;
        const { search } = this.state;
        searchCallback(search);
    }

    openFilters(){
        const { currentFilter, route, navigation } = this.props;
        navigation.navigate('filterModal',{currentFilter, route});
    }

    render(){
        return(
            <Header searchBar style={styles.header}>
                <Body style={styles.body}>
                    <Item style={styles.item}>
                        <Input placeholder='search' onChangeText={(text) => this.setState({search:text})} />
                    </Item>
                    <Button transparent onPress={() => this.search()}>
                        <Icon name="md-search" style={styles.icon}/>
                    </Button>
                </Body>
                <Right>
                    <Button transparent onPress={()  => this.openFilters()}>
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
    },
    item:{
        backgroundColor:'white',
        maxHeight: 30
    },
    body:{
        flex: 2,
        flexDirection:'row',
        alignItems: 'center'
    }
});

export default HeaderMenu;