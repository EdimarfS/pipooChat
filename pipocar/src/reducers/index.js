import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ChatReducer from './ChatReducer';
import PostReducer from './PostReducer';
import CreateGroupReducer from './CreateGroupReducer';

export default combineReducers({

    auth: AuthReducer,
    post: PostReducer,
    chat: ChatReducer,
    group: CreateGroupReducer,

    
})