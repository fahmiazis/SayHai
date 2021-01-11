import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native'
import {Item, Input} from 'native-base'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import Icon2 from 'react-native-vector-icons/Feather'
import Icon3 from 'react-native-vector-icons/MaterialIcons'

import {connect} from 'react-redux'
import {Formik} from 'formik';
import * as yup from 'yup';
import auth from '../redux/actions/auth'

const formSchema = yup.object({
    phone: yup.number().required('input your phone number'),
  });


class RegisterPhone extends Component {

    register = async (values) => {
        ToastAndroid.show('Waiting...', ToastAndroid.LONG);
        await this.props.register(values)
        const { alertMsg } = this.props.auth
        if (alertMsg == 'Login succesfully') {
            ToastAndroid.show('Login succesfully', ToastAndroid.LONG);
            this.props.simulation()
        } else if(alertMsg == 'register succesfully'){
            ToastAndroid.show('Register succesfully', ToastAndroid.LONG);
            this.props.navigation.navigate('RegisterProfile')
        }
    }

    render() {
        return (
            <ScrollView style={style.superParent}>
            <View style={style.parent}>
                <View style={style.header}>
                    <View style={style.headerTitle}>
                        <Text style={style.title}>Enter your phone number</Text>
                    </View>
                    <View style={style.headerIcon}>
                        <TouchableOpacity>
                            <Icon style={style.icon} name="options-vertical" size={20} />
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={style.textHead}>SayHai! will send an SMS message to verify your phone number</Text>
                <Text style={style.ask}>What's my number ?</Text>
                <View style={style.body}>
                    <View style={style.country}>
                        <Text style={style.fontSize}>Indonesia</Text>
                    </View>
                    <View>
                        <Icon3 name="arrow-drop-down" size={20} color="rgb(18,141,121)"/>
                    </View>
                </View>
                    <Formik
                        initialValues={{
                            phone: '',
                        }}
                        validationSchema={formSchema}
                        onSubmit={(values) => {
                        this.register(values)
                        }}>
                        {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        errors,
                        touched,
                        }) => (
                    <>
                    <View style={style.body2}>
                    <View style={style.codeCountry}>
                        <TouchableOpacity>
                            <Icon2 name="plus" size={15} />
                        </TouchableOpacity>
                        <Item style={style.item}>
                            <Input style={style.fontSize} placeholder="62" />
                        </Item>
                    </View>
                    <View style={style.phone}>
                        <Item style={style.item}>
                            <Input
                            style={[style.textPhone, style.fontSize]} 
                            onChangeText={handleChange('phone')}
                            placeholder="phone number"
                            onBlur={handleBlur('phone')}
                            value={values.phone}
                            />
                        </Item>
                    </View>
                    {/* <View style={style.error}>
                    </View> */}
                    </View>
                    {errors.phone ? (
                        <Text style={style.txtError}>{errors.phone}</Text>
                      ) : null}
                    <Text style={style.textFooter}>Carier SMS charges may apply</Text>
                <TouchableOpacity onPress={handleSubmit} style={style.btn}>
                    <Text style={style.textBtn}>NEXT</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
            </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

const mapDispatchToProps = {
    register: auth.register,
    simulation: auth.simulation
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPhone); 

const style = StyleSheet.create({
    superParent: {
        flex: 1,
        backgroundColor: "white",
    },
    parent: {
        alignItems: "center"
    },
    header: {
        flexDirection: "row",
        width: "100%",
        marginTop: 20,
        alignItems: "center"
    },
    headerTitle: {
        width: "70%"
    },
    headerIcon: {
        width: "27%",
        marginBottom: 30 
    },
    icon: {
        alignSelf: "flex-end",
        color: "grey"
    },
    title: {
        textAlign: "right",
        color: "rgb(18,141,121)",
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 30
    },
    body: {
        width: "50%",
        borderBottomWidth: 2,
        flexDirection: "row",
        borderColor: "rgb(18,141,121)",
        marginBottom: 20
    },
    body2: {
        width: "50%",
        flexDirection: "row",
        marginBottom: 20
    },
    codeCountry: {
        flexDirection: "row",
        borderBottomWidth: 2,
        borderColor: "rgb(20, 211, 236)",
        width: "20%",
        justifyContent: "space-between",
        alignItems: "center",
        paddingRight: 10
    },
    country: {
        width: "70%",
        marginLeft: 50,
        paddingLeft:5
    },
    iconcountry: {
        alignSelf: "center"
    },
    phone: {
        marginLeft: 10,
        borderBottomWidth: 2,
        borderColor: "rgb(18,141,121)",
        width: "76%"
    },
    textPhone: {
        color: "rgb(108,108,108)",
    },
    fontSize: {
        fontSize: 18
    },
    textHead: {
        textAlign: 'center'
    },
    ask: {
        color: "rgb(20, 211, 236)",
        marginBottom: 15,
        textAlign: 'center'
    },
    textFooter: {
        letterSpacing: 1,
        color: "rgb(108,108,108)"
    },
    item: {
        padding: 0,
        margin: 0,
        borderBottomWidth: 0
    },
    btn: {
        backgroundColor: "rgb(0, 204, 63)",
        alignSelf: "center",
        marginTop: "90%",
        width: 80,
        height: 40,
        justifyContent: "center",
    },
    textBtn: {
        color: "white",
        fontWeight: '400',
        textAlign: 'center'
    },
    txtError: {
        marginLeft: 10,
        fontSize: 14,
        color: 'red',
        textAlign: "center",
        marginBottom: 5
      },
      error: {
          position: 'absolute',
          textAlign: "center",
          width: "100%",
          marginTop: "40%"
      }
})