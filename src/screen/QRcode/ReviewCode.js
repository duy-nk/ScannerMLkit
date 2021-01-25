import React, { Component, useCallback } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Dimensions,
    PermissionsAndroid,
    Linking
} from 'react-native';
import { FAB, TextInput} from 'react-native-paper';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class ReviewCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: this.props?.navigation?.state?.params?.data?.displayValue || ""
        }

        console.log("ReviewCode",this.props?.navigation?.state?.params?.data)
        //console.disableYellowBox = true;
    }
    
    render() {
        //console.log('man hinh review',this.props?.navigation?.state?.params?.data);
        //console.log('man hinh review')
        var contents = this.props?.navigation?.state?.params?.data?.displayValue || ''
        var urlRegex = /(https?:\/\/[^\s]+)/g;
        var url = '';
        contents.match(urlRegex) ? (url = contents) : url = 'https://www.google.com/search?q=' + contents;
        console.log('tim dc link: ', contents);
        
        //https://www.google.com/search?q=
        const handleClick = (url) => {
            Linking.canOpenURL(url).then(supported => {
                if (supported) {
                    Linking.openURL(url)
                } else {
                    console.log('do not how to open link');
                }
            })
        }
             
        return(
            <View style={styles.container}>
                <View style={styles.headerView}>
                    <Text style={styles.headerText}>Code Infomations</Text>
                </View>
                {   
                    contents != '' ? 
                    <View style={styles.options}>
                        <Text style={styles.titleName}>Contents:</Text>
                        <TextInput
                            label=''    
                            value={this.state.code}
                            mode='outlined'
                            onChangeText={(value) => {
                                this.setState({code: value})
                            }}
                            style={styles.titleData}
                        />
                    </View>
                    :
                    <View style={styles.options}>
                        <Text style={styles.titleName}>Contents:</Text>
                        <TextInput
                            label='khong tim thay du lieu, xin thu lai'    
                            value={this.state.code}
                            mode='outlined'
                            style={styles.titleData}
                        />
                    </View>
                }
                {url != 'https://www.google.com/search?q=' ? 
                    <FAB
                        style={styles.fab}
                        small
                        icon='plus'
                        label='Open in brower'
                        onPress={() => handleClick(url)}
                    />
                    : 
                    <Text></Text>
                }
                <View style={{paddingTop: 55}}></View>
            </View>
        )
    }
}

export default ReviewCode;

const styles = StyleSheet.create({
    container: {
        margin: 10
    },
    headerView: {
        alignItems: 'center',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 20
    },
    fab: {
        //backgroundColor: '',
        position: 'absolute',
        margin: 20,
        right: width/5,
        bottom: height/5 - 590,
        //marginTop: 500
    },
    titleName: {
        fontSize: 16,
        color: 'blue',
        fontWeight: 'bold'
    },
    titleData: {
        fontSize: 16,
        marginBottom: 16,
        width: 410,


    },
    options: {
        paddingBottom: 10,
    }
})