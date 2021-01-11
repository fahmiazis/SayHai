import React, { Component } from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import search from '../redux/actions/search'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

class Search extends Component {
    state = {
        search : ""
    }

    // componentDidUpdate(){
    //     const {search} = this.state
    //     if(search !== '') {
    //         this.props.search(this.props.auth.token, search)
    //     }
    // }

    render() {
        const {search} = this.props.search
        return (
            <View style={style.parent}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                    <Icon name='arrow-back' size={30} color="white" />
                </TouchableOpacity>
                <Item style={style.input}>
                    <Input
                    onChangeText={search=>this.setState({search})}
                    placeholder="Search..."
                    />
                </Item>
            </View>            
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
    search: state.search
})

const mapDispatchToProps = {
    search: search.search
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)

const style = StyleSheet.create({
    parent: {
        flex: 1,
        backgroundColor: "rgb(255,255,255)",
        flexDirection: "row"
    },
    input: {
        width: "70%",
        height: "10%"
    }
})