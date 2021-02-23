/* eslint-disable react/jsx-filename-extension */
import { Button, Content, View } from 'native-base';
import React, { Component } from 'react';
import { RNCamera } from 'react-native-camera';
import styles from '../style/screens/CameraScreenStyle';

class CameraScreen extends Component{

    async takePicture() {
        const { navigation, route } = this.props;
        const { caller } = route.params;
        if(this.camera){
            const options = { quality:0.5, base64: true}
            const data = await this.camera.takePictureAsync(options);
            navigation.navigate(caller, {photo:data});
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

export default CameraScreen;