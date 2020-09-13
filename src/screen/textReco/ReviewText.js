
import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import ScanText from './ScanText';
import { TextInput } from 'react-native-gesture-handler';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


class ReviewText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            note: this.props?.navigation?.state?.params?.data,
            noteTitle: '',
        } 
    }
    async Save() {
        AsyncStorage.getItem('notes', (error, result) => {
            let notes = JSON.parse(result) || [];
            try {
                let noteTitle = this.state.noteTitle
                let noteDescription =  this.state.note
                let date = moment().format('DD/MM/YYYY HH:mm');
                const data = {
                    noteTitle: noteTitle,
                    date: date,
                    noteDescription: noteDescription
                }

                notes.push(data);
                let noteList =  JSON.stringify(notes);
                AsyncStorage.setItem('notes', noteList).then(() => {
                    this.props.navigation.navigate('MyNotes', { refresh: true })
                });
            } catch (error) {
                
            }
        })
    }
    render() {
        console.log(this.props?.navigation?.state)
        return (
            <View>
                <View style={styles.viewdoc}>
                    <TextInput
                        multiline
                        numberOfLines={50}
                        value={this.state.note}
                        onChangeText={(value) => {
                            this.setState({ note: value });
                        }}
                        style = {styles.doc}
                    />
                </View>

                <View>
                    <TextInput
                        style = {{ 
                            height: 40, 
                            borderColor: 'gray', 
                            marginLeft: 10,

                        }}
                        placeholder = 'You can save them to your note by enter their name'
                        value = {this.state.noteTitle} 
                        onChangeText={(value) => this.setState({noteTitle: value})}
                        
                    />     
                </View>
                <View
                    style={{
                    borderBottomColor: 'gray',
                    borderBottomWidth: 1,
                    marginTop: 5,
                    marginLeft: 10,
                    marginRight: 10
                    }}
                />
                <View>
                    <TouchableOpacity
                        style = {styles.btSave}
                        onPress={() => this.Save()}
                    >
                        <Text
                            style={{ 
                            fontSize: 14, 
                            fontWeight: '600', 
                            color: 'black' 
                        }}
                        >
                            Save
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            
        )
    }
}
export default ReviewText;

const styles = StyleSheet.create({
    viewdoc: {
        backgroundColor: '#CCFFFF',
        borderRadius: 5,
        height: height - 185,
        margin: 2
    },
    doc: {
        fontSize: 16,
        textAlignVertical: 'top',
        alignItems: 'flex-start',
        padding: 10,
        flex: 1,
        //textAlign: 'justify'
        
    },
    btSave: {
        alignItems: 'center',
        backgroundColor: '#00CCCC',
        padding: 10,
        height: 40,
        width: 130,
        alignSelf: 'flex-end',
        marginRight: 10,
        borderRadius: 5,
        marginBottom: 5,
        marginTop: 10,
        fontWeight: 'bold'
        
    }
})
