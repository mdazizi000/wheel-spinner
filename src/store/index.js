import {createStore} from 'redux'

const confetisReducer=(state= {start:false} , action )=>{
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

    return  state
};

const  store = createStore(confetisReducer);

export  default store