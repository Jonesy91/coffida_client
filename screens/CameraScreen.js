import { Button, Content, Text } from 'native-base';
import React, { Component } from 'react';
import { RNCamera } from 'react-native-camera';
import { StyleSheet } from 'react-native';

class CameraScreen extends Component{

    takePicture = async () => {
        if(this.camera){
            const options = { quality:0.5, base64: true}
            const data = await this.camera.takePictureAsync(options);
            console.log(data.uri);
        }
    }
    render(){
        return(
            <Content style={styles.container}>
                <RNCamera
                    ref={ref=> {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    />
                <Button onPress={() => {this.takePicture()}} style={styles.capture}><Text>Take Photo</Text></Button>    
            </Content>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
      },
      preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      capture: {
        flex: 0,
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
      },
});

export default CameraScreen;