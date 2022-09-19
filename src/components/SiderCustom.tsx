import React from "react";
import {Layout} from 'antd'
import { RouteComponentProps } from "react-router-dom"


type SiderCustomProps = RouteComponentProps<any> & {
    popoverHide?: () => void;
    collapsed?: boolean;
    smenus?: any
}

const SiderCustom = (props:SiderCustomProps) => {

}