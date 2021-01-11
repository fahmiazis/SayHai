import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Item, Input,Button } from 'native-base'
import {Formik} from 'formik';
import * as yup from 'yup';
import Icon from 'react-native-vector-icons/FontAwesome5'
import {connect} from 'react-redux'
import friend from '../redux/actions/friend'

const formSchema = yup.object({
    name: yup.string().min(5).max(25).required('input friend name'),
    phone: yup.number().required('input friend phone number'),
  });

class AddContact extends Component {
    state = {
        phone: '',
        name: ''
    }

    add = async (values) => {
        await this.props.addContact(this.props.auth.token, values)
        await this.props.getFriend(this.props.auth.token)
        this.props.navigation.navigate('Contact')
    }

    componentDidUpdate(){
        const { isSuccessAdd } = this.props.friend
        if (isSuccessAdd) {
            this.props.navigation.navigate('Contact')
        }
    }

    render() {
        return (
                <Formik
                initialValues={{
                    name: '',
                    phone: ''
                }}
                validationSchema={formSchema}
                onSubmit={(values) => {
                this.add(values)
                }}>
                {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                }) => (
                <View style={style.parent}>
                <View style={style.inputName}>
                    <Icon name="user-alt" size={25} color="rgb(7,94,84)"/>
                    <Item style={style.formName}>
                        <Input
                        placeholder="Name"
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name}
                        />
                    </Item>
                </View>
                {errors.name ? (
                        <Text style={style.txtError}>{errors.name}</Text>
                      ) : null}
                <View style={style.inputName}>
                    <Icon name="phone" size={25} color="rgb(7,94,84)"/>
                    <Item style={style.formName}>
                        <Input
                        onChangeText={handleChange('phone')}
                        onBlur={handleBlur('phone')}
                        value={values.phone}
                        placeholder="Phone number"
                        />
                    </Item>
                </View>
                {errors.phone ? (
                        <Text style={style.txtError}>{errors.phone}</Text>
                      ) : null}
                <TouchableOpacity style={style.btn} onPress={handleSubmit}>
                    <Text style={style.textBtn}>SAVE</Text>
                </TouchableOpacity>
                </View>
                )}
                </Formik>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    friend: state.friend
})

const mapDispatchToProps = {
    addContact: friend.addContact,
    getFriend: friend.getFriend
}

export default connect(mapStateToProps, mapDispatchToProps)(AddContact)

const style = StyleSheet.create({
    parent: {
        flex: 1,
        padding: 20,
        backgroundColor: "white"
    },
    inputName: {
        marginVertical: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    formName: {
        marginLeft: 30,
        marginRight: 50,
        borderBottomColor: "rgb(7,94,84)"
    },
    icon: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgb(229,229,229)",
        width: 100,
        height: 100
    },
    inputPhoto: {
        marginTop: 30,
        flexDirection: "row",
        alignItems: "stretch"
    },
    formPhoto: {
        flexDirection: "row",
        alignItems: "stretch",
        marginLeft: 30
    },
    btnPhoto: {
        marginLeft: 10,
        backgroundColor: "white"
    },
    textPhoto: {
        marginVertical: 5,
        marginHorizontal: 20,
        fontWeight: "300",
        fontSize: 15
    },
    btn: {
        marginTop: 40,
        alignSelf: "center",
        backgroundColor: "rgb(0, 204, 63)",
        width: 100,
        justifyContent: 'center',
        alignItems: "center",
        height: 40
    },
    textBtn: {
        color: "white",
        margin: 10,
        fontSize: 18,
        fontWeight: "bold",
        textAlign: 'center'
    },
    txtError: {
        marginLeft: 10,
        fontSize: 14,
        color: 'red',
        textAlign: "center",
        marginBottom: 5
      },
})