import React from "react";
import {connect} from "react-redux";
import  {Button, Col, Divider, Input, Row,Table} from "antd";
import CopyFilled from "@ant-design/icons/lib/icons/CopyFilled";
import SyncOutlined from "@ant-design/icons/lib/icons/SyncOutlined";
import DeleteOutlined from "@ant-design/icons/lib/icons/DeleteOutlined";


export function ShortUrl(props) {
    const columns = [
        {
            title: '短网址',
            dataIndex: 'shortUrl',
            key: 'shortUrl',
            render: text => <a>{text}</a>,
        },
        {
            title: '原网址',
            dataIndex: 'longUrl',
            key: 'longUrl',
            render: text => <a>{text}</a>,
        },
    ]
    return (
        <div className="site-layout-content">
            <Row justify="center">
                <Col span={18}>
                    <Input value={props.inputValue} onChange={props.handleInputChange} size="large"
                           onKeyDown={props.handleKeyDown} placeholder="输入网址,按Enter键" prefix={<CopyFilled/>}/>
                </Col>
                <Col span={4}>
                    <Button type="primary" size='large' onClick={props.handleAdd}
                    >短网址</Button>
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

                <Divider orientation="left">历史短网址</Divider>

                <Table style={{width:'100%'}} columns={columns} dataSource={props.data} pagination={false}/>
            </Row>
        </div>
    )
}

