import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import { Actions } from 'react-native-router-flux';
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
     USER_UPDATED,
     USER_CREATED_SUCCESS,
     ACCOUNT_FIELD_EMPTY,
     REQUEST_PASSWORD,
     RESET_PASSWORD_FAIL, 
     RESET_PASSWORD_SUCCESS,
     USER_PERSONAL_INFO_FETCH,
     CREATED_ACCOUNT,
     USER_LOG_OUT,

     
      
    } from "./types";

//Actions creator
export const emailCHANGED = (text) => {

    return{
        type: EMAIL_CHANGED,
        payload: text
    }

}

export const passwordCHANGED = (text) => {

    return {
        type:PASSWORD_CHANGED,
        payload: text
    }
}

export const loginUSER = ({ email, password }) => {
    return(dispatch) => {
    
        dispatch({type: LOGIN_USER})
       { 
        
            auth().signInWithEmailAndPassword(email, password)
            .then(user => loginUSER_SUCCES(dispatch, user))
            .catch(() => loginUSER_FAIL(dispatch));
        }
    }
}

const loginUSER_SUCCES = (dispatch, user) => {

    dispatch({
         type: LOGIN_USER_SUCCESS,
         payload: user,
     })
   Actions.main(
       {
     type : 'replace'
     }
 )
     
 } 

 const loginUSER_FAIL = (dispatch) => {

    dispatch({
        type:LOGIN_USER_FAIL,
    })
}

export const createUserACCOUNT = ({ email, password}) => {
    return(dispatch) => {
        dispatch({type:  CREATED_ACCOUNT})
     {   
         auth().createUserWithEmailAndPassword(email, password)
        .then(user => createACCOUNT_SUCCESS(dispatch, user))
        .catch(() => createACCOUNT_FAIL(dispatch));
    }

    }
}

const createACCOUNT_SUCCESS = (dispatch, user) => {
    
    dispatch({
        type: CREATE_USER_SUCCESS,
        payload: user,
    })
    Actions.userpersonaldata({
        type:'replace'
    });
    
} 

const createACCOUNT_FAIL = (dispatch) => {

    dispatch({
        type:CREATE_ACCOUNT_USER_FAIL,
    })
}



export const userUPDATE_DATA= ({prop, value}) => {


    return{
        type: USER_UPDATE_DATA,
        payload: { prop, value }

    }
}

 export const createUSER = ({ userName, userID, userLocation, userBio, ImageDefault}) => {

    console.log(userName, userID, userLocation, userBio);
    const { currentUser } = auth();

    return(dispatch) => {
        dispatch({type: USER_CREATED})
        {        
        var today = new Date();
        var date = today.getDate()+'.'+(today.getMonth()+1)+'.'+today.getFullYear();
        var userDateOfRegistration = date;
    
        auth().currentUser.updateProfile({ displayName:userName, photoURL:ImageDefault });
        database().ref(`/users/${currentUser.uid}`)
        .update({
                userName, 
                userID, 
                userLocation, 
                userBio, 
                userDateOfRegistration
            })
        .then(()=> userCREATED_SUCCESS(dispatch))
    }

    }
} 



const userCREATED_SUCCESS = (dispatch) => {

    dispatch({ type: USER_CREATED_SUCCESS })
    {
        Actions.main({type:'replace'});
    }

}




//UpdateUser 
export const updateUSER = (userName, userID, userLocation, userBio) => {

    console.log({userName, userID, userLocation, userBio});
    const { currentUser } = auth();

    return(dispatch) => {
    
        auth().currentUser.updateProfile({

            displayName:userName,

        });

        database()
        .ref(`/users/${currentUser.uid}`)
        .update({
                userName:userName,
                userID:userID,
                userLocation:userLocation,
                userBio:userBio,
            })
        .then(()=>{
           dispatch({type: USER_UPDATED})
           {
             Actions.pop();
           }


        }) 
        

        
    }

}


//Forgot password -> Reset Password
export const resetPASSWORD_FAIL = (dispatch) => {

    dispatch({
        type:RESET_PASSWORD_FAIL,
    })
}

export const resetPASSWORD_RESET_SUCCESS = (dispatch) => {

    dispatch({
        type:RESET_PASSWORD_SUCCESS,
    })
}


export const forgotPASSWORD = (email) => {
return(dispatch) => { 
    
    dispatch({ type: REQUEST_PASSWORD})
{    
    auth().sendPasswordResetEmail(email)
    .then(() => { 
        resetPASSWORD_RESET_SUCCESS(dispatch) 
        Actions.login({type:'replace'});
    }
        
        ).catch(() =>{ 
            resetPASSWORD_FAIL(dispatch)
    })
}


}
 
}



export const emptyALL_FIELDS = () => {

    return(dispatch) => {dispatch({
        type: ACCOUNT_FIELD_EMPTY,

    })}

}

/* 
export const userLOGOUT = () => {
    return(dispatch) => {    
        dispatch({ type: USER_LOG_OUT})
        {
            auth().signOut();

        }

    
      } 
    }
 */