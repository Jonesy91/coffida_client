import React, { Component } from 'react';
import { Header, Right, Icon, Button } from 'native-base';


class HeaderMenu extends Component {
    render(){
        return(
            <Header>
                <Right>
                    <Button transparent>
                        <Icon name='md-options' style={{color:'black', fontSize:30}}/>
                    </Button>
                </Right>
            </Header>
        )
    }
}

const styles = {

}

export default HeaderMenu;