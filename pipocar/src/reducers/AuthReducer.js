import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED, 
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    CREATE_ACCOUNT_USER_FAIL,
    LOGIN_USER, 
    USER_UPDATE_DATA,
    CREATE_USER_SUCCESS,
    USER_CREATED,
    USER_CREATED_SUCCESS,
    USER_UPDATED,
    ACCOUNT_FIELD_EMPTY,
    REQUEST_PASSWORD,
    FORGOT_PASSWORD,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_SUCCESS,
    EMPTY_ALL_FIELDS,
    USER_PERSONAL_INFO_FETCH,
    CREATED_USER,
    CREATED_ACCOUNT
   } from '../actions/types';

const INITIAL_STATE = { 
   email:'',
   password:'',
   user:null,
   error:'',
   errorCREATE_ACCOUNT:'',
   loading:false,
   userName:'',
   userID:'',
   userLocation:'',
   userBio:'',
   userAllData:'',
   userDateOfRegistration:'',
   requestNEW_PASSWORD_ERROR:'',
   ImageDefault:'https://firebasestorage.googleapis.com/v0/b/pipocar-61cd8.appspot.com/o/groupCovers%2Fcef4c151ecd7c2fd46180b45fb5bc1a1.jpg?alt=media&token=8beea4de-e1fd-439d-8162-eb7bab61e41c'

}

export default (state = INITIAL_STATE, action) => {
   console.log(action);
   switch(action.type){
       case EMAIL_CHANGED:
           return { ...state, email: action.payload }
       case PASSWORD_CHANGED:
           return { ...state, password: action.payload}
       case LOGIN_USER:
           return { ...state, loading:true, error:''}
        case CREATED_ACCOUNT:
            return { ...state, loading:true, error:''}
       case LOGIN_USER_SUCCESS:
           return { ...state, ...INITIAL_STATE, user: action.payload}
       case CREATE_USER_SUCCESS:
               return { ...state, ...INITIAL_STATE, user: action.payload}
       case LOGIN_USER_FAIL:
           return { ...state, error: 'email or password incorrect', loading:false}
       case CREATE_ACCOUNT_USER_FAIL:
           return { ...state, errorCREATE_ACCOUNT: 'failed to create account', loading:false}
       case USER_UPDATE_DATA :
           return { ...state, [action.payload.prop]: action.payload.value,}
       case USER_CREATED : 
           return { ...state, loading:true }
        case USER_CREATED_SUCCESS : 
           return { ...state, ...INITIAL_STATE }
       case USER_UPDATED : 
           return { ...state, loading:false }
       case ACCOUNT_FIELD_EMPTY: 
           return { ...state, ...INITIAL_STATE }
       case FORGOT_PASSWORD:
           return { ...state, ...INITIAL_STATE}
       case REQUEST_PASSWORD : 
           return { ...state, loading:true, error:''}
       case RESET_PASSWORD_FAIL:
           return { ...state, requestNEW_PASSWORD_ERROR: 'Reset password fail', loading:false}
       case RESET_PASSWORD_SUCCESS:
           return { ...state, ...INITIAL_STATE }
       case EMPTY_ALL_FIELDS:
           return { ...state, ...INITIAL_STATE }
       case USER_PERSONAL_INFO_FETCH:
               return { ...state, userProfileInfo:action.payload,}
   

       default:
           return state;
   }

}