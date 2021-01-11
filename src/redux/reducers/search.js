const searchState = {
    isLoading: false,
    isError: false,
    alertMsg: '',
    search: {},
};

export default (state=searchState, action) => {
        switch(action.type){
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
                    alertMsg: 'search successfully',
                    search: action.payload.data
                };
            }
            case 'SEARCH_REJECTED': {
                return {
                    ...state,
                    isError: true,
                    alertMsg: 'fail get profile'
                };
            }
            default: {
                return state;
            }
        }
    }