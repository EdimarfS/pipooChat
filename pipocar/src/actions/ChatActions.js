import { 
    ADD_MESSAGES,
    MESSAGE_GROUP_FETCH
} from '../actions/types';
import firebase from 'firebase';


export const addMESSAGES = (messages) => ({
    type: ADD_MESSAGES,
    messages
})

export const messageFETCH = (thread) => {
    
    return(dispatch) => {
        firebase
        .firestore()
        .collection('MESSAGE_THREADS')
        .doc(thread._id)
        .collection('MESSAGES')
        .orderBy('createdAt', 'desc')
        .onSnapshot( querySnapshot => {
            const messages = querySnapshot.docs.map(doc => {
                const firebaseData = doc.data();


                const data = { 
                    _id: doc.id,
                    text: '',
                    createdAt: new Date().getTime(),
                    ...firebaseData
                }

                if(!firebaseData.system)
                {
                    data.user = { 
                        ...firebaseData.user,
                        user: firebaseData.user.displayName
                    }
                }
                return data;
            })
            dispatch({
                type: MESSAGE_GROUP_FETCH,
                payload: messages,
                
            })
        })  
    }

   
}