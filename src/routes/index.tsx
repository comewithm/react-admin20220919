import { render } from "@testing-library/react";
import React, { Component } from "react";
import { useSelector } from "react-redux";
import {Route, Redirect, Switch} from 'react-router-dom'
import { RootState } from "../store";
import { checkLogin } from "../utils";

import routesConfig,{IFMenu, IFMenuBase} from './config'
import {RouteWrapper} from './RouteWrapper'

import AllComponents from '../components'

type CRouterProps = {
    auth:any
}
export const CRouter = (props:CRouterProps) => {
    const {auth} = props
    const appLayout = useSelector((state: RootState) => state.layout)


    const getPermits = ():any[] | null => {
        return auth ? auth.permissions : null
    }

    const requireAuth = (permit:any, component:React.ReactElement) => {
        const permits = getPermits()
        if(!permits || !permits.includes(permit)) {
            return <Redirect to={'404'} />
        }
        return component
    }

    const requireLogin = (component:React.ReactElement, permit: any) => {
        const permits = getPermits()
        if(!checkLogin(permits)) {
            return <Redirect to={'/login'} />
        }
        return permit ? requireAuth(permit, component) : component
    }

    const createRoute = (key: string) => {
        return routesConfig[key].map(createMenu)
    }

    const createMenu = (routeInfo: IFMenu) => {
        const Component = routeInfo.component && AllComponents[routeInfo.component]
        const route = (r: IFMenuBase) => {
            return (
                <Route
                    key={r.route || r.key}
                    exact
                    path={r.route || r.key}
                    render={(props) => {
                        // 重新包装组件
                        const wrapper = (
                            // TODO
                            <RouteWrapper
                                {...{
                                    route: r,
                                    Comp: Component,
                                    ...props
                                }}
                            />
                        )
                        return r.login ? wrapper : requireLogin(wrapper, r.requireAuth)
                    }}
                />
            )
        }

        const subRoute = (r: IFMenu):any => {
            return r.subs && r.subs.map((subR:IFMenu) => {
                subR.subs ? subRoute(subR) : route(subR)
            })
        }

        return routeInfo.component ? route(routeInfo) : subRoute(routeInfo)
    }

    return (
        <Switch>
            {
                Object.keys(routesConfig).map(key => createRoute(key))
            }
        </Switch>
    )
}