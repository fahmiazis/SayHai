import http from '../../helpers/http'
import qs from 'qs'

export default {
    updateProfile: (token, data) => ({
        type: 'UPDATE',
        payload: http(token).patch(`/user/update`, qs.stringify(data)),
    }),
    getProfile: (token) => ({
        type: 'PROFILE',
        payload: http(token).get(`/user`),
    }),
    uploadPhoto: (token, data) => ({
        type: 'UPLOAD',
        payload: http(token).post(`/user/avatar`, data)
    })
}