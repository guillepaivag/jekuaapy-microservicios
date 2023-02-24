import service_account_dev from '../../../service_account_dev.json' assert { type: 'json' }
import service_account_prod from '../../../service_account_prod.json' assert { type: 'json' }

const model = {
    value: {
        type: '', project_id: '', private_key_id: '',
        private_key: '', client_email: '', client_id: '',
        auth_uri: '', token_uri: '', auth_provider_x509_cert_url: '',
        client_x509_cert_url: '',
    }
}

export const getCredentials = (isProd = false) => {
    model.value = isProd ? service_account_prod : service_account_dev
    return model.value
}