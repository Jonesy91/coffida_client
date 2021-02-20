/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import {Button, Content,H1,  H3, Grid, Row, Text  ,View} from 'native-base';
import Slider from '@react-native-community/slider';

class FilterModal extends Component{
    constructor(props){
        super(props)
        this.state={
            overall: 0,
            price: 0,
            quality: 0,
            clenliness: 0,
        }
    }

    componentDidMount(){
        if(this.props.route.params.currentFilter !== null){
            this.setState({
                overall: this.props.route.params.currentFilter.overall,
                price: this.props.route.params.currentFilter.price,
                quality: this.props.route.params.currentFilter.quality,
                clenliness: this.props.route.params.currentFilter.clenliness,
            });
        }
    }

    applyFilters(){
        let filter = null;
        if(this.state.overall !== 0){
            filter = `overall_rating=${this.state.overall}`
        }
        if(this.state.price !== 0){
            if(filter !== null){
                filter += `&price_rating=${this.state.price}`
            } else {
                filter = `price_rating=${this.state.price}`
            }
        }
        if(this.state.quality !== 0){
            if(filter !== null){
                filter += `&quality_rating=${this.state.quality}`
            } else {
                filter = `quality_rating=${this.state.quality}`
            }
        }
        if(this.state.clenliness !== 0){
            if(filter !== null){
                filter += `&clenliness_rating=${this.state.clenliness}`
            } else {
                filter = `clenliness_rating=${this.state.clenliness}`
            }
        }
        console.log(this.props.route.params.route)
        this.props.navigation.navigate(this.props.route.params.route, {filter:filter, 
            currentFilter:{ 
                overall:this.state.overall,
                quality:this.state.quality,
                price:this.state.price,
                clenliness:this.state.clenliness
            }
        })
    }

    clear(){
        this.setState({
            overall:0,
            quality:0,
            price:0,
            clenliness:0
        });
    }

    render(){
        return(
            <Content contentContainerStyle={styles.content}>
                <View style={styles.view}>
                <H1>Filters</H1>
                <Grid style={styles.grid}>
                    <Row style={styles.row}>
                        <H3>Minimum Overall Rating</H3>
                    </Row>
                    <Row style={styles.row}>
                        <H3>{this.state.overall}</H3>
                    </Row>
                    <Row style={styles.row}>
                        <Slider 
                            style={{width: 300, height: 40}}
                            minimumValue={0}
                            maximumValue={5}
                            minimumTrackTintColor="#4391ab"
                            thumbTintColor="#4391ab"
                            maximumTrackTintColor="#000000"
                            step={1}
                            value={this.state.overall}
                            onValueChange={(value) => this.setState({overall:value})}
                        />
                    </Row>    
                </Grid>
                <Grid style={styles.grid}>
                    <Row style={styles.row}>
                        <H3>Minimum Price Rating</H3>
                    </Row>
                    <Row style={styles.row}>
                        <H3>{this.state.price}</H3>
                    </Row>
                    <Row style={styles.row}>
                        <Slider 
                            style={{width: 300, height: 40}}
                            minimumValue={0}
                            maximumValue={5}
                            minimumTrackTintColor="#4391ab"
                            thumbTintColor="#4391ab"
                            maximumTrackTintColor="#000000"
                            step={1}
                            value={this.state.price}
                            onValueChange={(value) => this.setState({price:value})}
                        />
                    </Row>     
                </Grid>
                <Grid style={styles.grid}>
                    <Row style={styles.row}>
                        <H3>Minimum Quality Rating</H3>
                    </Row>
                    <Row style={styles.row}>
                        <H3>{this.state.quality}</H3>
                    </Row>
                    <Row style={styles.row}>
                        <Slider 
                            style={{width: 300, height: 40}}
                            minimumValue={0}
                            maximumValue={5}
                            minimumTrackTintColor="#4391ab"
                            thumbTintColor="#4391ab"
                            maximumTrackTintColor="#000000"
                            step={1}
                            value={this.state.quality}
                            onValueChange={(value) => this.setState({quality:value})}
                        />
                    </Row>      
                </Grid>
                <Grid style={styles.grid}>
                    <Row style={styles.row}>
                        <H3>Minimum Clenliness Rating</H3>
                    </Row>
                    <Row style={styles.row}>
                        <H3>{this.state.clenliness}</H3>
                    </Row>
                    <Row style={styles.row}>
                        <Slider 
                            style={{width: 300, height: 40}}
                            minimumValue={0}
                            maximumValue={5}
                            minimumTrackTintColor="#4391ab"
                            thumbTintColor="#4391ab"
                            maximumTrackTintColor="#000000"
                            step={1}
                            value={this.state.clenliness}
                            onValueChange={(value) => this.setState({clenliness:value})}
                        />
                    </Row>
                    <Row style={styles.row}>
                        <Button block style={styles.applyBtn} onPress={() => this.clear()}><Text>Clear</Text></Button>
                        <Button block style={styles.applyBtn} onPress={() => this.applyFilters()}><Text>Apply</Text></Button>
                    </Row>   
                </Grid>
                
                <Button block style={styles.closeBtn} onPress={() => this.props.navigation.goBack()}><Text>Close</Text></Button>
                </View>
            </Content>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        backgroundColor:'white'
    },
    view:{
        margin: 10,
    },
    grid:{
        margin: 10
    },
    row:{
        display: 'flex',
        justifyContent:'center',
        marginTop: 5,
        marginBottom: 5
    },
    button:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#2f6678'
    },
    text:{
        color: '#2f6678',
        fontSize: 20
    },
    applyBtn:{
        backgroundColor:'#4391ab',
        marginHorizontal: 30,
        width: 100

    },
    closeBtn:{
        marginTop: 20,
        marginBottom:5,
        backgroundColor:'#4391ab',
    }
});

export default FilterModal;