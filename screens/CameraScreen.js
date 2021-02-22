/* eslint-disable react/jsx-filename-extension */
import { Button, Content, View } from 'native-base';
import React, { Component } from 'react';
import { RNCamera } from 'react-native-camera';
import { StyleSheet } from 'react-native';

class CameraScreen extends Component{

    async takePicture() {
        const { navigation } = this.props;
        if(this.camera){
            const options = { quality:0.5, base64: true}
            const data = await this.camera.takePictureAsync(options);
            navigation.navigate('writeReview', {photo:data});
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
                    <View style={styles.captureContainer}>
                        <Button onPress={() => {this.takePicture()}} style={styles.capture} />
                    </View>
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

export default CameraScreen;