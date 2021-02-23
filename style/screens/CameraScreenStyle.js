import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black'
      },
      preview: {
        flex:1,
        justifyContent: 'flex-end',
        alignItems:'center'
        
      },
      capture: {
        flex: 0,
        backgroundColor:'#fff',
        borderRadius: 50,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
        width: 80,
        height: 80,
        borderWidth:2,
        borderColor: 'black'

      },
      captureContainer:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff',
        borderRadius: 50,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
        width: 90,
        height: 90
      }
});