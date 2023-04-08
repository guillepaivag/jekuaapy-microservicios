const model = {
    value: {
        type: '', project_id: '', private_key_id: '',
        private_key: '', client_email: '', client_id: '',
        auth_uri: '', token_uri: '', auth_provider_x509_cert_url: '',
        client_x509_cert_url: '',
    }
}

export const getCredentials = async (isProd = false) => {
    let credentialsJSON = {}

    if (!isProd) credentialsJSON = await import('../../../service_account_dev.json', { assert: { type: "json" } })
    else credentialsJSON = await import('../../../service_account_prod.json', { assert: { type: "json" } })
    
    model.value = credentialsJSON.default
    return model.value
}