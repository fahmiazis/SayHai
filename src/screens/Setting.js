import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon3 from 'react-native-vector-icons/FontAwesome'
import Icon4 from 'react-native-vector-icons/FontAwesome5'

import akun from '../img/akun.png'
import {connect} from 'react-redux'
import auth from '../redux/actions/auth'
import profile from '../redux/actions/profile'
class Setting extends Component {
    state = {
        name: '',
        phone: '',
        avatar: ''
    }

    componentDidMount(){
        this.props.getProfile(this.props.auth.token)
        const { profile } = this.props.profile
        this.setState({name: profile.name, phone: profile.phone, avatar: profile.avatar})
    }
    render() {
        const {name, avatar} = this.state
        const { profile } = this.props.profile
        return (
            <ScrollView style={style.parent}>
            <View style={style.parent}>
                <View style={style.header}>
                    <Image style={style.img} source={avatar === null ? akun : {uri: `http://54.147.40.208:8585${profile.avatar}`}}/>
                    <View style={style.account}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Profile")}>
                        <View>
                            <Text style={style.accountName}>{profile.name}</Text>
                            <Text style={style.accountStatus}>Hey there! i am using SayHai!</Text>
                        </View>
                        </TouchableOpacity>
                        <Icon name="qr-code-sharp" size={30} color="rgb(18,141,121)"/>
                    </View>
                </View>
                <View style={style.body}>
                    <TouchableOpacity>
                    <View style={style.contentBody}>
                        <Icon name="key" color="rgb(18,141,121)" size={30}/>
                        <View style={style.content}>
                            <Text style={style.accountName}>Account</Text>
                            <Text style={style.accountStatus}>Privacy, security, change number</Text>
                        </View>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <View style={style.contentBody}>
                        <Icon2 name="message-text-outline" color="rgb(18,141,121)" size={30}/>
                        <View style={style.content}>
                            <Text style={style.accountName}>Chats</Text>
                            <Text style={style.accountStatus}>Theme, Wallpaper, chat history</Text>
                        </View>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <View style={style.contentBody}>
                        <Icon name="notifications" color="rgb(18,141,121)" size={30}/>
                        <View style={style.content}>
                            <Text style={style.accountName}>Notifications</Text>
                            <Text style={style.accountStatus}>Message, group & call tones</Text>
                        </View>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <View style={style.contentBody}>
                        <Icon3 name="circle-o-notch" color="rgb(18,141,121)" size={30}/>
                        <View style={style.content}>
                            <Text style={style.accountName}>Storage and data</Text>
                            <Text style={style.accountStatus}>Network usage, auto-download</Text>
                        </View>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <View style={style.contentBody2}>
                        <Icon3 name="question-circle-o" color="rgb(18,141,121)" size={30}/>
                        <View style={style.content2}>
                            <Text style={style.accountName}>Help</Text>
                            <Text style={style.accountStatus}>FAQ, contact us, privacy policy</Text>
                        </View>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.logout()}>
                    <View style={style.contentBody3}>
                        <Icon2 name="logout" color="rgb(18,141,121)" size={30}/>
                        <View style={style.content}>
                            <Text style={style.accountName}>Logout</Text>
                        </View>
                    </View>
                    </TouchableOpacity>
                </View>
                <View style={style.footer}>
                    <Text style={style.form}>from</Text>
                    <Text style={style.author}>FAHMI AZIZ</Text>
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
    logout: auth.logout
}

export default connect(mapStateToProps, mapDispatchToProps)(Setting);

const style = StyleSheet.create({
    parent: {
        flex: 1,
        backgroundColor: "white"
    },
    header: {
        paddingHorizontal: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: "grey",
        paddingVertical: 20,
        flexDirection: "row",

    },
    img: {
        width: 80,
        height: 80,
        borderRadius: 50
    },
    account: {
        paddingLeft: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "80%"
    },
    accountName: {
        fontSize: 20,
        fontWeight: "500"
    },
    accountStatus: {
        color: "grey",
        fontSize: 15,
        lineHeight: 20
    },
    body: {
        paddingTop: 15,
        paddingLeft: 30
    },
    contentBody: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 20
    },
    contentBody2: {
        flexDirection: "row",
        alignItems: "center",
    },
    contentBody3: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 30
    },
    content: {
        paddingLeft: 30
    },
    content2: {
        marginLeft: 30,
        width: "100%",
        borderBottomColor: "grey",
        borderBottomWidth: 0.5,
        paddingVertical: 20
    },
    footer: {
        marginTop: 20,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    form: {
        color: "grey"
    },
    author: {
        letterSpacing: 2,
        fontSize: 16,
        fontWeight: "bold"
    }
})