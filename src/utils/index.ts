import querystring from 'query-string';

export const parseQuery = () => {
    return querystring.parseUrl(window.location.href).query
}


export const checkLogin = (permits:any):boolean => {
    return (process.env.NODE_ENV === 'production' && !permits) ||
    process.env.NODE_ENV === 'development' 
}