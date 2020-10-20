import React, {useEffect, useState} from 'react';
import {Layout, Menu, Breadcrumb, Input, Button, Grid, Row, Col, Divider, List, notification} from 'antd';
import './App.css';
import {connect} from "react-redux";
import CliperLoginPage from "./Containers/LoginContainer";
import {addTextRecords, clearTextRecords, finishLogin, logout, setLogin} from "./store/actions/cliper/actions";
import MHeader from "./Components/MHeader";
import TextRecordContainer from "./Containers/cliper/TextRecordContainer";
import ShortUrlContainer from "./Containers/shorturl/ShortUrlContainer";


const {Header, Content, Footer} = Layout;

function App(props) {
    useEffect(() => {
        let isLogin = localStorage.getItem("isLogin");
        if (isLogin != '1') {
            props.setLogin(false);
        } else {
            let user = localStorage.getItem("user");
            if (user === "undefined") {
                localStorage.clear();
                props.setLogin(false);
            } else {
                user = JSON.parse(user);
                props.finishLogin(user);
            }
        }
    }, []);

    const [page, setPage] = useState(1);

    const handleClick = (e) => {
        let key = e.key;
        switch (key) {
            case '1':
                setPage(1);
                break;
            case '2':
                setPage(2);
                break;
            default:
                break;
        }
    }

    return (
        <div className="App">

            <CliperLoginPage/>
            <Layout className="layout">
                <MHeader nick={props.user.key} handleLogout={props.logout} isLogin={props.isLogin}
                         handleClick={handleClick}/>
                <Content style={{marginTop: 76}}>
                    {page === 1 ? <TextRecordContainer/> : null}
                    {page === 2 ? <ShortUrlContainer/> : null}
                </Content>
                <Footer style={{textAlign: 'center'}}>Justsmile ©2020 Created by WanSun</Footer>
            </Layout>

        </div>
    );
}

const mapStateToProps = (state) => ({
    records: state.records,
    user: state.user,
    isLogin: state.isLogin

});
const mapDispatchToProps = (dispatch) => ({
    setLogin: (v) => {
        dispatch(setLogin(v));
    },
    finishLogin: (v) => {
        dispatch(finishLogin(v));
    },
    logout: () => {
        dispatch(logout());
    }
});
export default connect(
    mapStateToProps, mapDispatchToProps
)(App);
