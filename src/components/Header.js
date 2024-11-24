import React from 'react';
import { useNavigate } from "react-router-dom";
import {Button, Image, Menu, MenuProps} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {requestToApi} from "./Request";

const Header = ()=>{
    const itemsPublic =[
        {
            label: <div style={{fontSize:"1.5em"}}>ПНИПУ</div>
        }
    ]

    return(
        <div style={{backgroundColor: "orange"}}>
            <Menu mode={"horizontal"} items={itemsPublic} style={{backgroundColor: "orange"}}/>
        </div>
    )
}
export default Header; 