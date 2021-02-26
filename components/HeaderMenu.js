/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { Header, Right, Icon, Button, Item, Input, Body, StyleProvider } from 'native-base';
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';
import styles from '../style/components/HeaderMenuStyle';
import { displayMessage } from '../utilities/error/errorHandler';

/*
The HeaderMenu renders a header component with a search bar and and icon 
button which opens a filter menu.
*/
class HeaderMenu extends Component {
    constructor(props){
        super(props);
        this.state={
            search: null,
        }
    }

    /*
    Clears the search bar and triggers a request to the find api
    */
    async handleClear(){
        await this.setState({search:''});
        this.search();
    }

    /*
    Triggered when the users clicks the search icon. 
    If no search criteria is provided a toast message is displayed.
    */
    search(){
        const { searchCallback } = this.props;
        const { search } = this.state;
        console.log(search)
        if(search !== null){
            searchCallback(search);
        } else {
            displayMessage('Please enter search criteria');
        }
        
    }

    /*
    Open the filter menu when the user click the filter button.
    */
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