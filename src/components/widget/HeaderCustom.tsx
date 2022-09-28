import React, {useEffect, useState} from "react";
import {Layout, Popover, Menu, Badge} from 'antd'
import {useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import screenfull from 'screenfull'

import { RootState } from "../../store";
import { useSwitch } from "../../utils/hooks";
import {gitOauthToken, gitOauthInfo} from '../../service'
import SiderCustom from "../SiderCustom";
import { PwaInstaller } from "./PwaInstaller";

import avatar from '../../style/imgs/b1.jpg'


import {
    BarsOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    ArrowsAltOutlined,
    NotificationOutlined
} from '@ant-design/icons'
import { parseQuery } from "../../utils";

const {Header} = Layout
const {SubMenu, ItemGroup} = Menu

type HeaderCustomProps = {
    toggle: () => void;
    collapsed: boolean;
    user: any;
    responsive?: any;
    path?: string;
}

export const HeaderCustom = (props: HeaderCustomProps) => {

    const {toggle, collapsed} = props

    const appLayout = useSelector((state:RootState) => state.layout)
    const [visible, setVisible] = useSwitch()

    const [user, setUser] = useState<any>()
    const history = useHistory()

    useEffect(() => {
        const query = parseQuery()
        const userData = localStorage.getItem('user')

        if(!userData && query.code) {
            gitOauthToken(query.code as string).then((res:any) => {
                gitOauthInfo(res.access_token).then((info:any) => {
                    setUser({
                        user: info
                    })
                    localStorage.setItem('user', info)
                })
            })
        } else {
            setUser({
                user: userData
            })
        }
    }, [])


    const handleVisibleChange = (visible:any) => {
        return visible ? setVisible.turnOn() : setVisible.turnOff()
    }

    const subMenuTitle = () => (
        <span className="avatar">
            <img src={avatar} alt="头像" />
            <i className="on bottom b-white" />
        </span>
    )

    const screenFull = () => {
        if(screenfull.isEnabled) {
            screenfull.toggle()
        }
    }   

    const menuClick = (e:any) => {
        e.key === 'logout' && logout()
    }

    const logout = () => {
        localStorage.removeItem('user')
        history.push('/login')
    }

    return (
        <Header
            className="custom-theme header"
        >
            {
                appLayout.responsive.isMobile
                ? 
                    <Popover
                        trigger={'click'}
                        placement="bottomLeft"
                        visible={visible}
                        onVisibleChange={handleVisibleChange}
                        content={<SiderCustom popoverHide={setVisible.turnOff} />}
                    >
                        <BarsOutlined 
                            className="header__trigger custom-trigger"
                        />
                    </Popover>
                :
                    collapsed
                        ? 
                            <MenuUnfoldOutlined
                                className="header__trigger custom-trigger"
                                onClick={toggle}
                            />
                        :
                            <MenuFoldOutlined
                                className="header__trigger custom-trigger"
                                onClick={toggle}
                            />
            }

            <Menu
                mode="horizontal"
                className="leading-15 float-right"
                onClick={menuClick}
            >
                <Menu.Item key={'pwa'}>
                    <PwaInstaller />
                </Menu.Item>

                <Menu.Item key={'full'}>
                    <ArrowsAltOutlined onClick={screenFull} />
                </Menu.Item>

                <Menu.Item key={'1'}>
                    <Badge
                        count={25}
                        overflowCount={10}
                        className="qq mr-3"
                    >
                        <NotificationOutlined />
                    </Badge>
                </Menu.Item>

                <SubMenu
                    title={subMenuTitle}
                >
                    <ItemGroup
                        title={'用户中心'}
                    >
                        <Menu.Item key={'setting:1'}>你好 - {user?.userName}</Menu.Item>
                        <Menu.Item key={'setting:2'}>个人信息</Menu.Item>
                        <Menu.Item key={'logout'}>
                            <span onClick={logout}>退出登录</span>
                        </Menu.Item>
                    </ItemGroup>
                    <ItemGroup 
                        title={'设置中心'}
                    >
                        <Menu.Item key={'setting:3'}>个人设置</Menu.Item>
                        <Menu.Item key={'setting:4'}>系统设置</Menu.Item>
                    </ItemGroup>
                </SubMenu>
            </Menu>
        </Header>
    )
}