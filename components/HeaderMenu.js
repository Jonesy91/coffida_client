/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { Header, Right, Icon, Button, Item, Input, Body, StyleProvider } from 'native-base';
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';
import styles from '../style/components/HeaderMenuStyle';
import { displayMessage } from '../utilities/error/errorHandler';

class HeaderMenu extends Component {
    constructor(props){
        super(props);
        this.state={
            search: null,
        }
    }

    async handleClear(){
        await this.setState({search:''});
        this.search();
    }

    search(){
        const { searchCallback } = this.props;
        const { search } = this.state;
        if(search !== null){
            console.log(search)
            searchCallback(search);
        } else {
            displayMessage('Please enter search criteria');
        }
        
    }

    openFilters(){
        const { currentFilter, route, navigation } = this.props;
        navigation.navigate('filterModal',{currentFilter, route});
    }

    render(){
        const { search, placeholder } = this.state;
        return(
            <StyleProvider style={getTheme(platform)}>
            <Header>
                <Body style={styles.body}>
                    <Item style={styles.item}>
                        <Input value={search} onChangeText={(text) => this.setState({search:text})} />
                        {search !== null && (
                            <Button small transparent onPress={() => this.handleClear()}>
                                <Icon name="md-close-circle" />
                            </Button>
                        )}
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
            </StyleProvider>   
        )
    }
}

export default HeaderMenu;