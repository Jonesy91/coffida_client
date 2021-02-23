import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
  },
  slider:{
      width: 300, 
      height: 40
  }
});