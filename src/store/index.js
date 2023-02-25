import {createStore} from 'redux'

const states = {
    start:false,
    user:null,
    token:null,
    balance:null
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
            balance: action.balance,
        }
    }

    if (action.type === 'updateUser'){
        localStorage.setItem('user',action.data)
        return {
            user: action.data,
        }
    }

    return  state
};

const  store = createStore(confetisReducer);

export  default store