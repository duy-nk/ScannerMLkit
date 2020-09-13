import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Dimensions,
    PermissionsAndroid
} from 'react-native';
import { FAB, TextInput} from 'react-native-paper';
//import Contacts from 'react-native-contacts';

// PermissionsAndroid.request(
//     PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
//     {
//       'title': 'Contacts',
//       'message': 'This app would like to view your contacts.',
//       'buttonPositive': 'Please accept bare mortal'
//     }
//   ).then(() => {
//     Contacts.getAll((err, contacts) => {
//       if (err === 'denied'){
//         // error
//       } else {
//         // contacts returned in Array
//       }
//     })
// })

class ReviewCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //phoneNumber: this.props?.navigation?.state?.params?.data
            fullName: '',
            numberPhone: this.props?.navigation?.state?.params?.data?.phones[0],
            otherNumberPhone: this.props?.navigation?.state?.params?.data?.phones[1],
            email: this.props?.navigation?.state?.params?.data?.emails[0],
            otherEmail: this.props?.navigation?.state?.params?.data?.emails[1],
            
        }
        console.disableYellowBox = true;
    }
    // addContact() {
    //     var newPerson = {
    //         emailAddresses: [{
    //           label: "work",
    //           email: "mrniet@example.com",
    //         }],
    //         familyName: "Nietzsche",
    //         givenName: "Friedrich",
    //         phoneNumbers: [{
    //             label: 'mobile',
    //             number: '(555) 555-5555',
    //         }],
    //     }
    //     Contacts.addContact(newPerson, (err, contact) => {       
    //         if (err) throw err;
    //         //contact updated
    //     });
    // }
    render() {
        console.log('man hinh review',this.props?.navigation?.state?.params?.data);
        console.log('new contact', this.newPerson)
        return(
            <View style={styles.container}>
                <View style={styles.headerView}>
                    <Text style={styles.headerText}>Card Infomations</Text>
                </View>
                <View style={styles.options}>
                    <Text style={styles.titleName}>Name of the person</Text>
                    <TextInput
                        label='Name'
                        value={this.state.fullName}
                        mode='outlined'
                        onChangeText={ value => this.setState({fullName: value}) }
                        style={styles.titleData}
                    />
                </View>
                
                <View style={styles.options}>
                    <Text style={styles.titleName}>Phone Number</Text>
                    <TextInput
                        label='phone number'
                        value={this.state.numberPhone}
                        mode='outlined'
                        onChangeText={(value) => {
                            this.setState({numberPhone: value})
                        }}
                        style={styles.titleData}
                    />
                </View>
                <View style={styles.options}>
                    <Text style={styles.titleName}>Other Phone Number</Text>
                    <TextInput
                        label='other phone number'
                        value={this.state.otherNumberPhone}
                        mode='outlined'
                        onChangeText={(value) => {
                            this.setState({otherNumberPhone: value})
                        }}
                        style={styles.titleData}
                    />
                </View>
                <View style={styles.options}>
                    <Text style={styles.titleName}>Email</Text>
                    <TextInput
                        label='email'
                        value={this.state.email}
                        mode='outlined'
                        onChangeText={ value => this.setState({email: value}) }
                        style={styles.titleData}
                    />
                </View>
                <View style={styles.options}>
                    <Text style={styles.titleName}>Other Email</Text>
                    <TextInput
                        label='orther email'
                        value={this.state.otherEmail}
                        mode='outlined'
                        onChangeText={ value => this.setState({otherEmail: value}) }
                        style={styles.titleData}
                    />
                </View>
                <View style={{paddingTop: 55}}></View>
                <FAB
                    style={styles.fab}
                    small
                    icon='plus'
                    label='Add to contact'
                    //onPress={() => {this.addContact()}}
                />
            </View>
        )
    }
}

export default ReviewCard;

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
        right: 0,
        bottom: 2,
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