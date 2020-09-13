import React, { Component, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    StatusBar,
    TouchableOpacity,
    Alert,
    
} from 'react-native';
import {Text, IconButtom, TextInput, FAB} from 'react-native-paper';
import { Assets } from 'react-navigation-stack';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

class addNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noteTitle:'',
            noteDescription:''
        } 
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    label='Title'
                    value={this.state.noteTitle}
                    mode='outlined'
                    onChangeText={ value => this.setState({noteTitle: value}) }
                    style={styles.title}
                />
                <TextInput 
                    label='Description'
                    value={this.state.noteDescription}
                    mode='flat'
                    multiline={true}
                    onChangeText={ (value) => this.setState({noteDescription: value})}
                    style={styles.text}
                    scrollEnabled={true}
                    returnKeyLabel='done'
                    blurOnSubmit={true}
                />
                <FAB 
                    style={styles.fab}
                    small
                    icon='check'
                    onPress = {()=> this.onSaveNote()}
                />
            </View>
        )
    }

    onSaveNote = async function() {
        AsyncStorage.getItem('notes', (error, result) => {
            let notes = JSON.parse(result) || [];
            try {
                let noteTitle = this.state.noteTitle
                let noteDescription =  this.state.noteDescription
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
}


export default addNote;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 20,
    },

    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    title: {
        fontSize: 24,
        marginBottom: 16
    },
    text: {
        fontSize: 16,
        height: 300
    },
    fab: {
        //backgroundColor: '',
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 10
    }
})