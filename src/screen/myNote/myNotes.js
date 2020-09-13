import React, { Component, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Alert,
    FlatList,
    Dimensions,
} from 'react-native';
import { FAB, TextInput, List } from 'react-native-paper';
import addNote from './addNote';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
//import { FlatList } from 'react-native-gesture-handler';


class myNotes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: []

        };
        console.disableYellowBox = true;
    }

    componentDidMount() {
        //get asyncStorage to get data for note list
        AsyncStorage.getItem('notes', (error, result) => {
            console.log('componentDidMount',result)
            this.setState({
                notes: JSON.parse(result)
            })
        })
    }

    async componentWillReceiveProps(preProps) {
        // this.state.notes.push(preProps.navigation?.state?.params?.data);
        // this.setState({
        //     notes: this.state.notes,
        // })
        
        // // Set asyncStorage to save note list
        // await AsyncStorage.setItem('notes', JSON.stringify(this.state.notes));
        console.log('componentWillReceiveProps')
        AsyncStorage.getItem('notes', (error, result) => {
            console.log('componentDidMount',result)
            this.setState({
                notes: JSON.parse(result)
            })
        })

    }
    async removeItemValue(key) {
        this.state.notes.splice(key, 1)
        this.setState({notes: this.state.notes})
        await AsyncStorage.setItem('notes', JSON.stringify(this.state.notes));
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <FlatList
                        data={this.state.notes}
                        renderItem={({ item, index }) => (
                            <View style={styles.note}>
                                <View style={styles.title_time}> 
                                    <View style={styles.item}>
                                        <Text style={styles.titleNote}>
                                            {item.noteTitle}
                                        </Text>
                                        <Text style={styles.date}>
                                            {item.date}
                                        </Text>
                                    </View>
                                </View>
                                <Icon 
                                    name='trash'
                                    size={28}
                                    style={styles.bntdelete}
                                        onPress={()=>this.removeItemValue(index)}        
                                />
                                <View style={{paddingTop: 10}}>
                                    <Text style={styles.descriptionNote}>{item.noteDescription}</Text>
                                </View>
                                
                                
                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                <FAB
                    style={styles.fab}
                    small
                    icon='plus'
                    label='Add a new Note'
                    onPress={() => this.props.navigation.navigate('AddNote')}
                />
            </View>
        )
    }
}


export default myNotes;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        //paddingHorizontal: 10,
        //paddingVertical: 20,
        flexDirection: 'row'
    },
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        borderRadius: 10,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    fab: {
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 0.1
    },
    note: {
        width: width,
        alignSelf: 'baseline',
        borderRadius: 10,
        backgroundColor: '#CCFFFF' ,
        alignItems: 'flex-start',
        marginBottom: 10,
        paddingLeft: 10

    },
    titleNote: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 10,
        paddingTop: 5,
        paddingRight: 30,
        color: '#0000dd'
    },
    descriptionNote: {
        fontSize: 15,
        paddingLeft: 10,
        paddingBottom: 10,
        paddingRight: 40,
        textAlign: 'justify',
    },
    date: {
        paddingLeft: 10,
        paddingBottom: 10,
        paddingRight: 30,
        color: '#FF9966'
    },  
    bntdelete: {
        position: 'absolute',
        backgroundColor: '#CCFFFF',
        top: 10,
        bottom: 10,
        right: 40,
        color: '#FF3333'
    },
    bottom: {
        height: 10
    },
    title_time: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
      },
    item: {
        width: '90%'
    }
})