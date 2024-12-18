import {Button, Modal, Table, Form, Input, Image} from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useState, useEffect, useRef } from 'react';
import {requestToApi} from '../components/Request';
import {PlusOutlined} from "@ant-design/icons";
import PageHeader from '../components/PageHeader';

export default function Appendix() {
    const [file, setFile] = useState(new FormData())
    const [ocrResult, setOcrResult] = useState()
    const [show, setShow] = useState(false)
    const [form] = useForm()
    const [, forceUpdate] = React.useReducer(x => x + 1, 0);

    function cancel(){
        setShow(false);
    }

    function download(blob, filename) {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        // the filename you want
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }

    function submit(){
        form.validateFields().then((values) => {
            let formData = new FormData();
            formData.append("file", file)
            requestToApi.postDownloadFile('/api/v1/apps/vision/response', formData)
                .then(data => {
                    data.blob().then(blob => download(blob, 'image.jpg'))
                    forceUpdate()
                });
        })
    }

    function onFileChangeHandler(e) {
        e.preventDefault();
        setFile(e.target.files[0]);
    }

    let buttons = [
        <Button onClick={() => setShow(true)}>Обработать</Button>
    ]

    return (
        <div>
            <PageHeader title={"Компьютерное зрение"} buttons={buttons}/>
            <Modal open={show}
                   title="Распознавание текста"
                   onCancel={cancel}
                   centered={true}
                   footer={[
                       <Button onClick={submit}>
                           Распознать
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
            <Image src={ocrResult}/>
        </div>
    )

}