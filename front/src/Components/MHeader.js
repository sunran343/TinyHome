import {Button, Col, Layout, Menu, Row, Typography} from "antd";
import React from "react";

const {Text, Link} = Typography;
const {Header} = Layout;

export default function MHeader(props) {
    return (
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <Row>
                <Col>
                    <div className="logo"/>
                </Col>
                <Col style={{flexGrow: 1}}>
                    <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']} onClick={props.handleClick}>
                        <Menu.Item key="1">剪贴板</Menu.Item>
                        <Menu.Item key="2">短网址</Menu.Item>
                    </Menu>
                </Col>
                <Col>
                    <Text>你好,<Text type="success" strong={true}>{props.nick}</Text></Text>
                </Col>
                <Col>
                    <Button type="link" onClick={props.handleLogout}
                            style={{display: props.isLogin ? "initial" : "none"}}>退出</Button>
                </Col>
            </Row>


        </Header>
    )
}
