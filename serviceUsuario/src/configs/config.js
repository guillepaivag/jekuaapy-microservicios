import functions from 'firebase-functions'
import configJson from '../../config.json' assert { type: 'json' }
import { setUrlsApis } from './helpers/setUrlsApis.js'
import { setBucketsName } from './helpers/setBucketsName.js'

const config = Object.keys(functions.config()).length ? functions.config() : configJson
const urlServices = setUrlsApis(config.environment.mode === 'production', config.environment.local === 'Y')
const buckets = setBucketsName(config.environment.mode === 'production')

export default {
    environment: config.environment.mode,
    production: config.environment.mode === 'production',
    local: config.environment.local === 'Y',
    urlServices,
    buckets,
}