import { create } from 'apisauce'
import BuildConfig from "react-native-config"

// Apisauce instance
export const instance = create({
    baseURL: BuildConfig.API_BASE_URL,
    timeout: 30 * 1000,
    headers: {
        'Accept': 'application/json'
    }
})