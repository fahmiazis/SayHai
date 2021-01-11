const friendState = {
    isSuccessAdd: false,
    isLoading: false,
    isError: false,
    alertMsg: '',
    friend: {},
    detail: {},
    search: {}
};

export default (state=friendState, action) => {
        switch(action.type){
            case 'ADD_CONTACT_PENDING': {
                return {
                    ...state,
                    isLoading: true,
                    alertMsg: 'Waiting....'
                };
            }
            case 'ADD_CONTACT_FULFILLED': {
                return {
                    ...state,
                    isError: false,
                    alertMsg: 'Add Contact Succesfully',
                    isSuccessAdd: true
                };
            }
            case 'ADD_CONTACT_REJECTED': {
                return {
                    ...state,
                    isError: true,
                    alertMsg: 'fail add contact'
                };
            }
            case 'FRIEND_PENDING': {
                return {
                    ...state,
                    isLoading: true,
                    alertMsg: 'Waiting....'
                };
            }
            case 'FRIEND_FULFILLED': {
                return {
                    ...state,
                    isLoading: false,
                    isError: false,
                    alertMsg: 'get friend Succesfully',
                    friend: action.payload.data,
                    isSuccessAdd: false
                };
            }
            case 'FRIEND_REJECTED': {
                return {
                    ...state,
                    isError: true,
                    alertMsg: 'fail to get friend'
                };
            }
            case 'SEARCH_PENDING': {
                return {
                    ...state,
                    isLoading: true,
                    alertMsg: 'Waiting....'
                };
            }
            case 'SEARCH_FULFILLED': {
                return {
                    ...state,
                    isLoading: false,
                    isError: false,
                    alertMsg: 'search Succesfully',
                    search: action.payload.data,
                    isSuccessAdd: false
                };
            }
            case 'SEARCH_REJECTED': {
                return {
                    ...state,
                    isError: true,
                    alertMsg: 'fail to get friend'
                };
            }
            case 'DETAIL_PENDING': {
                return {
                    ...state,
                    isLoading: true,
                    alertMsg: 'Waiting....'
                };
            }
            case 'DETAIL_FULFILLED': {
                return {
                    ...state,
                    isLoading: false,
                    isError: false,
                    alertMsg: 'get friend Succesfully',
                    detail: action.payload.data.data,
                    isSuccessAdd: false
                };
            }
            case 'DETAIL_REJECTED': {
                return {
                    ...state,
                    isError: true,
                    alertMsg: 'fail get detail friend'
                };
            }
            default: {
                return state;
            }
        }
    }