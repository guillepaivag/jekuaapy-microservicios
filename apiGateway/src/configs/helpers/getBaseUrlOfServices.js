import { baseUrls, baseUrlsParams } from "./configBaseUrlOfApis.js"

export const getBaseUrlOfServices = (isProduction = false, isRemote = false) => {    
    const tipoUrl = isProduction ? 'prod' :
    (!isRemote ? 'devLocal' : 'devRemote')
    
    const services = {}
    Object.keys(baseUrls)
    .map(v => {
        services[v] = baseUrls[v][tipoUrl]
    })
    
    return structuringBaseUrlOfServices(services)
}

const structuringBaseUrlOfServices = (services = baseUrlsParams) => services