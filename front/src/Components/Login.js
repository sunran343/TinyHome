import React from "react";
import {Button, Col, Input, Modal, Switch} from "antd";
import CopyFilled from "@ant-design/icons/lib/icons/CopyFilled";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import {Typography, Space} from 'antd';

const {Text, Link} = Typography;

export default function Login(props) {


    return (
        <div>
            <Modal
                title="告诉我,你的名字~"
                visible={props.visible}
                onOk={props.handleOk}
                onCancel={props.handleCancel}
                okText={"开始使用"}
                cancelText={"暂时不用"}
            >
                <Space direction="vertical" style={{width: "100%"}}>
                    <Input value={props.nickValue} size="large" placeholder="输入昵称" prefix={<UserOutlined/>}
                           onChange={props.handleInputChange}/>

                    <Text type="danger">注:默认昵称即身份,如隐私需要可设置密码!</Text>
                </Space>


            </Modal>
        </div>
    );

}
