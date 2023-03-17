import functions from 'firebase-functions'
import configJson from '../../config.json' assert { type: 'json' }
import { getBaseUrlOfServices } from './helpers/getBaseUrlOfServices.js'
import { getBucketsName } from './helpers/getBucketsName.js'
import { getCredentials } from './helpers/getCredentials.js'
import { getUrlServiceGateway } from './helpers/getUrlServiceGateway.js'

const config = Object.keys(functions.config()).length ? functions.config() : configJson

const services = getBaseUrlOfServices(config.environment.mode === 'production', config.execution.mode === 'remote')
const gateway = getUrlServiceGateway(config.environment.mode === 'production', config.execution.mode === 'remote')
const buckets = getBucketsName(config.environment.mode === 'production')

export default {
    environment: config.environment.mode,
    execution: config.execution.mode,
    production: config.environment.mode === 'production',
    remote: config.execution.mode === 'remote',
    services,
    gateway,
    buckets,
    getCredentials: async () => await getCredentials(config.environment.mode === 'production'),
}