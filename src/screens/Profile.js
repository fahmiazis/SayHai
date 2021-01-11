import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity, ToastAndroid, ScrollView } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon2 from 'react-native-vector-icons/FontAwesome5'

import akun from '../img/akun.png'
import {connect} from 'react-redux'

import profile from '../redux/actions/profile'
class Profile extends Component {
    state = {
        name: '',
        phone: '',
        avatar: ''
    }

    componentDidMount(){
        this.props.getProfile(this.props.auth.token)
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
                } 
            }
        })
      }
    
    render() {
        const {name, phone, avatar} = this.state
        const { profile } = this.props.profile
        return (
            <ScrollView style={style.parent}>
            <View style={style.parent}>
                <View style={style.header}>
                    <Image style={style.img} source={profile.avatar === null ? akun : {uri: `http://54.147.40.208:8585${profile.avatar}`}} />
                    <TouchableOpacity style={style.icon} onPress={this.handleChoosePhoto}>
                        <Icon name="camera" color="white" size={30} />
                    </TouchableOpacity>
                </View>
                <View style={style.body}>
                    <View style={style.contentBody}>
                        <Icon2 style={style.user} name="user-alt" size={20} color="rgb(7,94,84)" />
                        <View style={style.desc}>
                            <View style={style.content}>
                                <View>
                                    <Text style={style.grey}>Name</Text>
                                    <Text style={style.author}>{profile.name}</Text>
                                </View>
                                <TouchableOpacity onPress={ () => this.props.navigation.navigate('ChangeName')}>
                                    <Icon2 name="pen" size={20} color="grey" />
                                </TouchableOpacity>
                            </View>
                            <Text style={style.grey}>This is not your username or pin. This name will be visible to your SayHai! contacts.</Text>
                        </View>
                    </View>
                    <View style={style.contentBody2}>
                        <Icon style={style.user} name="information-outline" size={30} color="rgb(7,94,84)" />
                        <View style={style.content2}>
                            <View style={style.content}>
                                <View>
                                    <Text style={style.grey}>About</Text>
                                    <Text style={style.author}>Hey there! I am using SayHai!</Text>
                                </View>
                                <TouchableOpacity>
                                    <Icon2 name="pen" size={20} color="grey" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={style.contentBody2}>
                        <Icon2 style={style.user} name="phone-alt" size={25} color="rgb(7,94,84)" />
                        <View style={style.content3}>
                            <View style={style.content}>
                                <View>
                                    <Text style={style.grey}>Phone</Text>
                                    <Text style={style.author}>+62 {profile.phone}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
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
    getProfile: profile.getProfile,
    uploadPhoto: profile.uploadPhoto
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

const style = StyleSheet.create({
    parent: {
        flex: 1,
        backgroundColor: "white"
    },
    touch: {
        position: "relative"
    },
    img: {
        width: 150,
        height: 150,
        borderRadius: 100,
        position: "relative"
    },
    header: {
        alignSelf: "center",
        marginTop: 30,
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "flex-end"
    },
    icon: {
        justifyContent: "center",
        alignItems: "center",
        width: 50,
        height: 50,
        padding: 10,
        backgroundColor: "rgb(7,94,84)",
        borderRadius: 50,
        position: "absolute",
    },
    contentBody: {
        marginTop: 40,
        flexDirection: "row",
        paddingHorizontal: 30,
    },
    contentBody2: {
        marginTop: 20,
        flexDirection: "row",
        paddingHorizontal: 30,
    },
    body: {
        paddingRight: 20
    },
    content: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    grey: {
        color: "grey",
        fontSize: 15
    },
    author: {
        fontWeight: "100",
        marginBottom: 10,
        fontSize: 18
    },
    content2: {
        marginLeft: 20,
        width: "100%",
        paddingRight:30,
        borderBottomWidth: 0.5,
        borderBottomColor: "rgb(108,108,108)",
        paddingBottom: 15
    },
    content3: {
        marginLeft: 25,
    },
    user: {
        marginTop: 10
    },
    desc: {
        width: "100%",
        borderBottomWidth: 0.5,
        borderBottomColor: "rgb(108,108,108)",
        paddingBottom: 20,
        marginLeft: 30,
        paddingRight: 30
    }
})