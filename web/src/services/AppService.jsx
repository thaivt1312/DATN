import axios from 'axios'

import { config, appUrl } from './Base'

const AppService = {
    getPasscode() {
        return axios.post(`${appUrl}/getPasscode/`, null, config)
    },
    getDeviceList() {
        return axios.post(`${appUrl}/getListDevice/`, null, config)
    },
    getDetail(body) {
        return axios.post(`${appUrl}/getDetail/`, {...body}, config)
    },
    editUserInformation(body) {
        return axios.post(`${appUrl}/editUserInformation/`, {...body}, config)
    },
    deactiveDevice(body) {
        return axios.post(`${appUrl}/deactiveDevice/`, {...body}, config)
    },
    downloadSoundFile(body) {
        return axios.post(`${appUrl}/getSoundFile/`, {...body}, {
            ...config,
            responseType: 'blob'
        })
    }
}

export default AppService;