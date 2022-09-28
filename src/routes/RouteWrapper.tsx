import React, { useMemo } from "react";
import DocumentTitle from 'react-document-title'
import querystring from 'query-string';
import { IFMenuBase } from "./config";
import { RouteComponentProps } from "react-router-dom";

type RouteWrapperProps = {
    Comp: any
    route:IFMenuBase
} & RouteComponentProps
export const RouteWrapper = (props:RouteWrapperProps) => {
    let {Comp, route, ...restProps} = props

    // 缓存query 避免每次生成新的query
    const queryMemo = useMemo(() => {
        const queryReg = /\?\S*/g
        const matchQuery = (reg:RegExp) => {
            const queryParams = restProps.location.search.match(reg)
            return queryParams ? queryParams[0] : '{}'
        }
        return querystring.parse(matchQuery(queryReg))
    }, [restProps.location.search])

    const mergeQueryToProps = () => {
        const queryReg = /\?\S*/g
        const removeQueryInRouter = (restProps:any, reg:RegExp) => {
            const {params} = restProps.match
            Object.keys(params).forEach(key => {
                params[key] = params[key] && params[key].replace(reg, '')
            })
            restProps.match.params = {...params}
        }
        removeQueryInRouter(restProps, queryReg)

        const merge = {
            ...restProps,
            query: queryMemo
        }

        return merge
    }

    return (
        <DocumentTitle
            title={route.title}
        >
            <Comp {...mergeQueryToProps} />
        </DocumentTitle>
    )
}