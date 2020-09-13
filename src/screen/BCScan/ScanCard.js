
import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Alert,
    
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import vision from '@react-native-firebase/ml-vision';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';


class ScanCard extends Component {
    state = {
        document: '',
        spinner: false
    }
    render() {
        return (
            <View style = {styles.container}>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                />
                <RNCamera
                    style = {styles.preview}
                    type = {RNCamera.Constants.Type.back}
                    //flashMode = {RNCamera.Constants.FlashMode.on}
                    captureAudio={false}
                    androidCameraPermissionOptions = {{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    androidRecordAudioPermissionOptions = {{
                        title: 'Permission to use audio recording',
                        message: 'We need your permission to use yor audio',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                >
                    {({camera, status, androidRecordAudioPermissionOptions}) => {
                        return (
                            <View>
                                <Icon
                                    name = 'camera'
                                    onPress = {() => this.takePicture(camera)}
                                    size={50}
                                    color='white'
                                >
                                </Icon>
                                <Text
                                    style={{color: 'white'}}
                                >
                                    Capture
                                </Text>
                                
                            </View>
                        )
                    }}
                </RNCamera>
                <View>
                    <Text>value</Text>
                </View>
            </View>
        )
    }
    takePicture = async function(camera) {
        this.setState({ spinner: true });
        try {
            const options = { 
                quality: 0.5, 
                base64: true 
            };
            const data = await camera.takePictureAsync(options);
            const processed = await vision().textRecognizerProcessImage(data.uri);
            let PhoneNumberFormat = /((0|84)+([0-9]{1})+([0-9]{8}))|(1[0-9]{7})\b/
            let phoneList = [];
            processed.text?.split('\n')?.map((text, index) => {
                let doc = text.replace(/[ ,(,),-,+,.]/g,'');
                let phoneNumber = doc.match(PhoneNumberFormat);
                if (phoneNumber) {
                    phoneList.push(phoneNumber[0])
                }
                
            })
            
            let emailFormat = /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/
            let emailList = [];
            processed.text?.split('\n')?.map((text, index) => {
                let doc = text.replace(/[ ,(,),-,+]/g,'');
                let email = doc.match(emailFormat);
                if (email) {
                    emailList.push(email[0])
                }
            })
            console.log('tim e maill', emailList)
            //console.log(phoneList);
            this.setState({ spinner: false }, () => {
                this.props.navigation.navigate('ReviewCard', {
                    data: {
                        phones: phoneList,
                        emails: emailList,
                    }
                })
                //alert(result);
            })
            
        } catch (error) {
            
        }
    }
    
};

           

const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF'
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
      },
      preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
});

export default ScanCard;

