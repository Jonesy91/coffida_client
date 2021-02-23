/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import {Button, Content,H1,  H3, Grid, Row, Text  ,View} from 'native-base';
import Slider from '@react-native-community/slider';
import styles from '../../style/screens/FilterModalStyle';

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
        const { route } = this.props;
        if(route.params.currentFilter !== null){
            this.setState({
                overall: route.params.currentFilter.overall,
                price: route.params.currentFilter.price,
                quality: route.params.currentFilter.quality,
                clenliness: route.params.currentFilter.clenliness,
            });
        }
    }

    applyFilters(){
        const { overall, price, quality, clenliness } = this.state;
        const { navigation, route } = this.props;
        let filter = null;
        if(overall !== 0){
            filter = `overall_rating=${overall}`
        }
        if(price !== 0){
            if(filter !== null){
                filter += `&price_rating=${price}`
            } else {
                filter = `price_rating=${price}`
            }
        }
        if(quality !== 0){
            if(filter !== null){
                filter += `&quality_rating=${quality}`
            } else {
                filter = `quality_rating=${quality}`
            }
        }
        if(clenliness !== 0){
            if(filter !== null){
                filter += `&clenliness_rating=${clenliness}`
            } else {
                filter = `clenliness_rating=${clenliness}`
            }
        }
        navigation.navigate(route.params.route, {filter, 
            currentFilter:{ 
                overall,
                quality,
                price,
                clenliness
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
        const { overall, price, quality, clenliness } = this.state;
        const { navigation } = this.props;
        const minimumTrackTintColor="#4391ab";
        const thumbTintColor="#4391ab";
        return(
            <Content contentContainerStyle={styles.content}>
                <View style={styles.view}>
                <H1>Filters</H1>
                <Grid style={styles.grid}>
                    <Row style={styles.row}>
                        <H3>Minimum Overall Rating</H3>
                    </Row>
                    <Row style={styles.row}>
                        <H3>{overall}</H3>
                    </Row>
                    <Row style={styles.row}>
                        <Slider 
                            style={{width: 300, height: 40}}
                            minimumValue={0}
                            maximumValue={5}
                            minimumTrackTintColor={minimumTrackTintColor}
                            thumbTintColor={thumbTintColor}
                            step={1}
                            value={overall}
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
                            minimumTrackTintColor={minimumTrackTintColor}
                            thumbTintColor={thumbTintColor}
                            step={1}
                            value={price}
                            onValueChange={(value) => this.setState({price:value})}
                        />
                    </Row>     
                </Grid>
                <Grid style={styles.grid}>
                    <Row style={styles.row}>
                        <H3>Minimum Quality Rating</H3>
                    </Row>
                    <Row style={styles.row}>
                        <H3>{quality}</H3>
                    </Row>
                    <Row style={styles.row}>
                        <Slider 
                            style={{width: 300, height: 40}}
                            minimumValue={0}
                            maximumValue={5}
                            minimumTrackTintColor={minimumTrackTintColor}
                            thumbTintColor={thumbTintColor}
                            step={1}
                            value={quality}
                            onValueChange={(value) => this.setState({quality:value})}
                        />
                    </Row>      
                </Grid>
                <Grid style={styles.grid}>
                    <Row style={styles.row}>
                        <H3>Minimum Clenliness Rating</H3>
                    </Row>
                    <Row style={styles.row}>
                        <H3>{clenliness}</H3>
                    </Row>
                    <Row style={styles.row}>
                        <Slider 
                            style={styles.slider}
                            minimumValue={0}
                            maximumValue={5}
                            minimumTrackTintColor={minimumTrackTintColor}
                            thumbTintColor={thumbTintColor}
                            step={1}
                            value={clenliness}
                            onValueChange={(value) => this.setState({clenliness:value})}
                        />
                    </Row>
                    <Row style={styles.row}>
                        <Button primary block style={styles.applyBtn} onPress={() => this.clear()}><Text>Clear</Text></Button>
                        <Button primary block style={styles.applyBtn} onPress={() => this.applyFilters()}><Text>Apply</Text></Button>
                    </Row>   
                </Grid>
                
                <Button primary block style={styles.closeBtn} onPress={() => navigation.goBack()}><Text>Close</Text></Button>
                </View>
            </Content>
        );
    }
}

export default FilterModal;