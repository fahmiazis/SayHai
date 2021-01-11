import http from '../../helpers/http'
import qs from 'qs'

export default {
    addContact: (token, data) => ({
        type: 'ADD_CONTACT',
        payload: http(token).post(`/friend/add`, qs.stringify(data))
    }),
    getFriend: (token) => ({
        type: 'FRIEND',
        payload: http(token).get(`/friend`)
    }),
    detailFriend: (token, id) => ({
        type: 'DETAIL',
        payload: http(token).get(`/user/detail/${id}`)
    }),
    search: (token, data) => ({
        type: 'SEARCH',
        payload: http(token).post(`/user/search?search=${data}`)
    })
}
