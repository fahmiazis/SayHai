const authState = {
    isSuccessSend: false,
    isLoading: false,
    isError: false,
    alertMsg: '',
    chatlist: {},
    read: {},
    res: {}
};

export default (state=authState, action) => {
        switch(action.type){
            case 'SEND_PENDING': {
                return {
                    ...state,
                    isLoading: true,
                    alertMsg: 'Waiting....'
                };
            }
            case 'SEND_FULFILLED': {
                return {
                    ...state,
                    isError: false,
                    alertMsg: 'Send message Succesfully',
                    isSuccessSend: true
                };
            }
            case 'SEND_REJECTED': {
                return {
                    ...state,
                    isError: true,
                    alertMsg: action.payload.response.data.message
                };
            }
            case 'CHAT_LIST_PENDING': {
                return {
                    ...state,
                    isLoading: true,
                    alertMsg: 'Waiting....'
                };
            }
            case 'CHAT_LIST_FULFILLED': {
                return {
                    ...state,
                    isError: false,
                    alertMsg: 'Send message Succesfully',
                    isSuccessSend: false,
                    chatlist: action.payload.data
                };
            }
            case 'CHAT_LIST_REJECTED': {
                return {
                    ...state,
                    isError: true,
                    alertMsg: action.payload.response.data.message
                };
            }
            case 'READ_PENDING': {
                return {
                    ...state,
                    isLoading: true,
                    alertMsg: 'Waiting....'
                };
            }
            case 'READ_FULFILLED': {
                return {
                    ...state,
                    isError: false,
                    alertMsg: 'get message Succesfully',
                    isSuccessSend: false,
                    read: action.payload.data
                };
            }
            case 'READ_REJECTED': {
                return {
                    ...state,
                    isError: true,
                    alertMsg: action.payload.response.data.message
                };
            }
            case 'NEXT_LINK_PENDING': {
                return {
                    ...state,
                    isLoading: true,
                    alertMsg: 'Waiting....'
                };
            }
            case 'NEXT_LINK_FULFILLED': {
                return {
                    ...state,
                    isError: false,
                    alertMsg: 'get next message Succesfully',
                    isSuccessSend: false,
                    res: action.payload.data,
                    read: {
                        ...state.read,
                        result:{
                            rows: [...state.read.result.rows, ...action.payload.data.result.rows]
                           },
                       pageInfo: action.payload.data.pageInfo
                    }
                };
            }
            case 'NEXT_LINK_REJECTED': {
                return {
                    ...state,
                    isError: true,
                    alertMsg: 'fail get next message'
                };
            }
            case 'CLEAR': {
                return {
                    ...state,
                    chatlist: {},
                    read: {}
                }
            }
            default: {
                return state;
            }
        }
    }