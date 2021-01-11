import http from '../../helpers/http'
import qs from 'qs'

export default {
    register: (data) => ({
        type: 'REGISTER',
        payload: http().post(`/auth/register`, qs.stringify(data))
    }),
    logout: () => ({
        type: 'LOGOUT',
    }),
    simulation: () => ({
        type: 'SIMUL',
    }),
}
