import React, {useEffect} from "react";
import TextRecord from "../../Components/cliper/TextRecord";
import {connect} from "react-redux";
import {
    addTextRecords,
    changeLoginInput,
    changeRecordInput, clearRecordInput,
    clearTextRecords, logout
} from "../../store/actions/cliper/actions";
import axios from "axios";
import {BaseApi} from "../../store/constant";
import {notification} from "antd";
import {openNotificationWithIcon} from "../../Components/MNotification";


function TextRecordContainer(props) {

    const loadRecords = (isShowSucc) => {
        let userId = props.user.id;
        axios.get(BaseApi + "/record/?user=" + userId + "&type=0&is_delete=0")
            .then(function (res) {
                if (res.status === 200) {
                    props.clearTextRecords();

                    props.addTextRecords(res.data);
                    if (isShowSucc) {
                        openNotificationWithIcon('success', '数据已同步', '');
                    }

                }
            }).catch(function (error) {

        });
    }
    const clearRecords = () => {
        let userId = props.user.id;
        axios.get(BaseApi + "/record/deleteByUserId/?userId=" + userId)
            .then(function (res) {
                if (res.status === 200 && parseInt(res.data) >= 0) {
                    openNotificationWithIcon('success', '已全部清除', '')
                    loadRecords(false);
                }
            }).catch(function (error) {

        });
    }
    const addRecords = (inputValue) => {
        let userId = props.user.id;
        let formData = new FormData();
        formData.append("user", userId);
        formData.append("text_content", inputValue);
        axios.post(BaseApi + "/record/", formData)
            .then(function (res) {
                if (res.status === 201) {
                    openNotificationWithIcon('success', '添加成功', '')
                    loadRecords(false);
                }
            }).catch(function (error) {

        });
    }
    //检查是否的登录了,返回false代表未登录并弹出登录框,返回true表示登录了
    const checkIfNotLogin = () => {
        if (!props.isLogin) {
            props.logout();
            return false;
        }
        return true;
    }
    const handleSync = () => {
        if (!checkIfNotLogin()) {
            return;
        }
        loadRecords(true);
    }
    const handleClear = () => {
        if (!checkIfNotLogin()) {
            return;
        }
        clearRecords();
    }
    const handleAdd = () => {
        if (!checkIfNotLogin()) {
            return;
        }
        addRecords(props.inputValue);
        props.clearRecordInput();
    }
    const handleInputChange = (e) => {
        props.changeRecordInput(e.target.value);
    }
    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            handleAdd();
        }
    }

    useEffect(() => {
        if (props.isLogin) {
            //加载数据
            loadRecords(true);
        }
    }, [props.isLogin]);

    return (
        <TextRecord records={props.records}
                    handleSync={handleSync}
                    handleClear={handleClear}
                    handleAdd={handleAdd}
                    handleKeyDown={handleKeyDown}
                    handleInputChange={handleInputChange}
                    inputValue={props.inputValue}
        />
    );
}

const mapStateToProps = (state) => ({
    isLogin: state.cliper.isLogin,
    records: state.cliper.records.texts,
    user: state.cliper.user,
    inputValue: state.cliper.records.inputValue
});
const mapDispatchToProps = (dispatch) => ({
    addTextRecords: (v) => {
        dispatch(addTextRecords(v));
    },
    clearTextRecords: () => {
        dispatch(clearTextRecords());
    },
    changeRecordInput: (v) => {
        dispatch(changeRecordInput(v));
    },
    clearRecordInput: () => {
        dispatch(clearRecordInput());
    },
    logout: () => {
        dispatch(logout());
    }
});
export default connect(
    mapStateToProps, mapDispatchToProps
)(TextRecordContainer);
