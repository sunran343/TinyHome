import { handleActions } from 'redux-actions'

// const tabList = JSON.parse(sessionStorage.getItem('tabList'))

const initialState = {
    inputUrl: '',
    history:[]
}

const shortUrlResult = handleActions({
    'set input url'(state, action) {
        return{...state, inputUrl: action.inputUrl}
    }
}, initialState)

export { shortUrlResult as default }
