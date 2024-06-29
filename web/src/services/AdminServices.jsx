import axios from 'axios'

import { config, adminUrl } from './Base'

const AdminService = {
    getListAccount() {
        return axios.post(`${adminUrl}/account/list/`, null, config)
    },
    addAccount(body) {
        return axios.post(`${adminUrl}/account/`, body, config)
    },
    deleteAccount(username) {
        return axios.delete(`${adminUrl}/account/`, {
            data: {
                username,
            },
            ...config
        })
    }
}

export default AdminService;