import React, {useState} from "react";
import {Layout} from 'antd'
import { RouteComponentProps, withRouter } from "react-router-dom"
import { useSwitch } from "../utils/hooks";

import SiderMenu from "./SiderMenu";
import routes from '../routes/config'

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";


const {Sider} = Layout


type SiderCustomProps = RouteComponentProps<any> & {
    popoverHide?: () => void;
    collapsed?: boolean;
    smenus?: any
}

interface IMenu {
    openKeys: string[]
    selectedKey:string
}

const SiderCustom = (props:SiderCustomProps) => {
    const [collapsed, switchCollapsed] = useSwitch()
    const [firstHide, switchFirstHide] = useSwitch()
    const [menu, setMenu] = useState<IMenu>({
        openKeys:[''],
        selectedKey: ''
    })

    const layout = useSelector((state:RootState) => state.layout)

    const menuClick = (e: any) => {
        setMenu(state => ({
            ...state,
            selectedKey: e.key
        }))
        // 响应式布局龙之小屏幕点击菜单时隐藏菜单操作
        props.popoverHide?.()
    }

    const openMenu = (v: any[]):any => {
        setMenu((state) => ({
            ...state,
            openKeys: v
        }))
        switchFirstHide.turnOff()
    }

    return (
        <Sider
            trigger={null}
            breakpoint='lg'
            collapsed={collapsed}
            className='sider-custom overflow-auto'
        >
            <div className="logo" />
            <SiderMenu
                menus={[...routes.menus]}
                mode='inline'
                onClick={menuClick}
                selectedKeys={[menu.selectedKey]}
                openKeys={firstHide ? [] : menu.openKeys}
                onOpenChange={openMenu}
            />
        </Sider>
    )
}


export default withRouter(SiderCustom)