import {Button, Col, Divider, Input, List, notification, Row, Typography} from "antd";
import CopyFilled from "@ant-design/icons/lib/icons/CopyFilled";
import SyncOutlined from "@ant-design/icons/lib/icons/SyncOutlined";
import DeleteOutlined from "@ant-design/icons/lib/icons/DeleteOutlined";
import {CopyToClipboard} from "react-copy-to-clipboard";
import React from "react";
import {openNotificationWithIcon} from "../MNotification";


const { Paragraph } = Typography;

export default function TextRecord(props) {

    return (
        <div className="site-layout-content">
            <Row justify="center">
                <Col span={18}>
                    <Input value={props.inputValue} onChange={props.handleInputChange} size="large"
                           onKeyDown={props.handleKeyDown} placeholder="输入文本,按Enter键" prefix={<CopyFilled/>}/>
                </Col>
                <Col span={4}>
                    <Button type="primary" size='large' onClick={props.handleAdd}
                            >添加</Button>
                </Col>
                <Row className="area-history-actions">
                    <Col>
                        <Button
                            type="dashed"
                            icon={<SyncOutlined/>}
                            // loading={loadings[1]}
                            onClick={props.handleSync}
                        >
                            同步记录
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            type="dashed"
                            icon={<DeleteOutlined/>}
                            // loading={loadings[1]}
                            onClick={props.handleClear}
                        >
                            清空记录
                        </Button>
                    </Col>
                </Row>
            </Row>

            <Divider orientation="left">历史文本</Divider>
            <List
                size="large"
                bordered
                dataSource={props.records}
                renderItem={item =>
                    <List.Item>
                        <Row justify="space-between" style={{width: "100%"}}>
                            <Col style={{maxWidth: "70%"}}>
                                <Paragraph ellipsis>
                                    {item.text_content}
                                </Paragraph>
                            </Col>
                            <Col>
                                <CopyToClipboard text={item.text_content}
                                                 onCopy={() => openNotificationWithIcon('success', '复制成功', '')}>
                                    <Button type="primary" size='middle'>复制</Button>
                                </CopyToClipboard>
                            </Col>
                        </Row>
                    </List.Item>
                }
            />
        </div>
    );
}
