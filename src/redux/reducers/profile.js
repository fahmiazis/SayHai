const profileState = {
    isLoading: false,
    isError: false,
    alertMsg: '',
    profile: {},
    idUser: 0,
    isUpload: false
};

export default (state=profileState, action) => {
        switch(action.type){
            case 'PROFILE_PENDING': {
                return {
                    ...state,
                    isLoading: true,
                    alertMsg: 'Waiting....'
                };
            }
            case 'PROFILE_FULFILLED': {
                return {
                    ...state,
                    isLoading: false,
                    isError: false,
                    isUpload: false,
                    alertMsg: 'get profile Succesfully',
                    profile: action.payload.data.data,
                    idUser: action.payload.data.data.id
                };
            }
            case 'PROFILE_REJECTED': {
                return {
                    ...state,
                    isError: true,
                    alertMsg: 'fail get profile'
                };
            }
            case 'UPLOAD_PENDING': {
                return {
                    ...state,
                    isLoading: true,
                    alertMsg: 'Waiting....'
                };
            }
            case 'UPLOAD_FULFILLED': {
                return {
                    ...state,
                    isLoading: false,
                    isError: false,
                    alertMsg: 'upload image Succesfully',
                    isUpload: true
                };
            }
            case 'UPLOAD_REJECTED': {
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