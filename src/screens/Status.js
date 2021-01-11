import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import {connect} from 'react-redux'

import profile from '../redux/actions/profile'
import akun from '../img/akun.png'

class Status extends Component {
    render() {
        const { profile } = this.props.profile
        return (
            <TouchableOpacity style={style.parent}>
                <View style={style.card}>
                <View>
                    <Image style={style.img} source={profile.avatar === null ? akun : {uri: `http://54.147.40.208:8585${profile.avatar}`}} />
                </View>
                    <View style={style.body}>
                        <View>
                            <Text style={style.textName}>My status</Text>
                            <Text style={style.textChat}>Tap to add status update</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps)(Status);

const style = StyleSheet.create({
    parent: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 20,
        backgroundColor: "white"
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 30,
    },
    img: {
        width: 60,
        height: 60,
        borderRadius: 50
    },
    message: {
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: "rgb(0, 204, 63)",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "flex-end",
        marginTop: "65%",
        // shadowOpacity: 10,
        // shadowOffset: {
        //     width: 0,
        //     height: 5
        // },
        // shadowColor: "#000000",
        // shadowRadius: 9
    },
    body: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%",
        marginLeft: 15,
        // marginRight: 10,
        paddingRight: 2,
        borderBottomWidth: 0.5,
        borderBottomColor: "rgb(229,229,229)"
    },
    textName: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: "600",
        fontWeight: "bold"
    },
    textChat: {
        color: "grey",
        marginTop: 5,
        marginBottom: 15,
        fontSize: 15
    }
})