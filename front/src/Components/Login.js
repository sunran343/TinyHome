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
                title="告诉我,你的名字是什么~"
                visible={props.visible}
                onOk={props.handleOk}
                onCancel={props.handleCancel}
                okText={"开始使用"}
                cancelText={"暂时不用"}
            >
                <Space direction="vertical" style={{width: "100%"}}>
                    <Input value={props.nickValue} size="large" placeholder="输入昵称" prefix={<UserOutlined/>}
                           onChange={props.handleInputChange}/>

                    <Text type="danger">注:昵称是你的身份哦，下次登录直接用昵称登录就好啦！</Text>
                </Space>


            </Modal>
        </div>
    );

}
