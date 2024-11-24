import {Button, Modal, Table, Form, Input} from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useState, useEffect } from 'react';
import {useParams} from "react-router-dom";
import {requestToApi} from '../components/Request';
import {PlusOutlined} from "@ant-design/icons";
import PageHeader from '../components/PageHeader';

export default function Appendix() {
    const {bucket} = useParams()
    const [file, setFile] = useState(new FormData());
    const [loading, setLoading] = useState(true)
    const [appendixList, setAppendixList] = useState([])
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [show, setShow] = useState(false)
    const [form] = useForm()

    const columns = [
        {
            title: "Наименование",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Дата последней модификации",
            dataIndex: "modify",
            key: "modify"
        },
        {
            title: "Размер, бит",
            dataIndex: "size",
            key: "size"
        }
    ]

    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange:onSelectChange
    };

    useEffect(() => {
        if(loading) {
            requestToApi.get("/api/v1/apps/bucket/file/getlist/" + bucket)
                .then(data => {
                    setAppendixList(data);
                })
                .finally(() => setLoading(false));
        }
    }, [loading])

    function reload(){
        setLoading(true);
    }

    function cancel(){
        setShow(false);
    }

    function edit(){
        form.setFieldValue("avatar", null)
                setShow(true)
    }

    function submit(){
        form.validateFields().then((values) => {
            let formData = new FormData();
            formData.append("file", file)
            requestToApi.postFile('/api/v1/apps/bucket/file/upload/' + bucket, formData)
                .then(data => {
                    reload()
                    setShow(false)
                });
        })
    }

    const deleteRows = () => {
        requestToApi.post("/api/v1/apps/bucket/file/delete/" + bucket, selectedRowKeys)
            .then(data => {
                reload()
            })
    }

    function onFileChangeHandler(e) {
        e.preventDefault();
        setFile(e.target.files[0]);
    }

    let buttons = [
        <Button onClick={deleteRows}>Удалить</Button>,
        <Button onClick={reload}>Обновить</Button>,
        <Button onClick={() => edit(null)}>Добавить</Button>
    ]

    return (
        <div>
            <PageHeader title={"Файлы"} buttons={buttons}/>
            <Modal open={show}
                   title="Изменение файла"
                   onCancel={cancel}
                   centered={true}
                   footer={[
                       <Button onClick={submit}>
                           Добавить
                       </Button>,
                       <Button onClick={cancel}>
                           Назад
                       </Button>
                   ]}>
                <Form
                    form={form}
                    layout={"vertical"}
                    style={{padding: 20}}>
                        <Form.Item
                            name="file"
                            label="Загрузка файла"
                            rules={[
                                {
                                    required: true,
                                    message: "Файл не может быть пустым"
                                }
                            ]}>
                                <Input type={"file"} icon={<PlusOutlined/>} onChange={onFileChangeHandler}/>
                        </Form.Item>
                </Form>
            </Modal>
            <Table
                dataSource={appendixList}
                columns={columns}
                loading={loading}
                rowSelection={rowSelection}
                rowKey={(record) => record.name}/>
        </div>
    )

}