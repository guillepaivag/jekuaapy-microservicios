import { bucketsName, bucketsNameParams } from "./configBucketsName.js"

export const getBucketsName = (environment = 'development') => {
    const tipo = environment === 'production' ? 'prod' :
    environment === 'development' ? 'dev' :
    environment === 'testing' ? 'test' : ''

    const buckets = {}
    Object.keys(bucketsName)
    .map(v => {
        buckets[v] = bucketsName[v][tipo]
    })

    return structuringBucketsName(buckets)
}

const structuringBucketsName = (buckets = bucketsNameParams) => buckets