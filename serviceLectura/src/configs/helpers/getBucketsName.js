import { bucketsName, bucketsNameParams } from "./configBucketsName.js"

export const getBucketsName = (isProduction = false) => {
    const tipo = isProduction ? 'prod' : 'devRemote'

    const buckets = {}
    Object.keys(bucketsName)
    .map(v => {
        buckets[v] = bucketsName[v][tipo]
    })

    return structuringBucketsName(buckets)
}

const structuringBucketsName = (buckets = bucketsNameParams) => buckets