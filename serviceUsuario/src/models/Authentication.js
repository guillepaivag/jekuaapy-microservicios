class Authentication {
    static schema = {
        type: 'string',
        properties: {
            uid: { type: 'string', errorMessage: 'must be of string type' },
        },
        required: ['uid'],
        additionalProperties: false,
    }

    constructor (uid) {
        this.uid = uid ? uid : ''
    }
}

export default Authentication