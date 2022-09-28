
import axios from 'axios'
import {message} from 'antd'

interface IFRequestParam {
    url: string
    msg?: string
    config?:any
    data?: any
}

export const get = ({
    url,
    msg = '接口异常',
    config
}:IFRequestParam) => {
    return axios.get(url, config)
        .then((res) => res.data)
        .catch((err) => {
            console.error(err)
            message.warn(msg)
        })
}


export const post = ({
    url,
    msg = '接口异常',
    config
}:IFRequestParam) => {
    return axios.post(url, config)
                .then((res) => res.data)
                .catch((err) => {
                    console.error(err)
                    message.warn(msg)
                })
}