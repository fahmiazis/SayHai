import { Switch } from 'native-base'
import React, { Component } from 'react'
import { Text, View, ImageBackground, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon2 from 'react-native-vector-icons/Fontisto'
import img1 from '../img/akun.png'

import {connect} from 'react-redux'

import friend from '../redux/actions/friend'

class DetailFriend extends Component {
    render() {
        const { detail } = this.props.friend
        return (
            <ScrollView>
            <View style={style.parent}>
                <ImageBackground style={style.imgBackground} source={detail.avatar === null ? img1 : {uri: `http://54.147.40.208:8585${detail.avatar}`}} />
                <View style={style.textHead}>
                    <Text style={style.name}>{detail.name}</Text>
                    <Text style={style.status}>Last seen today at 12:10 AM</Text>
                </View>
                <View>
                    <View style={style.notif}>
                        <View style={style.mute}>
                            <Text style={style.textMute}>Mute notifications</Text>
                            <Switch />
                        </View>
                        <TouchableOpacity>
                        <View style={style.mute1}>
                            <Text style={style.textMute}>Custom notifications</Text>
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                        <View style={style.mute2}>
                            <Text style={style.textMute}>Media visibility</Text>
                        </View>
                        </TouchableOpacity>
                    </View>
                    <View style={style.notif}>
                        <TouchableOpacity>
                        <View style={style.mute}>
                            <View>
                                <Text style={style.textMute}>Disappearing Messages</Text>
                                <Text style={style.grey}>Off</Text>
                            </View>
                            <Icon name="clock-time-one" size={25} color="rgb(7,94,84)" />
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                        <View style={style.mute3}>
                            <View>
                                <Text style={style.textMute}>Encryption</Text>
                                <Text style={style.grey}>Messages and calls are end-to-end encrypted. Tap to verify</Text>
                            </View>
                            <Icon name="lock" size={25} color="rgb(7,94,84)" />
                        </View>
                        </TouchableOpacity>
                    </View>
                    <View style={style.notif}>
                        <View style={style.mute2}>
                            <Text style={[style.textMute, style.green]}>About and phone number</Text>
                        </View>
                        <View style={style.mute}>
                            <View>
                                <Text style={style.textMute}>penting telpon</Text>
                                <Text style={style.grey}>August 31</Text>
                            </View>
                        </View>
                        <View style={style.mute3}>
                            <View>
                                <Text style={style.textMute}>+62 {detail.phone}</Text>
                                <Text style={style.grey}>Mobile</Text>
                            </View>
                            <View style={style.icon}>
                                <TouchableOpacity>
                                <Icon name="message-text" size={25} color="rgb(7,94,84)" />    
                                </TouchableOpacity>
                                <TouchableOpacity>
                                <Icon name="phone" size={25} color="rgb(7,94,84)" />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                <Icon name="video" size={25} color="rgb(7,94,84)" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={style.notif}>
                        <View style={style.mute2}>
                            <Text style={[style.textMute, style.green]}>Other phones</Text>
                        </View>
                        <View style={style.mute3}>
                            <View>
                                <Text style={style.textMute}>+62 {detail.phone}</Text>
                                <Text style={style.grey}>Mobile</Text>
                            </View>
                            <View style={style.icon}>
                                <TouchableOpacity>
                                <Icon name="message-text" size={25} color="rgb(7,94,84)" />    
                                </TouchableOpacity>
                                <TouchableOpacity>
                                <Icon name="phone" size={25} color="rgb(7,94,84)" />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                <Icon name="video" size={25} color="rgb(7,94,84)" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={style.notif}>
                        <TouchableOpacity>
                        <View style={style.mute4}>
                            <Icon name="block-helper" size={30} color="red" />
                            <Text style={[style.textMute, style.red]}>Block</Text>
                        </View>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity>
                    <View style={style.distance}>
                        <View style={style.mute5}>
                            <Icon2 name="dislike" size={30} color="red" />
                            <Text style={[style.textMute, style.red]}>Report Contack</Text>
                        </View>
                    </View>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    friend: state.friend
})

export default connect(mapStateToProps)(DetailFriend);

const style = StyleSheet.create({
    parent: {
        flex: 1,
    },
    imgBackground: {
        width: "100%",
        height: 490,
        position: "relative"
    },
    textHead: {
        flexDirection: "column",
        position: "absolute",
        backgroundColor: "rgba(0,0,0,0.3)",
        width: "100%",
        height: 100,
        marginTop: "81%",
        paddingLeft: 10,
        textAlignVertical: "bottom"
    },
    name: {
        color: "white",
        fontSize: 25,
        fontWeight: "bold",
        marginTop: 40
    },
    status: {
        color: "white",
        fontSize: 15,
    },
    notif: {
        backgroundColor: "white",
        marginBottom: 20,
        paddingHorizontal: 10
    },
    mute: {
        borderBottomWidth: 0.4,
        borderBottomColor: "grey",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        alignItems: "center"
    },
    mute1: {
        borderBottomWidth: 0.4,
        borderBottomColor: "grey",
        paddingVertical: 10
    },
    mute2: {
        paddingVertical: 10
    },
    mute3: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        alignItems: "center"
    },
    mute4: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 10,
        alignItems: "center",
        width: 150
    },
    mute5: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 10,
        alignItems: "center",
        width: 225
    },
    textMute: {
        fontSize: 18,
        fontWeight: "100"
    },
    grey: {
        color: "grey"
    },
    green: {
        color: "rgb(7,94,84)"
    },
    red: {
        color: "red"
    },
    icon: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: 150
    },
    distance: {
        backgroundColor: "white",
        marginBottom: 40,
        paddingHorizontal: 10
    }
})