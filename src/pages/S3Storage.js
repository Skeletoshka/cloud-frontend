import {Button, Modal, Table, Form, Input} from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useState, useEffect } from 'react';
import {requestToApi} from '../components/Request';
import {Link} from "react-router-dom";
import PageHeader from '../components/PageHeader';

export default function Appendix() {
    const [appendixList, setAppendixList] = useState([])
    const [file, setFile] = useState(new FormData())
    const [loading, setLoading] = useState(true)
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
            title: "Дата создания",
            dataIndex: "dateCreate",
            key: "dateCreate"
        },
        {
            title: "Файлы",
            dataIndex: "files",
            key: "files",
            render: (_, entity) => {
                return <Link to={'/files/' + entity.name}>Просмотреть файлы</Link>
            }
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
            requestToApi.get("/api/v1/apps/bucket/getlist")
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

    function edit(id){
        setShow(true)
    }

    function submit(){
        form.validateFields().then((values) => {
            requestToApi.post('/api/v1/apps/bucket/add', values)
                .then(data => {
                    reload()
                    setShow(false)
                });
        })
    }

    const deleteRows = () => {
        requestToApi.post("/api/v1/apps/bucket/delete", selectedRowKeys)
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
            <PageHeader title={"Бакеты"} buttons={buttons}/>
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
                            name="name"
                            label="Название бакета">
                            <Input name="appendixName"
                                placeholder="Название файла"/>
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