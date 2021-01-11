import React, { Component } from 'react'
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native'
import { Input, Item } from 'native-base'
import {connect} from 'react-redux'
import search from '../redux/actions/search'
import friend from '../redux/actions/friend'
import message from '../redux/actions/message'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import RenderSearch from './RenderSearch'

class Search extends Component {
    state = {
        search : " "
    }

    goSearch = () => {
        const {search} = this.state
        this.props.procSearch(this.props.auth.token, search)
    }

    goChat = async (idfriend) => {
        const {id} = idfriend
        await this.props.readMessage(this.props.auth.token, id)
        await this.props.detailFriend(this.props.auth.token, id)
        this.props.navigation.navigate('ChatRoom', id)
    }

    render() {
        const {search} = this.props.search
        console.log(search)
        return (
            <View style={style.parent}>
                <View style={style.search}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Icon name="arrow-left" size={30} color="black" />
                    </TouchableOpacity>
                    <View>
                        <Item style={style.input}>
                            <Input placeholder="Search..." onChangeText={search=>this.setState({search})} />
                            <TouchableOpacity onPress={this.goSearch}>
                                <Icon name="magnify" size={25} color="black"/>
                            </TouchableOpacity>
                        </Item>
                    </View>
                </View>
                <View style={style.body}>
                <FlatList
                    data = {search.data.rows}
                    // onEndReached={this.nextPage}
                    // onEndReachedThreshold={0.5}
                    renderItem = {({item}) => (
                    <RenderSearch
                    onPress={() => this.goChat({id: item.id})}
                    list={item} 
                    />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    />
                </View>
            </View>            
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
    search: state.search
})

const mapDispatchToProps = {
    procSearch: search.procSearch,
    readMessage: message.readMessage,
    detailFriend: friend.detailFriend
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)

const style = StyleSheet.create({
    parent: {
        flex: 1,
        backgroundColor: "#ffffff"
    },
    body: {
        flex: 1,
        backgroundColor: "#ffffff",
        marginHorizontal: 10
    },
    input: {
        width: "68%",
        height: 70,
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 0
    },
    search: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        borderBottomWidth: 2,
        borderBottomColor: "rgb(108,108,108)"
    }
})