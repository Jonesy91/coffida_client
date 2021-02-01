import { Content, Text, H3, Textarea, Grid, Row, Button } from 'native-base';
import React, { Component } from 'react';
import StarRating from 'react-native-star-rating';
import AsyncStorage from '@react-native-async-storage/async-storage';

class WriteReviewScreen extends Component{
    constructor(props){
        super(props)
        this.state={
            comments:'',
            overallRating:0,
            priceRating:0,
            qualityRating:0,
            clenlinessRating:0
        }
    }
    setOverall(rating){
        this.setState({overallRating:rating});
    }
    setPrice(rating){
        this.setState({priceRating:rating});
    }
    setQuality(rating){
        this.setState({qualityRating:rating});
    }
    setClenliness(rating){
        this.setState({clenlinessRating:rating});
    }
    submitReview = () => {
        const body = {
            overall_rating:this.state.overallRating,
            price_rating:this.state.priceRating,
            quality_rating:this.state.qualityRating,
            clenliness_rating:this.state.clenlinessRating,
            review_body:this.state.comments
        }
        this.getAuthKey().then( response => {
            const id = this.props.route.params.locationId;
            fetch('http://10.0.2.2:3333/api/1.0.0/location/'+id+'/review', {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'X-Authorization': response
                },
                body:JSON.stringify(body)
            });
        });    
    }
    getAuthKey = async () => {
        try{
            const token = await AsyncStorage.getItem('@userKey');
            if(token !== null){
                return token;
            }
            else{
                throw error('null object');
            }
        } catch (e) {
            console.log(e);
        }
    }

    render(){
        return(
            <Content>
                <H3>Select a rating for each category</H3>
                <Grid>
                    <Row>
                        <Text>Overall</Text>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            rating={this.state.overallRating}
                            emptyStar={'ios-star-outline'}
                            fullStar={'ios-star'}
                            halfStar={'ios-star-half'}
                            iconSet={'Ionicons'}
                            fullStarColor={'gold'}
                            starSize={30}
                            halfStarEnabled={true}
                            selectedStar={(rating) => this.setOverall(rating)}
                        />
                    </Row>
                    <Row>
                        <Text>Price</Text>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            rating={this.state.priceRating}
                            emptyStar={'ios-star-outline'}
                            fullStar={'ios-star'}
                            halfStar={'ios-star-half'}
                            iconSet={'Ionicons'}
                            fullStarColor={'gold'}
                            starSize={30}
                            halfStarEnabled={true}
                            selectedStar={(rating) => this.setPrice(rating)}
                        />
                    </Row>
                    <Row>
                        <Text>Quality</Text>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            rating={this.state.qualityRating}
                            emptyStar={'ios-star-outline'}
                            fullStar={'ios-star'}
                            halfStar={'ios-star-half'}
                            iconSet={'Ionicons'}
                            fullStarColor={'gold'}
                            starSize={30}
                            halfStarEnabled={true}
                            selectedStar={(rating) => this.setQuality(rating)}
                        />
                    </Row>
                    <Row>
                        <Text>Clenliness</Text>
                        <StarRating
                            maxStars={5}
                            rating={this.state.clenlinessRating}
                            emptyStar={'ios-star-outline'}
                            fullStar={'ios-star'}
                            halfStar={'ios-star-half'}
                            iconSet={'Ionicons'}
                            fullStarColor={'gold'}
                            starSize={30}
                            halfStarEnabled={true}
                            selectedStar={(rating) => this.setClenliness(rating)}
                        />
                    </Row>
                </Grid>
                <H3>Comments</H3>
                <Textarea rowSpan={10} bordered placeholder="Add a comment" onChangeText={(comment) => this.setState({comments:comment})}/>
                <Button rounded onPress={this.submitReview}><Text>Submit</Text></Button>
            </Content>        
        )
    }
}

export default WriteReviewScreen;