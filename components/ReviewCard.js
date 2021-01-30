import { Card, CardItem, Content, Body, Text } from 'native-base';
import React, { Component } from 'react';
import Ratings from './Ratings';
import Like from './Like';

class ReviewCard extends Component {
    constructor(props){
        super(props)
        this.state={
            ratings:{
                overall:this.props.review.review_overallrating,
                price:this.props.review.review_pricerating,
                quality:this.props.review.review_qualityrating,
                clenliness:this.props.review.review_clenlinessrating
            }
        }
    }
    
    render(){
        return(
            <Card>
                <CardItem>
                    <Body>
                        <Text>{this.props.review.review_body}</Text>
                    </Body>
                </CardItem>
                <CardItem>
                    <Ratings ratings={this.state.ratings}
                    />
                </CardItem>
                <CardItem>
                    <Like likes={this.props.review.likes}/>
                </CardItem>
            </Card>
        )
    };
}

export default ReviewCard;