
import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    Image,
} from 'react-native';
import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { RNCamera } from 'react-native-camera';
import { utils } from '@react-native-firebase/app';
import vision from '@react-native-firebase/ml-vision';


import ScanTextAssets from './textReco/ScanText';


const {width, height} = Dimensions.get('window');

class ScanTextScreen extends Component {
    render() {
        return (
            <ScrollView>
                <View>
                    <Image 
                        source={require('../images/task.png')}
                        style={styles.taskImage}
                    />
                </View>
                <View
                    style={{
                        marginTop: 20
                    }}
                >
                    <Text
                        style={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: 18,
                            marginBottom: 20
                        }}
                    >
                        Scan what ever you want
                    </Text>
                </View>
                <View style={styles.options}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('MyNotes')}>
                        <View style={styles.container}>
                            <View style={styles.item}>
                                <Image
                                    source={require('../images/note.png')}
                                    style={styles.optionsImage}
                                />
                            </View>
                            <View style={styles.item}>
                                <View>
                                    <Text style={styles.nameOptions}>
                                        My note
                                    </Text>
                                </View>
                                <View>
                                    <Text style={styles.explainOptions}>
                                    With Bcard, you can take notes about your work, study, necessary personal information or everything in your life and more.
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.options}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ScanTextAssets')}>
                        <View style={styles.container}>
                            <View style={styles.item}>
                                <Image
                                    source={require('../images/reco.png')}
                                    style={styles.optionsImage}
                                />
                            </View>
                            <View style={styles.item}>
                                <View>
                                    <Text style={styles.nameOptions}>
                                        Text Recognition
                                    </Text>
                                </View>
                                <View>
                                    <Text style={styles.explainOptions}>
                                        They can also be used to automate data-entry tasks such as processing credit cards, receipts, and business cards
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.options}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ScanCard')}>
                        <View style={styles.container}>
                            <View style={styles.item}>
                                <Image
                                    source={require('../images/cardscan.png')}
                                    style={styles.optionsImage}
                                />
                            </View>
                            <View style={styles.item}>
                                <View>
                                    <Text style={styles.nameOptions}>
                                        Business Card scanning
                                    </Text>
                                </View>
                                <View>
                                    <Text style={styles.explainOptions}>
                                        With ML Kit's barcode scanning API, you can read data encoded using most standard barcode formats.
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.options}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ScanCode')}>
                        <View style={styles.container}>
                            <View style={styles.item}>
                                <Image
                                    source={require('../images/barcode.png')}
                                    style={styles.optionsImage}
                                />
                            </View>
                            <View style={styles.item}>
                                <View>
                                    <Text style={styles.nameOptions}>
                                        Barcode/QRcode scanning
                                    </Text>
                                </View>
                                <View>
                                    <Text style={styles.explainOptions}>
                                    When using 2D formats such as QR code, you can encode structured data such as contact information or WiFi network credentials. 
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
};

           

const styles = StyleSheet.create({
    options: {
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        height: 130,
        width: width - 20,
        marginRight: 10,
        marginLeft: 10,
        borderRadius: 20,
        marginBottom: 10,
        marginTop: 3,
        flex: 1,
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignItems: 'flex-start'
    },
    taskImage: {
        height: height/2 - 50,
        width: width,
        backgroundColor: '#000077'
    },
    optionsImage: {
        marginLeft: width/12,
        height: 120,
        width: 120,
        resizeMode: 'center'
        

    },
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start' // if you want to fill rows left to right
    },
    item: {
        width: '50%' // is 50% of container width
    },
    nameOptions: {
        fontSize: 16,
        color: '#0000dd',
        fontWeight: 'bold',
        textAlign: 'justify'
    },
    explainOptions: {
        fontSize: 15,
        //textAlign: 'justify',
    }
});

export default ScanTextScreen;

