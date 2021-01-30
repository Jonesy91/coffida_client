import React, { Component } from 'react';
import { Text, Content, Left, Card, Grid, List, ListItem, Row } from 'native-base';
import IonIcons from 'react-native-vector-icons/Ionicons';
import StarRating from 'react-native-star-rating';

class Ratings extends Component{
    render(){
        return(
            <Grid>
                <Grid>
                    <Row>
                    <Text>Overall</Text>
                    <StarRating
                        disabled={false}
                        maxStars={5}
                        rating={this.props.ratings.overall}
                        emptyStar={'ios-star-outline'}
                        fullStar={'ios-star'}
                        halfStar={'ios-star-half'}
                        iconSet={'Ionicons'}
                        fullStarColor={'gold'}
                        starSize={20}
                    />
                    </Row>
                    <Row>
                    <Text>Price</Text>
                    <StarRating
                        disabled={false}
                        maxStars={5}
                        rating={this.props.ratings.price}
                        emptyStar={'ios-star-outline'}
                        fullStar={'ios-star'}
                        halfStar={'ios-star-half'}
                        iconSet={'Ionicons'}
                        fullStarColor={'gold'}
                        starSize={20}
                    />
                    </Row>
                    <Row>
                    <Text>Quality</Text>
                    <StarRating
                        disabled={false}
                        maxStars={5}
                        rating={this.props.ratings.quality}
                        emptyStar={'ios-star-outline'}
                        fullStar={'ios-star'}
                        halfStar={'ios-star-half'}
                        iconSet={'Ionicons'}
                        fullStarColor={'gold'}
                        starSize={20}
                    />
                    </Row>
                    <Row>
                    <Text>Clenliness</Text>
                    <StarRating
                        disabled={false}
                        maxStars={5}
                        rating={this.props.ratings.clenliness}
                        emptyStar={'ios-star-outline'}
                        fullStar={'ios-star'}
                        halfStar={'ios-star-half'}
                        iconSet={'Ionicons'}
                        fullStarColor={'gold'}
                        starSize={20}
                    />
                    </Row>
                </Grid>
            </Grid>
        )
    }

}

export default Ratings;