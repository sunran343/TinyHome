import { handleActions } from 'redux-actions'

// const tabList = JSON.parse(sessionStorage.getItem('tabList'))

const initialState = {
    inputUrl: '',
    history:[]
}

const shortUrlResult = handleActions({
    'set input url'(state, action) {
        return{...state, inputUrl: action.payload}
    },
    'update history'(state,action){
        return{...state, history: action.payload}
    }
}, initialState)

export { shortUrlResult as shortUrl }
