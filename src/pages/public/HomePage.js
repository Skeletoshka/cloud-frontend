import React, { useEffect } from "react";
import {requestToApi} from "../../components/Request";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

export default function HomePage() {
    const navigate = useNavigate()
    return (
        <div>
            <Button onClick={() => navigate("/s3")}>S3 хранилище</Button>
            <Button onClick={() => navigate("/vision")}>Распознование изображений</Button>
        </div>
    )
}