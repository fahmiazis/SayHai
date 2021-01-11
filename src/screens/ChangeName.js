import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Item, Input, Button } from 'native-base'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {connect} from 'react-redux'
import {Formik} from 'formik';
import * as yup from 'yup';
import profile from '../redux/actions/profile'

const formSchema = yup.object({
    name: yup.string().min(5).max(25).required('input your name'),
  });

class ChangeName extends Component {
    state = {
        name: ''
    }

    componentDidMount(){
        const { profile } = this.props.profile
        this.setState({name: profile.name})
    }

    update = async (values) => {
        await this.props.updateProfile(this.props.auth.token, values)
        await this.props.getProfile(this.props.auth.token)
        const {alertMsg} = this.props.profile
        if (alertMsg === 'get profile Succesfully') {
            this.props.navigation.navigate('Profile')
        }
    }
    render() {
        const { profile } = this.props.profile
        return (
            <View style={style.parent}>
                <Formik
                        initialValues={{
                            name: profile.name,
                        }}
                        validationSchema={formSchema}
                        onSubmit={(values) => {
                        this.update(values)
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
                    <View style={style.inputName}>
                    <Item style={style.input}>
                        <Input
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name} 
                        placeholder="Type your name here"/>
                    </Item>
                    <TouchableOpacity>
                        <Icon style={style.emot} name="emoticon-outline" size={25} />
                    </TouchableOpacity>
                    </View>
                    {errors.name ? (
                        <Text style={style.txtError}>{errors.name}</Text>
                      ) : null}
                    <TouchableOpacity style={style.btn} onPress={handleSubmit}>
                        <Text style={style.textBtn}>SAVE</Text>
                    </TouchableOpacity>
                    </>
            )}
          </Formik>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

const mapDispatchToProps = {
    updateProfile: profile.updateProfile,
    getProfile: profile.getProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeName);

const style = StyleSheet.create({
    parent: {
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 30
    },
    title: {
        color: "rgb(18,141,121)",
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 30
    },
    icon: {
        borderRadius: 100,
        width: 150,
        height: 150,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgb(239,239,239)",
        alignSelf: "center",
        marginBottom: 40
    },
    inputName: {
        flexDirection: "row",
        alignItems: "baseline",
        marginTop: 30
    },
    input: {
        width: "95%",
        borderBottomWidth: 3,
        borderBottomColor: "rgb(18,141,121)"
    },
    emot: {
        color:"grey",
    },
    desc: {
        color: "grey",
        textAlign: "center",
        fontWeight: "200",
        marginBottom: 30
    },
    btn: {
        backgroundColor: "rgb(0, 204, 63)",
        alignSelf: "center",
        marginTop: "40%",
        width: 80,
        justifyContent: "center",
        height: 40
    },
    textBtn: {
        color: "white",
        fontWeight: '400',
        textAlign: 'center'
    },
    txtError: {
        marginTop: 10,
        marginLeft: 10,
        fontSize: 18,
        color: 'red',
    },
})
