import {createStore} from 'redux'

const states = {
    start:false,
    user:null,
    token:null
}


const confetisReducer=(state= states , action )=>{
    if (action.type === 'show'){
        return {
            start:  !state.start,
        }
    }

    if (action.type === 'hidden'){
        return {
            start: !state.start,
        }
    }
    if (action.type === 'setUser'){
        localStorage.setItem('user',action.data)
        localStorage.setItem('token',action.token)
        return {
            user: action.data,
            token: action.token,
        }
    }

    return  state
};

const  store = createStore(confetisReducer);

export  default store