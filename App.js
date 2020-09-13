
import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
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
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './src/screen/HomeScreen';
import ScanTextAssets from './src/screen/textReco/ScanText';
import ReviewText from './src/screen/textReco/ReviewText';
import MyNotes from './src/screen/myNote/myNotes';
import AddNote from './src/screen/myNote/addNote';
import ScanCard from './src/screen/BCScan/ScanCard';
import ReviewCard from './src/screen/BCScan/ReviewCard';

const AppNavigator = createStackNavigator(
    {
    
        Home: {
            screen: Home,
            navigationOptions: ({navigation}) =>({
                headerShown: false
            })
        },
        ScanTextAssets: {
            screen: ScanTextAssets,
            navigationOptions: ({navigation}) =>({
                headerShown: false
            })
        },
        ReviewText: {
            screen: ReviewText,
            navigationOptions: ({navigation}) =>({
                //headerShown: false
            })
        },
        MyNotes: {
            screen: MyNotes,
            navigationOptions: ({navigation}) => ({

            })
        },
        AddNote: {
            screen: AddNote,
            navigationOptions: ({navigation}) => {
                
            }
        },
        ScanCard: {
            screen: ScanCard,
            navigationOptions: ({navigation}) => ({
                headerShown: false
            })
        },
        ReviewCard: {
            screen: ReviewCard,
            navigationOptions: ({navigation}) =>({
                headerShown: false
            })
        },
    },
    {
        initialRouteName: 'Home',
        
    }
)

const AppContainer = createAppContainer(AppNavigator);

class App extends Component {
    render() {
        return (
            <AppContainer/>
        )
    }
};

export default App;

