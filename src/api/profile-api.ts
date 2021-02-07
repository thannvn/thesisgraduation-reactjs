import axios from 'axios';
import { configAPI, createResult} from '../app/const/handle-api.const';
import { GET_PROFILE } from '../app/const/url-api.const';

export default class Profile {
    /* Get profile */
    static getProfile = async () => {
        try {
            const result = await axios.request(configAPI(GET_PROFILE))
            return createResult(result)
        } catch (error) {
            return createResult(null, error)
        }
    }
}