import functions from 'firebase-functions'
import configJson from '../../config.json'

const config = Object.keys(functions.config()).length ? functions.config() : configJson
export const config_environment = config.environment.mode
export const config_execution = config.execution.mode
export const config_production = config.environment.mode === 'production'
// const services = 
// const bucketsName = 
// const getCredentials = 