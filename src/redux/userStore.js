import * as ActionTypes from './ActionTypes';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true,user:user,errMsg:null } : {user:null,loggedIn:false, errMsg:null};

export const User = (state = initialState, action) => {

    switch (action.type) {
        case ActionTypes.ADD_USER:
            return {...state, errMsg:null,loggedIn:true, user:action.payload};
        
        case ActionTypes.REGISTER_FAILED:
            return {...state, loggedIn:false, errMsg:action.payload, user:null};
        
        case ActionTypes.LOGOUT_USER:
            localStorage.removeItem('user');
            return {...state, loggedIn:false, errMsg:action.payload, user:null};
        
        case ActionTypes.LOGIN_FAILED:
                return {...state, loggedIn:false, errMsg:action.payload, user:null};
        
        case ActionTypes.REDIRECT_USER:
                return {...state, redirectTo:action.payload}
                    
        default:
          return state;
      }
};