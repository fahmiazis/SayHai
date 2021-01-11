import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5'
import Icon2 from 'react-native-vector-icons/Ionicons'

import img1 from '../img/img1.png'
import {connect} from 'react-redux'
import message from '../redux/actions/message'
import friend from '../redux/actions/friend'
import RenderContact from './RenderContact'

class Contact extends Component {
    
    goChat = async (idfriend) => {
        const {id} = idfriend
        await this.props.readMessage(this.props.auth.token, id)
        await this.props.detailFriend(this.props.auth.token, id)
        this.props.navigation.navigate('ChatRoom', id)
    }

    render() {
        const { friend } = this.props.friend
        return (
            <ScrollView style={style.superParent}>
            <View style={style.parent}>
                <TouchableOpacity>
                <View style={style.header}>
                    <View style={style.icon}>
                        <Icon name="user-friends" size={30} color="white" />
                    </View>
                    <Text style={style.title}>New group</Text>
                </View>
                </TouchableOpacity>
                <View style={style.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("AddContack")}>
                        <View style={style.icon}>
                            <Icon name="user-plus" size={24} color="white" />
                        </View>
                    </TouchableOpacity>
                    <View style={style.contact}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("AddContack")}>
                            <Text style={style.title}>New contact</Text>
                        </TouchableOpacity>
                        <Icon2 name="qr-code-sharp" size={20} color="rgb(18,141,121)"/>
                    </View>
                </View>
                <View>
                <FlatList
                data = {Object.keys(friend).length > 0 && friend.result.rows}
                // onEndReached={this.nextPage}
                // onEndReachedThreshold={0.5}
                renderItem = {({item}) => (
                <RenderContact
                onPress={() => this.goChat({id: item.friendId})}
                friend={item}
                />)}
                keyExtractor={(item) => item.id.toString()}
                />
                </View>
                <TouchableOpacity>
                <View style={style.header}>
                    <Icon2 name="share-social" size={35} color="grey"/>
                    <Text style={style.title2}>Invite friends</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity>
                <View style={style.header}>
                    <View style={style.icon2}>
                        <Icon name="question" size={20} color="white"/>
                    </View>
                    <Text style={style.title3}>Contacts help</Text>
                </View>
                </TouchableOpacity>
            </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    friend: state.friend
})

const mapDispatchToProps = {
    getFriend: friend.getFriend,
    detailFriend: friend.detailFriend,
    readMessage: message.readMessage,
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact);

const style = StyleSheet.create({
    superParent: {
        flex: 1,
        backgroundColor: "white",
    },
    parent: {
        paddingHorizontal: 20,
    },
    icon: {
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        width: 50,
        backgroundColor: "rgb(0, 204, 63)",
        borderRadius: 50
    },
    icon2: {
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        width: 40,
        backgroundColor: "grey",
        borderRadius: 50
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20
    },
    title: {
        marginLeft: 15,
        fontSize: 16,
        fontWeight: "300"
    },
    title2: {
        marginLeft: 27,
        fontSize: 16,
        fontWeight: "300"
    },
    title3: {
        marginLeft: 20,
        fontSize: 16,
        fontWeight: "300"
    },
    contact: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "85%"
    },
    img: {
        height: 50,
        width: 50,
        borderRadius: 50
    }
})