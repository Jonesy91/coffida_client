import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    image: {
        height: 250, 
        width: null, 
        flex: 1
    },
    icon: {
        fontSize:30,
        color: '#4391ab'
    },
    content: {
        backgroundColor: 'white'
    },
    grid: {
        margin: 10,
    },
    ratingGrid:{
        margin: 10,
        borderBottomColor: '#0f84ab',
        borderTopColor: '#0f84ab',
        borderTopWidth: 2,
        borderBottomWidth:2,
        paddingTop: 20,
        paddingBottom: 20

    },
    row:{
        margin: 10,

    },
    col:{
        display:'flex',
        justifyContent:'flex-end',
        alignItems: 'flex-end'
    },
    favBtn:{
        shadowColor:'#000',
        shadowOpacity:0.23,
        shadowRadius:2.62,
        shadowOffset: {width:0,height:2},
        elevation:4,
        borderRadius: 50,
        width: 65,
        height: 65,
        justifyContent: 'center',
        alignItems: 'center',
        display:'flex',
        backgroundColor:'white'

    },
});