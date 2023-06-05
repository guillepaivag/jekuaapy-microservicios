import { baseUrls, baseUrlsParams } from "./configBaseUrlOfApis.js"

export const getBaseUrlOfServices = (isProduction = false, isRemote = false) => {    
    const tipoUrl = isProduction ? 'prod' :
    (!isRemote ? 'devLocal' : 'devRemote')
    
    const apis = {}
    Object.keys(baseUrls)
    .map(v => {
        apis[v] = baseUrls[v][tipoUrl]
    })
    
    return structuringBaseUrlOfServices(apis)
}

const structuringBaseUrlOfServices = (apis = baseUrlsParams) => apis