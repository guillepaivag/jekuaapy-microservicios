export const getUrlServiceGateway = (isProduction = false, isRemote = false) => {    
    const tipoUrl = isProduction ? 'prod' :
    (!isRemote ? 'devLocal' : 'devRemote')

    const gateway = {
        prod: 'https://southamerica-east1-jekuaa-py.cloudfunctions.net/api_gateway',
        devLocal: 'http://127.0.0.1:8000/jekuaapydev1/southamerica-east1/api_gateway',
        devRemote: 'https://southamerica-east1-jekuaapydev1.cloudfunctions.net/api_gateway',
    }

    return gateway[tipoUrl]
}