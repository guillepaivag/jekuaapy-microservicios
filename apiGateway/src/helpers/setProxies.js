import { application } from 'express'
import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware'
import config from '../configs/config.js'

export const setProxies = (app = application) => {

    const listServiceName = Object.keys(config.urlServices)
    for (const serviceName of listServiceName) {
        const PROXY_PATH = `/${serviceName}`
        app.use(PROXY_PATH, createProxyMiddleware({ 
            target: config.urlServices[serviceName], 
            changeOrigin: true,
            followRedirects: true,
            secure: true,
            onProxyReq: fixRequestBody, 
            pathRewrite: { [PROXY_PATH]: `/` },
        }))
    }
    
}