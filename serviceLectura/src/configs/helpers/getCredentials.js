const model = {
    value: {
        type: '', project_id: '', private_key_id: '',
        private_key: '', client_email: '', client_id: '',
        auth_uri: '', token_uri: '', auth_provider_x509_cert_url: '',
        client_x509_cert_url: '',
    }
}

export const getCredentials = async (environment = 'development') => {
    let credentialsJSON = {}

    if (environment === 'testing') credentialsJSON = await import('../../../service_account_test.json', { assert: { type: "json" } })
    else if((environment === 'production')) credentialsJSON = await import('../../../service_account_prod.json', { assert: { type: "json" } })
    else credentialsJSON = await import('../../../service_account_dev.json', { assert: { type: "json" } })

    model.value = credentialsJSON.default
    return model.value
}