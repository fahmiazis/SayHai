import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity, ToastAndroid, ScrollView } from 'react-native'
import { Item, Input, Button } from 'native-base'
import ImagePicker from 'react-native-image-picker'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {connect} from 'react-redux'
import {Formik} from 'formik';
import * as yup from 'yup';
import profile from '../redux/actions/profile'

const formSchema = yup.object({
    name: yup.string().min(5).max(25).required('input your name'),
  });

class RegisterProfile extends Component {

    state = {
        name: '',
        avatar: ''
    }    

    handleChoosePhoto = () => {
        const options = {
          noData: true,
        }
        ImagePicker.showImagePicker(options, async (response) => {
        
            if (response.didCancel) {
              ToastAndroid.show('No image choseen', ToastAndroid.LONG);
            } else if (response.error) {
              ToastAndroid.show('Please try again later', ToastAndroid.LONG);
            } else { 
                const data = new FormData();

                data.append('avatar', {
                    name: response.fileName,
                    type: response.type,
                    uri: response.uri
                })
                await this.props.uploadPhoto(this.props.auth.token, data)
                const {isUpload} = this.props.profile
                if(isUpload){
                    await this.props.getProfile(this.props.auth.token)
                    this.setState({avatar: "upload success"})
                } 
            }
        })
      }

    update = (values) => {
        this.props.updateProfile(this.props.auth.token, values)
    }

    render() {
        const { profile } = this.props.profile
        const { avatar } = this.state
        return (
            <ScrollView style={style.superParent}>
            <View style={style.parent}>
                <Text style={style.title}>Profile Info</Text>
                <Text style={style.desc}>Please provide your name and an optional profile photo</Text>
                <View style={style.icon}>
                    <TouchableOpacity onPress={this.handleChoosePhoto}>
                    {avatar === '' || profile.avatar === null ? (
                        <Icon name="camera-plus" size={60} color="grey" />
                    ): (
                        <Image source={{uri: `http://54.147.40.208:8585${profile.avatar}`}} style={style.img}/>
                    )}
                    </TouchableOpacity>
                </View>
                <Formik
                        initialValues={{
                            name: '',
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
    auth: state.auth,
    profile: state.profile
})

const mapDispatchToProps = {
    updateProfile: profile.updateProfile,
    getProfile: profile.getProfile,
    uploadPhoto: profile.uploadPhoto
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterProfile);

const style = StyleSheet.create({
    superParent: {
        flex: 1,
        backgroundColor: "white",
    },
    parent: {
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
    img: {
        borderRadius: 100,
        width: 150,
        height: 150,
    },
    inputName: {
        flexDirection: "row",
        alignItems: "baseline"
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
        marginTop: "78%",
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