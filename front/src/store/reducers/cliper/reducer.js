import {Login, Record} from "../../actions/cliper/actionTypes";

const defaultValue = {
    records: {
        inputValue: '',
        texts: [],
        files: []
    },
    isLogin: false,
    user: {
        key: "陌生人",
        id: -1
    },
    cliperLogin: {
        dialogVisible: false,
        inputValue: '',
        isRegistered: false,
    }
}

export const reducer = (state = defaultValue, action) => {
    let data = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case Login.CHANGE_DIALOG_VISIBLE:
            data.cliperLogin.dialogVisible = action.value;
            return data;
        case Login.CHANGE_INPUT:
            data.cliperLogin.inputValue = action.value;
            data.cliperLogin.isRegistered = false;
            return data;
        case Login.CLEAR_INPUT:
            data.cliperLogin.inputValue = '';
            return data;
        case Login.CHANGE_REGISTERED:
            data.cliperLogin.isRegistered = action.value;
            return data;
        case Login.FINISH_LOGIN:
            data.isLogin = true;
            data.cliperLogin.dialogVisible = false;
            data.user = action.value;
            localStorage.setItem('user', JSON.stringify(action.value));
            localStorage.setItem('isLogin', '1');
            return data;
        case Login.SET_LOGIN:
            data.isLogin = action.value;
            if (data.isLogin) {
                data.cliperLogin.dialogVisible = false;
            } else {
                data.cliperLogin.dialogVisible = true;
            }
            return data;
        case Login.LOGOUT:
            data.isLogin = false;
            data.user.key = '陌生人';
            data.user.id = -1;
            data.records.texts = [];
            localStorage.clear();
            data.cliperLogin.dialogVisible = true;
            return data;
        case Record.Text.ADD_RECORDS:
            let texts1 = data.records.texts;
            texts1 = texts1.concat(action.value);
            data.records.texts = texts1;
            return data;
        case Record.Text.CLEAR_RECORDS:
            let texts2 = data.records.texts;
            texts2.splice(0, texts2.length);
            return data;
        case Record.CHANGE_INPUT:
            data.records.inputValue = action.value;
            return data;
        case Record.CLEAR_INPUT:
            data.records.inputValue = '';
            return data;

    }
    return state;
}
