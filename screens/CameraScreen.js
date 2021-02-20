import { Button, Content, Text, View } from 'native-base';
import React, { Component } from 'react';
import { RNCamera } from 'react-native-camera';
import { Dimensions, StyleSheet } from 'react-native';

class CameraScreen extends Component{

    takePicture = async () => {
        if(this.camera){
            const options = { quality:0.5, base64: true}
            const data = await this.camera.takePictureAsync(options);
            console.log(data.uri);
            this.props.navigation.navigate('writeReview', {photo:data});
        }
    }
    render(){
        return(
            <Content contentContainerStyle={styles.container}>
                <RNCamera
                    ref={ref=> {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                />
                <View>
                    <Button onPress={() => {this.takePicture()}} style={styles.capture} />
                </View>
            </Content>
        )
    }
}

const styles = StyleSheet.create({
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
        height: 80

      },
});

export default CameraScreen;