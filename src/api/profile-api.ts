import axios from 'axios';
import { configAPI, createResult } from '../app/const/handle-api.const';
import { GET_PROFILE, UPDATE_PROFILE } from '../app/const/url-api.const';

export default class ProfileAPI {
    /* Get profile */
    static getProfile = async () => {
        try {
            const result = await axios.request(configAPI(GET_PROFILE))
            return createResult(result)
        } catch (error) {
            return createResult(null, error)
        }
    }

    /* Update profile */
    static updateProfile = async (newProfile: any) => {
        try {
            const result = await axios.request(configAPI(UPDATE_PROFILE, newProfile))
            return createResult(result)
        } catch (error) {
            return createResult(null, error)
        }
    }
}