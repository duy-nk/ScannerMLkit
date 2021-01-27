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
import Contacts, { addContact } from 'react-native-contacts';

    const requestContactPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
              title: "Cool Photo App Camera Permission",
              message:
                "Cool Photo App needs access to your camera " +
                "so you can take awesome pictures.",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the contact");
          } else {
            console.log("Contact permission denied");
          }
        } catch (err) {
          console.warn(err);
        }
      };

    openContactPicker = () => {
        let number = this.props?.navigation?.state?.params?.data?.phones[0] || '' //replace with any number
        let email = this.props?.navigation?.state?.params?.data?.emails[0] || '';
        let newPerson = {
          phoneNumbers: [{
            label: "mobile",
            number: number,
          }],
          emailAddresses: [{
            label: "work",
            email: email,
          }],
        };
  
        Contacts.openContactForm(newPerson, (err) => {
          if (err) console.warn(err) ;
          // form is open
        });
    };
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
    
    render() {
        console.log('man hinh review',this.props?.navigation?.state?.params?.data);
        console.log('new contact', this.newPerson)
        var numberPhone = this.props?.navigation?.state?.params?.data?.phones[0] || ''
        var email = this.props?.navigation?.state?.params?.data?.emails[0] || ''
        return(
            <View style={styles.container}>
                <View style={styles.headerView}>
                    <Text style={styles.headerText}>Card Infomations</Text>
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
                    <Text style={styles.titleName}>Email</Text>
                    <TextInput
                        label='email'
                        value={this.state.email}
                        mode='outlined'
                        onChangeText={ value => this.setState({email: value}) }
                        style={styles.titleData}
                    />
                </View>
                <View style={{paddingTop: 55}}></View>
                {
                    numberPhone != '' ?
                        <FAB
                            style={styles.fab}
                            small
                            icon='plus'
                            label='Add to contact'
                            onPress={
                                openContactPicker = () => {
                                    let number = this.state.numberPhone //replace with any number
                                    let email = this.state.email
                                    let newPerson = {
                                        phoneNumbers: [{
                                            label: "mobile",
                                            number: number,
                                        }],
                                        emailAddresses: [{
                                            label: "work",
                                            email: email,
                                        }],
                                    };
                                    Contacts.openContactForm(newPerson, (err) => {
                                        if (err) console.warn(err) ;
                                        // form is open
                                        });
                                }
                                //openContactPicker
                            }
                        /> : 
                        <Text></Text>
                }
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