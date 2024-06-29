import axios from 'axios'

import { config, userUrls } from './Base'

const UserService = {
    login(body) {
        return axios.post(`${userUrls}/login/`, body, config)
    },
    register(body) {
        return axios.post(`${userUrls}/register/`, body, config)
    }
}

export default UserService;