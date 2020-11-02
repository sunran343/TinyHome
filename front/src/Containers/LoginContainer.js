import React from "react";
import {Typography} from 'antd';
import {connect} from "react-redux";
import Login from "../Components/Login";
import {
    addTextRecords,
    changeDialogVisible,
    changeLoginInput,
    changeRegistered, clearLoginInput, clearTextRecords,
    finishLogin
} from "../store/actions/cliper/actions";
import axios from "axios";
import {BaseApi} from "../store/constant";

function LoginContainer(props) {
    //注册昵称
    const register = (nick) => {
        let formData = new FormData()
        formData.append("key", nick);
        axios.post(BaseApi + "/user/", formData)
            .then(function (res) {
                if (res.status === 201) {
                    props.finishLogin(res.data);
                }
            }).catch(function (error) {

        });
    }
    //查询昵称是否存在
    const queryNickIsRegistered = (nick) => {
        axios.get(BaseApi + "/user/?key=" + nick)
            .then(function (res) {
                if (res.status === 200) {
                    //存在
                    if (res.data.length > 0) {
                        props.finishLogin(res.data[0]);
                    } else {
                        //存储数据
                        register(nick);
                    }
                }
            }).catch(function (error) {

        })
    }

    const handleOk = () => {
        let nick = props.cliperLogin.inputValue;
        queryNickIsRegistered(nick);
        props.clearLoginInput();
    }
    const handleCancel = () => {
        props.changeDialogVisible(false);
    }

    return (
        <Login visible={props.cliperLogin.dialogVisible}
               nickValue={props.cliperLogin.inputValue}
               handleOk={handleOk}
               handleCancel={handleCancel}
               handleInputChange={props.changeInput}
        />
    );
}

const mapStateToProps = (state) => ({
    cliperLogin: state.cliper.cliperLogin,
    isLogin: state.cliper.isLogin
});
const mapDispatchToProps = (dispatch) => ({
    changeInput: (e) => {
        dispatch(changeLoginInput(e.target.value));
    },
    clearLoginInput: (v) => {
        dispatch(clearLoginInput(v));
    },
    finishLogin: (value) => {
        dispatch(finishLogin(value));
    },
    changeDialogVisible: (v) => {
        dispatch(changeDialogVisible(v));
    },



});
export default connect(
    mapStateToProps, mapDispatchToProps
)(LoginContainer);
