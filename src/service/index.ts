import axios from 'axios'
import {get, post} from './tools'
import * as config from './config'

export const gitOauthToken = (code:string) => {
    return post({
        url: `https://cors-anywhere.herokuapp.com/${config.GIT_OAUTH}/access_token`,
        data: {
            client_id: '792cdcd244e98dcd2dee',
            client_secret: '81c4ff9df390d482b7c8b214a55cf24bf1f53059',
            redirect_uri: 'http://localhost:3006/',
            state: 'reactAdmin',
            code,
        },
    })
}

export const gitOauthInfo = (access_token:string) => {
    return get({
        url:  `${config.GIT_USER}access_token=${access_token}`
    })
}

// easy-mock

// 管理员权限获取
export const admin = () => {
    return get({
        url: config.MOCK_AUTH_ADMIN
    })
}
// 访问权限获取
export const guest = () => {
    return get({
        url: config.MOCK_AUTH_VISITOR
    })
}
// 获取服务端菜单
export const fetchMenu = () => {
    return get({
        url: config.MOCK_MENU
    })
}