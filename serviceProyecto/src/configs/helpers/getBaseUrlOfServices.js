import { baseUrls, baseUrlsParams } from "./configBaseUrlOfApis.js"

export const getBaseUrlOfServices = (environment = 'development') => {    
    const tipoUrl = environment === 'production' ? 'prod' :
    environment === 'development' ? 'dev' :
    environment === 'testing' ? 'test' : ''
    
    const apis = {}
    Object.keys(baseUrls)
    .map(v => {
        apis[v] = baseUrls[v][tipoUrl]
    })
    
    return structuringBaseUrlOfServices(apis)
}

const structuringBaseUrlOfServices = (apis = baseUrlsParams) => apis