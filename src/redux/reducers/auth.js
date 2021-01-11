const authState = {
    isLogin: false,
    isRegister: false,
    token: '',
    isLoading: false,
    isError: false,
    alertMsg: '',
    isSuccessUpdate: false
};

export default (state=authState, action) => {
        switch(action.type){
            case 'REGISTER_PENDING': {
                return {
                    ...state,
                    isLoading: true,
                    alertMsg: 'Waiting....'
                };
            }
            case 'REGISTER_FULFILLED': {
                return {
                    ...state,
                    isRegister: true,
                    isError: false,
                    token: action.payload.data.Token,
                    alertMsg: action.payload.data.message
                };
            }
            case 'REGISTER_REJECTED': {
                return {
                    ...state,
                    isRegister: false,
                    isError: true,
                    alertMsg: action.payload.response.data.message
                };
            }
            case 'UPDATE_PENDING': {
                return {
                    ...state,
                    isLoading: true,
                    alertMsg: 'Waiting....'
                };
            }
            case 'UPDATE_FULFILLED': {
                return {
                    ...state,
                    isError: false,
                    isLogin: true,
                    isSuccessUpdate: true,
                    isRegister: false,
                    alertMsg: 'update profile Succesfully',
                    isSuccessSend: true
                };
            }
            case 'UPDATE_REJECTED': {
                return {
                    ...state,
                    isError: true,
                    alertMsg: action.payload.response.data.message
                };
            }
            case 'LOGOUT': {
                return {
                    ...state,
                    isLoading: false,
                    alertMsg: 'Waiting....',
                    isLogin: false,
                    isRegister: false,
                    token: '',
                    alertMsg: 'Logout success'
                };
            }
            case 'SIMUL': {
                return {
                    ...state,
                    isLogin: true,
                    isRegister: false,
                    alertMsg: ''
                };
            }
            default: {
                return state;
            }
        }
    }