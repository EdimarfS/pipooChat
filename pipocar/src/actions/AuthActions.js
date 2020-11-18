import auth from '@react-native-firebase/auth';
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
     RESET_PASSWORD_FAIL, 
     RESET_PASSWORD_SUCCESS,
     USER_PERSONAL_INFO_FETCH,
     CREATED_ACCOUNT,

     
      
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

export const createUserACCOUNT = ({ name, email, password}) => {
    return(dispatch) => {
        dispatch({type:  CREATED_ACCOUNT})
     {   
         auth().createUserWithEmailAndPassword(email, password)
        .then(user => createACCOUNT_SUCCESS(dispatch, user, name))
        .catch(() => createACCOUNT_FAIL(dispatch));
    }



    }
}



export const userUPDATE_DATA= ({prop, value}) => {


    return{
        type: USER_UPDATE_DATA,
        payload: { prop, value }

    }
}

/* export const createUSER = ({ userName, userID, userLocation, userMantra}) => {

    console.log(userName, userID, userLocation, userMantra);
    const { currentUser } = auth();

    return(dispatch) => {
        dispatch({type: USER_CREATED})
        var today = new Date();
        var date = today.getDate()+'.'+(today.getMonth()+1)+'.'+today.getFullYear();
        var userDateOfRegistration = date;
    
        auth().currentUser.updateProfile({

            displayName:userName,
            

        });
        firebase.database().ref(`/users/${currentUser.uid}`)
        .update({
                userName, 
                userID, 
                userLocation, 
                userMantra, 
                userDateOfRegistration
            })
        .then(()=>{
            dispatch({type: USER_CREATED_SUCCESS})
            Actions.main({
                type:'replace',
                userName:userName,
                userID:userID,
                userLocation:userLocation,
                userMantra:userMantra,

            });
            Actions.refresh({});
        })
    

    }
} */




//UpdateUser 
export const updateUSER = (userName, userID, userLocation, userMantra) => {




/* 
    console.log({userName, userID, userLocation, userMantra});
    const { currentUser } = firebase.auth();



    return(dispatch) => {
    
        firebase.auth().currentUser.updateProfile({

            displayName:userName,
            

        });


        //RealTime Database    
        firebase.database()
        .ref(`/users/${currentUser.uid}`)
        .update({
                userName:userName,
                userID:userID,
                userLocation:userLocation,
                userMantra:userMantra,
            })
        .then(()=>{
    
            
           dispatch(
                {
                    type: USER_CREATED
                }
            )
            Actions.pop();
            Actions.refresh({});

        }) */
        
/*         firebase.firestore()
        .collection('POST').doc(uid).update({
          userName : userName 
        
        }) */

/*         //FireStore Database
        firebase.firestore()
        .collection('POST')
        .where()
        .update({
            userName:userName,
        });
 */

        


        //Missing to Update on Firestore 
        //Groups and Messages
        /* 
        the idea  : 
        firestore -> collection('Post') -> where(athor === currentUser)
        --> update --> userName .
        upda
        
        */
    

   // }ÅÎ

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


/* export const forgotPASSWORD = (email) =>{
return(dispatch) => {    
    firebase.auth().sendPasswordResetEmail(email)
    .then(() => { 
        console.log("DONEE!!!!!!!!!");
        resetPASSWORD_RESET_SUCCESS(dispatch) 
        Actions.auth_LOGIN({
            type:'replace'
        });
        Actions.refresh({});
    
    }
        
        ).catch(() =>{ 
            
            console.log("DONEE!!!!!!!!!");
            resetPASSWORD_FAIL(dispatch)
    })}
 
}
 */
/*
             userName = userData.userName;
               userID = userData.userID;
               userCountry = userData.userCountry;
               console.log(userName, userID, userCountry);
            dispatch(
                {
                    type: USER_FECH_SUCCESS,
                    payload: snapshot.val(),
                }
            )
*/


const loginUSER_SUCCES = (dispatch, user) => {

   dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user,
    })
    

    //Actions.execute('replace', tabKey, { tabPage });
   // Actions.feedNews( {type:'replace'});
   //Actions.replace(tabKey, { tabPage });
  //  Actions.execute('replace', tabKey, { tabPage });
  //Actions.replace(feedNews, { FeedNewsScreen });
  Actions.main(
      {
    type : 'replace'
    }
)
    
} 

const createACCOUNT_SUCCESS = (dispatch, user, name) => {
    
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




const loginUSER_FAIL = (dispatch) => {

    dispatch({
        type:LOGIN_USER_FAIL,
    })
}



export const accountFIELD_EMPTY = ({email, password}) => {

    return(dispatch) => {dispatch({
        type: ACCOUNT_FIELD_EMPTY,
        payload: { email, password }
    })}
}

export const emptyALL_FIELDS = () => {

    return(dispatch) => {dispatch({
        type: ACCOUNT_FIELD_EMPTY,

    })}

}

//Fecthing the user Data
/* export const  userPERSONAL_DATA = () => {
    const { currentUser } = firebase.auth();

   return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/info/`)
       .on('value', snapshot => {

           console.log("USER DATA FETCH From User Reducer!!!!!!!!!!!!!!!!!!!!!!");
               dispatch({
                        type: USER_PERSONAL_INFO_FETCH,
                        payload: snapshot.val(),
               }) 
                
           })
   }
}  */