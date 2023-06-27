import functions from 'firebase-functions'
import configJson from '../../config.json' assert { type: 'json' }
import { getBaseUrlOfServices } from './helpers/getBaseUrlOfServices.js'
import { getCredentials } from './helpers/getCredentials.js'
import { getBucketsName } from './helpers/getBucketsName.js'
//import { getUrlServiceGateway } from './helpers/getUrlServiceGateway.js'

const config = Object.keys(functions.config()).length ? functions.config() : configJson

const services = getBaseUrlOfServices(config.environment.mode)
const buckets = getBucketsName(config.environment.mode)
//const gateway = getUrlServiceGateway(config.environment.mode === 'production', config.execution.mode === 'remote')
export default {
    environment: config.environment.mode,
    services,
    buckets,
    getCredentials: async () => await getCredentials(config.environment.mode),
}