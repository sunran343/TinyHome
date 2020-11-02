import React, {Component} from "react";
import {connect} from "react-redux";
import {ShortUrl} from "../../Components/shorturl/ShortUrl";
import {setInputUrl, updateHistory} from "../../store/actions/shorturl/actions";
import axios from "axios";
import {BaseApi} from "../../store/constant";
import {openNotificationWithIcon} from "../../Components/MNotification";

@connect((state, props) => {
    let mstate = state.shortUrl;
    return ({
        inputUrl: mstate.inputUrl,
        history: mstate.history,
        user: state.cliper.user
    });
})
export default class ShortUrlContainer extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.syncHistory(true);
    }

    syncHistory = (showDia) => {
        let that = this;
        axios.get(BaseApi + "/shorturl/?user=" + this.props.user.id)
            .then(function (res) {
                if (res.status === 200) {
                    that.props.dispatch(updateHistory(res.data));
                    if (showDia) {
                        openNotificationWithIcon('success', '数据已同步', '');
                    }
                }
            }).catch(function (error) {

        });
    }

    handleInputChange = (e) => {
        let input = e.target.value;
        this.props.dispatch(setInputUrl(input));
    }
    handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            this.handleAdd();
        }
    }
    handleAdd=()=>{
        let inputUrl = this.props.inputUrl;
        let formData = new FormData();
        formData.append("url", inputUrl);
        formData.append("userId", this.props.user.id);
        let that = this;
        axios.post(BaseApi + "/shorturl/long2short/", formData)
            .then(function (res) {
                if (res.data.code === 200) {
                    openNotificationWithIcon('success', '短网址成功', '');
                    that.props.dispatch(setInputUrl(''));
                    that.syncHistory();
                }else{
                    openNotificationWithIcon('error', res.data.message, '');
                }
            }).catch(function (error) {

        });
    }
    handleSync=()=>{
        this.syncHistory(true);
    }
    handleClear=()=>{
        let formData = new FormData();
        formData.append("userId", this.props.user.id);
        let that = this;
        axios.post(BaseApi + "/shorturl/deleteByUserId/", formData)
            .then(function (res) {
                if (res.status === 200) {
                    that.syncHistory();
                }
            }).catch(function (error) {

        });
    }

    render() {
        return (
            <ShortUrl inputValue={this.props.inputUrl}
                      handleInputChange={this.handleInputChange}
                      handleKeyDown={this.handleKeyDown}
                      data={this.props.history}
                      handleAdd={this.handleAdd}
                      handleSync={this.handleSync}
                      handleClear={this.handleClear}
            />
        );
    }
}

