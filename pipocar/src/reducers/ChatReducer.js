import {
    
    ADD_MESSAGES,
    MESSAGE_GROUP_FETCH

} from '../actions/types';
import { GiftedChat } from "react-native-gifted-chat";

const INITIAL_STATE = { 
    messages:[],
    fullData:[],
    query:''
}


export default chatReducer = (state = INITIAL_STATE , action) => {
    switch (action.type) {
      case ADD_MESSAGES:
        //return { ...state, messages: [action.messages, ...state.messages]}; 
        return {messages : GiftedChat.append(state.messages, action.messages)}

        case MESSAGE_GROUP_FETCH: //Must be checked 
        return {  ...state, messages: action.payload, fullData: action.payload, query:''}
      default:
        return state;
    }
  };  