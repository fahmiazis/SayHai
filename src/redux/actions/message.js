import http from '../../helpers/http'
import qs from 'qs'

export default {
    sendMessage: (token, id, data) => ({
        type: 'SEND',
        payload: http(token).post(`/chat/send/${id}`, qs.stringify(data)),
    }),
    readMessage: (token, id) => ({
        type: 'READ',
        payload: http(token).get(`/chat/receive/detail/${id}`),
    }),
    chatList: (token) => ({
        type: 'CHAT_LIST',
        payload: http(token).get(`/chat/receive`),
    }),
    next: (token, link) => ({
        type: 'NEXT_LINK',
        payload: http(token).get(`${link}`)
    }),
    spread: () => ({
        type: 'SPREAD'
    }),
    clear: () => ({
        type: 'CLEAR'
    }),
}
