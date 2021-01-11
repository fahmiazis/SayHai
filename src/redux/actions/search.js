import http from '../../helpers/http'
import qs from 'qs'

export default {
    procSearch: (token, data) => ({
        type: 'SEARCH',
        payload: http(token).post(`/user/search?search=${data}`),
    })
}